import { URL } from 'url'
import createFetch from '@vercel/fetch'
import moize from 'moize'
import type { MarketoForm } from '../types'

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

export async function getForm(formId: number) {
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

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isRateLimited(res: MarketoForm): boolean {
  return res.errors.some((e) => e.code === '606')
}

export async function getFormProps(
  id: number,
  depth: number = 0
): Promise<{ id: number; form: MarketoForm }> {
  const res = await getForm(id)
  if (res.status !== 200) {
    throw new Error(
      `[marketo-form] non-200 status code when requesting form ${id}: ${res.status}`
    )
  }

  const form = (await res.json()) as MarketoForm
  if (!form.success) {
    if (isRateLimited(form) && depth < 8) {
      await wait(2 ** depth * 1000)
      return getFormProps(id, depth + 1)
    }

    throw new Error(
      `[marketo-form] error response when requesting form ${id}: ${JSON.stringify(
        form
      )}`
    )
  }
  return { id, form }
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
