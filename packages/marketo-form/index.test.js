/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import userEvent from '@testing-library/user-event'
import MarketoForm from './'
import {
  BASIC_FORM_PROPS,
  UTM_FORM_PROPS,
  VISIBILITY_RULE_FORM_PROPS,
} from './fixtures'

describe('MarketoForm', () => {
  let originalLocation
  let spy

  beforeAll(() => {
    originalLocation = window.location
  })

  beforeEach(() => {
    nock('http://local.test')
      .persist()
      .post('/api/marketo/submit')
      .reply(200, { success: true, result: [] })

    delete window.location
    window.location = {
      // We use an absolute URL here since fetch in Jest can't use relative URLs
      origin: 'http://local.test',
      protocol: 'http:',
      host: 'local.test',
      pathname: '/testing',
      href: 'http://local.test/testing?utm_medium=social',
      search: '?utm_medium=social',
    }

    spy = jest.spyOn(global, 'fetch')
  })

  afterEach(() => {
    jest.resetAllMocks()
    spy.mockRestore()
    window.location = originalLocation
  })

  afterAll(() => {
    nock.restore()
  })

  test('renders form with provided fields', async () => {
    render(<MarketoForm {...BASIC_FORM_PROPS} />)

    const firstNameField = screen.getByLabelText(/First Name/)
    const lastNameField = screen.getByLabelText(/Last Name/)
    expect(firstNameField).toBeInTheDocument()
    expect(lastNameField).toBeInTheDocument()
  })

  test('submits form data', async () => {
    render(<MarketoForm {...BASIC_FORM_PROPS} />)

    const firstNameField = screen.getByLabelText(/First Name/)
    expect(firstNameField).toBeInTheDocument()
    userEvent.type(firstNameField, 'Michael')

    const lastNameField = screen.getByLabelText(/Last Name/)
    expect(lastNameField).toBeInTheDocument()
    userEvent.type(lastNameField, 'Burnham')

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    await waitFor(() => expect(spy).toHaveBeenCalled())
    expect(spy).toHaveBeenCalledWith('http://local.test/api/marketo/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: [
          {
            leadFormFields: {
              firstName: 'Michael',
              lastName: 'Burnham',
            },
            visitorData: {
              pageURL: 'http://local.test/testing?utm_medium=social',
            },
          },
        ],
        formId: 9999,
      }),
    })
  })

  test('submits with initial values', async () => {
    render(
      <MarketoForm
        {...BASIC_FORM_PROPS}
        initialValues={{ LastName: 'Burnham' }}
      />
    )

    const firstNameField = screen.getByLabelText(/First Name/)
    expect(firstNameField).toBeInTheDocument()
    userEvent.type(firstNameField, 'Michael')

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    await waitFor(() => expect(spy).toHaveBeenCalled())
    expect(spy).toHaveBeenCalledWith('http://local.test/api/marketo/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: [
          {
            leadFormFields: {
              firstName: 'Michael',
              lastName: 'Burnham',
            },
            visitorData: {
              pageURL: 'http://local.test/testing?utm_medium=social',
            },
          },
        ],
        formId: 9999,
      }),
    })
  })

  test('submits form data with UTM params', async () => {
    render(<MarketoForm {...UTM_FORM_PROPS} />)

    const firstNameField = screen.getByLabelText(/First Name/)
    expect(firstNameField).toBeInTheDocument()
    userEvent.type(firstNameField, 'Michael')

    const lastNameField = screen.getByLabelText(/Last Name/)
    expect(lastNameField).toBeInTheDocument()
    userEvent.type(lastNameField, 'Burnham')

    const submitButton = screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument()
    userEvent.click(submitButton)

    await waitFor(() => expect(spy).toHaveBeenCalled())
    expect(spy).toHaveBeenCalledWith('http://local.test/api/marketo/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: [
          {
            leadFormFields: {
              firstName: 'Michael',
              lastName: 'Burnham',
              utm_medium__c: 'social',
              form_page_url__c: 'http://local.test/testing',
            },
            visitorData: {
              pageURL: 'http://local.test/testing?utm_medium=social',
            },
          },
        ],
        formId: 9999,
      }),
    })
  })

  test('renders built-in error validation messages', async () => {
    render(<MarketoForm {...BASIC_FORM_PROPS} />)

    const firstNameField = screen.getByLabelText(/First Name/)
    expect(firstNameField).toBeInTheDocument()
    userEvent.click(firstNameField)

    const lastNameField = screen.getByLabelText(/Last Name/)
    expect(lastNameField).toBeInTheDocument()
    userEvent.click(lastNameField)

    const errorMessage = await screen.findByText('This field is required.')
    expect(errorMessage).toBeInTheDocument()
  })

  test('renders additional error validation messages', async () => {
    render(
      <MarketoForm
        {...BASIC_FORM_PROPS}
        validateFields={async (values, errors) => {
          return {
            values,
            errors: {
              ...errors,
              FirstName: {
                message: `${errors.FirstName.message} Additional message.`,
              },
            },
          }
        }}
      />
    )

    const firstNameField = screen.getByLabelText(/First Name/)
    expect(firstNameField).toBeInTheDocument()
    userEvent.click(firstNameField)

    const lastNameField = screen.getByLabelText(/Last Name/)
    expect(lastNameField).toBeInTheDocument()
    userEvent.click(lastNameField)

    const errorMessage = await screen.findByText(
      'This field is required. Additional message.'
    )
    expect(errorMessage).toBeInTheDocument()
  })

  test('handles simple visibility rules', async () => {
    render(<MarketoForm {...VISIBILITY_RULE_FORM_PROPS} />)

    expect(screen.queryByLabelText('Phone Number')).toBeNull()

    const fastTrackField = screen.getByLabelText('Have salesperson contact me')
    expect(fastTrackField).toBeInTheDocument()
    userEvent.click(fastTrackField)

    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
  })
})
