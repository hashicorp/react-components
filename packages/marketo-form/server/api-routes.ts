/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import * as client from './client'
import { includesSkippedRecords } from '../utils'
import type { SubmissionFilter, MarketoSubmissionResponse } from '../types'
import type { NextApiRequest, NextApiResponse } from 'next'

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
    const form = (await marketoRes.json()) as MarketoSubmissionResponse
    if (!form.success || includesSkippedRecords(form)) {
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
    const route = Array.isArray(req.query.marketo)
      ? req.query.marketo[0]
      : req.query.marketo
    switch (route) {
      case 'submit':
        return submitForm(req, res, { submissionFilter })
      default:
        return res.status(404).json({ error: 'not found' })
    }
  }
}
