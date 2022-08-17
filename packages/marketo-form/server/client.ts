import { URL } from 'url'
import createFetch from '@vercel/fetch'

const fetch = createFetch()

interface MarketoTokenResponse {
  access_token: string
}

interface MarketoFieldsSuccessResponse {
  success: true
}

interface MarketoFieldsErrorResponse {
  success: false
  errors: { code: string; message: string }[]
}

export type MarketoFieldsResponse =
  | MarketoFieldsSuccessResponse
  | MarketoFieldsErrorResponse

export async function getToken(): Promise<MarketoTokenResponse> {
  const url = new URL(`${process.env.MARKETO_IDENTITY}/oauth/token`)
  url.searchParams.append('grant_type', 'client_credentials')
  url.searchParams.append('client_id', process.env.MARKETO_CLIENT_ID!)
  url.searchParams.append('client_secret', process.env.MARKETO_CLIENT_SECRET!)
  const res = await fetch(url.toString())
  return await res.json()
}

export async function getForm(formId: string) {
  const { access_token } = await getToken()
  return await fetch(
    `${process.env.MARKETO_ENDPOINT}/asset/v1/form/${formId}/fields.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
}

export async function submitForm(body: unknown) {
  const { access_token } = await getToken()
  return await fetch(
    `${process.env.MARKETO_ENDPOINT}/v1/leads/submitForm.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    }
  )
}