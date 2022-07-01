import { URL } from 'url'
import createFetch from '@vercel/fetch'
import type { NextApiRequest, NextApiResponse } from 'next'

const fetch = createFetch()

interface MarketoTokenResponse {
  access_token: string
}

async function getToken(): Promise<MarketoTokenResponse> {
  const url = new URL(`${process.env.MARKETO_IDENTITY}/oauth/token`)
  url.searchParams.append('grant_type', 'client_credentials')
  url.searchParams.append('client_id', process.env.MARKETO_CLIENT_ID!)
  url.searchParams.append('client_secret', process.env.MARKETO_CLIENT_SECRET!)
  const res = await fetch(url.toString())
  return await res.json()
}

async function getForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { access_token } = await getToken()
    const marketoRes = await fetch(
      `${process.env.MARKETO_ENDPOINT}/asset/v1/form/${req.query.form}/fields.json`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    const form = await marketoRes.json()
    return res.status(marketoRes.status).json(form)
  } catch (err) {
    console.error(err)
    return res.status(500)
  }
}

async function submitForm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { access_token } = await getToken()
    const marketoRes = await fetch(
      `${process.env.MARKETO_ENDPOINT}/v1/leads/submitForm.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(req.body),
      }
    )
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
