import createFetch from '@vercel/fetch'
import moize from 'moize'
import type {
  MarketoFormFieldsResponse,
  MarketoFormMetadataResponse,
} from '../types'

const fetch = createFetch()

interface MarketoTokenResponse {
  access_token: string
}

export async function getToken(): Promise<MarketoTokenResponse> {
  const url = new URL(`${process.env.MARKETO_IDENTITY}/oauth/token`)
  url.searchParams.append('grant_type', 'client_credentials')
  url.searchParams.append('client_id', process.env.MARKETO_CLIENT_ID!)
  url.searchParams.append('client_secret', process.env.MARKETO_CLIENT_SECRET!)
  const res = await fetch(url.toString())
  return await res.json()
}

export async function getForm(formId: number) {
  return await fetch(`https://content.hashicorp.com/api/marketo?id=${formId}`)
}

export async function getFormProps(id: number): Promise<{
  fields: MarketoFormFieldsResponse
  metadata: MarketoFormMetadataResponse
}> {
  const res = await getForm(id)
  if (res.status !== 200) {
    throw new Error(
      `[marketo-form] non-200 status code when requesting form ${id}: ${res.status}`
    )
  }
  const form = (await res.json()) as {
    result: {
      fields: MarketoFormFieldsResponse
      metadata: MarketoFormMetadataResponse
    }
  }

  return form.result
}
export const memoizedGetFormProps = moize(getFormProps, {
  isPromise: true,
  maxAge: 60 * 1000, // 60 seconds
})

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
