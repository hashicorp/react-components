import * as client from './client'
import type { MarketoFieldsResponse } from './client'
import type { NextApiRequest, NextApiResponse } from 'next'

function flatten(param: string | string[]): string {
  return Array.isArray(param) ? param[0] : param
}

async function getForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const marketoRes = await client.getForm(flatten(req.query.form))
    const form = (await marketoRes.json()) as MarketoFieldsResponse

    // Using a switch statement instead of `if (!form.success)` is necessary
    // to discriminate a union type by a boolean property in environments where
    // the TypeScript compiler option "strictNullChecks" is false.
    //
    // More info https://github.com/microsoft/TypeScript/issues/10564
    switch (form.success) {
      case false:
        const errorCodes = form.errors.map((e) => e.code)

        // 702 -> Form not found
        if (errorCodes.includes('702')) {
          res.status(404).json({ error: 'not found' })
          return
        }

        throw new Error(JSON.stringify(form))
    }

    res.status(marketoRes.status).json(form)
  } catch (err) {
    res.status(500).json({ error: 'internal server error' })
    throw err
  }
}

async function submitForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const marketoRes = await client.submitForm(req.body)
    const form = await marketoRes.json()
    res.status(marketoRes.status).json(form)
  } catch (err) {
    res.status(500).json({ error: 'internal server error' })
    throw err
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.query.marketo[0]) {
    case 'form':
      return getForm(req, res)
    case 'submit':
      return submitForm(req, res)
    default:
      return res.status(404).json({ error: 'not found' })
  }
}
