/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import createFetch from '@vercel/fetch'
import moize from 'moize'
import type {
  MarketoFormFieldsResponse,
  MarketoFormMetadataResponse,
  MarketoFormAPIResponse,
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
  const { access_token } = await getToken()

  const fieldsResponse = await fetch(
    `${process.env.MARKETO_ENDPOINT}/asset/v1/form/${formId}/fields.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  )

  const metadataResponse = await fetch(
    `${process.env.MARKETO_ENDPOINT}/asset/v1/form/${formId}.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    }
  )

  const [fields, metadata] = await Promise.all([
    fieldsResponse.json(),
    metadataResponse.json(),
  ])

  return { fields, metadata }
}

export async function getFormProps(
  id: number
): Promise<MarketoFormAPIResponse> {
  const res = await getForm(id)
  if (!res.fields.success || !res.metadata.success) {
    throw new Error(
      `[marketo-form] non-200 status code when requesting form ${id}: ${JSON.stringify(
        res
      )}`
    )
  }

  return res
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
