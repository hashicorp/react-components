import * as client from './client'
import type { SubmissionFilter } from '../types'
import type { MarketoFieldsResponse } from './client'
import type { NextApiRequest, NextApiResponse } from 'next'

function flatten(param?: string | string[]): string {
  if (!param) {
    throw new Error(`Attempting to call flatten with undefined value`)
  }
  return Array.isArray(param) ? param[0] : param
}

async function notifyError(body: unknown, err: unknown) {
  if (process.env.MARKETO_ERROR_ZAPIER_WEBHOOK) {
    try {
      await fetch(process.env.MARKETO_ERROR_ZAPIER_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body, err }, null, 2),
      })
    } catch (err) {
      console.error({ body, err })
    }
  }

  return Promise.resolve()
}

async function getForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const marketoRes = await client.getForm(
      parseInt(flatten(req.query.form), 10)
    )
    const form = (await marketoRes.json()) as MarketoFieldsResponse

    // Using a switch statement instead of `if (!form.success)` is necessary
    // to discriminate a union type by a boolean property in environments where
    // the TypeScript compiler option "strictNullChecks" is false.
    //
    // More info https://github.com/microsoft/TypeScript/issues/10564
    switch (form.success) {
      case false: {
        const errorCodes = form.errors.map((e) => e.code)

        // 702 -> Form not found
        if (errorCodes.includes('702')) {
          res.status(404).json({ error: 'not found' })
          return
        }

        throw new Error(JSON.stringify(form))
      }
    }

    res.status(marketoRes.status).json(form)
  } catch (err) {
    res.status(500).json({ error: 'internal server error' })
    throw err
  }
}

function isE2ETest(req: NextApiRequest): boolean {
  // running e2e tests locally
  if (process.env.E2E_TESTS === 'true') {
    return true
  }

  // running e2e tests against a Vercel preview
  if (
    'input' in req.body &&
    req.body.input.length > 0 &&
    req.body.input[0].leadFormFields.email === 'daniela.rod@example.com'
  ) {
    return true
  }

  return false
}

async function submitForm(
  req: NextApiRequest,
  res: NextApiResponse,
  {
    submissionFilter,
  }: {
    submissionFilter?: SubmissionFilter
  }
) {
  // Don't submit forms to the Marketo API when using E2E tests.
  if (isE2ETest(req)) {
    res.status(200).json({
      requestId: '7d85#181a7ae5e56',
      result: [
        {
          id: 25325329,
          status: 'updated',
        },
      ],
      success: true,
    })
    return
  }

  try {
    const passesSubmissionFilter = submissionFilter
      ? await submissionFilter(req)
      : true
    if (!passesSubmissionFilter) {
      // trick spammers into thinking their form submitted successfully
      res.status(200).json({ success: true })
      return
    }
    const marketoRes = await client.submitForm(req.body)
    const form = (await marketoRes.json()) as { success: boolean }
    if (!form.success) {
      await notifyError(req.body, form)
    }
    res.status(marketoRes.status).json(form)
  } catch (err) {
    await notifyError(req.body, err)
    res.status(500).json({ error: 'internal server error' })
    throw err
  }
}

export function buildApiRoutes({
  submissionFilter,
}: {
  submissionFilter?: SubmissionFilter
} = {}) {
  return async function apiRoutes(req: NextApiRequest, res: NextApiResponse) {
    switch (req.query.marketo![0]) {
      case 'form':
        return getForm(req, res)
      case 'submit':
        return submitForm(req, res, { submissionFilter })
      default:
        return res.status(404).json({ error: 'not found' })
    }
  }
}
