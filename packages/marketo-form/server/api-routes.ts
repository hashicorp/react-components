import * as client from './client'
import type { NextApiRequest, NextApiResponse } from 'next'

function flatten(param: string | string[]): string {
  return Array.isArray(param) ? param[0] : param
}

async function getForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const marketoRes = await client.getForm(flatten(req.query.form))
    const form = await marketoRes.json()
    return res.status(marketoRes.status).json(form)
  } catch (err) {
    console.error(err)
    return res.status(500)
  }
}

async function submitForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const marketoRes = await client.submitForm(req.body)
    const form = await marketoRes.json()
    return res.status(marketoRes.status).json(form)
  } catch (err) {
    console.error(err)
    return res.status(500)
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
