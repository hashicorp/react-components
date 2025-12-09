/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useMemo, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Button from '@hashicorp/react-button'
import VisibilityRule from '../partials/visibility-rule'
import NameField from '../partials/fields/name-field'
import { FormMetadataContext } from '../contexts/FormMetadata'
import {
  convertToRESTFields,
  groupFields,
  calculateDefaultValues,
  segmentIdentify,
  includesSkippedRecords,
} from '../utils'
import type {
  MarketoFormMetadataResponse,
  MarketoFormFieldsResponse,
  MarketoFormGroups,
  MarketoFormComponents,
  MarketoSubmissionResponse,
} from '../types'

interface Props {
  /**
   * The Marketo API response containing the metadata of the form.
   * See {@link MarketoFormMetadataResponse} for more details.
   */
  metadata: MarketoFormMetadataResponse

  /**
   * The Marketo API response containing the fields to render.
   * See {@link MarketoFormFieldsResponse} for more details.
   */
  fields: MarketoFormFieldsResponse

  /**
   * Configuration on which fields to render with a single component.
   * See {@link MarketoFormGroups} for more details.
   */
  groups?: MarketoFormGroups

  /**
   * Initial values to use for fields, primarily useful in setting values for
   * hidden fields that don't derive their values from URL parameters. Keys are
   * SOAP field names.
   */
  initialValues?: Record<string, any>

  /**
   * Custom components to be used in lieu of the default built-in components.
   * See {@link MarketoFormComponents} for more details.
   */
  components?: MarketoFormComponents

  /**
   * Text to use for the submit button. Defaults to "Submit".
   */
  submitTitle?: string

  /**
   * Additional class name to apply to the <form> element.
   */
  className?: string

  /**
   * Whether to reset the form after a successful submission.
   * Default: false
   */
  resetOnSubmission?: boolean

  /**
   * Callback called when form has started submission process.
   */
  onSubmitStart?: () => void

  /**
   * Callback called when form has been successfully submitted.
   */
  onSubmitSuccess?: () => void

  /**
   * Callback called when form submission results in an error.
   */
  onSubmitError?: () => void

  /**
   * Callback called after performing validation based on Marketo settings, but
   * before rendering error messages. Used to perform validations that aren't
   * supported by the Marketo API (such as checking if an email address is
   * correctly formatted).
   * @param values Map of field IDs to field values
   * @param errors Map of field IDs to error messages
   */
  validateFields?: (
    values: Record<string, string | boolean>,
    errors: Record<string, { message: string }>
  ) => Promise<{ values: any; errors: Record<string, { message: string }> }>

  /**
   * Optional name of form to use for the forms aria-label.
   */
  formName?: string
}

const defaultFieldGroupings = {
  name: {
    fields: ['FirstName', 'LastName'],
    component: NameField,
  },
}

function isValidEmail(value: string): boolean {
  // Source: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
  // Slightly modified to require domains instead of bare TLDs
  /* eslint-disable-next-line no-useless-escape */
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/i.test(
    value
  )
}

const Form = ({
  metadata,
  fields,
  groups = defaultFieldGroupings,
  initialValues,
  components,
  submitTitle,
  className,
  resetOnSubmission,
  onSubmitStart,
  onSubmitSuccess,
  onSubmitError,
  validateFields,
  formName,
}: Props) => {
  // Track if the form has been rendered at least once, so that we know if
  // react-hook-form has already cached values.
  const hasBeenRendered = useRef(false)

  // memoized function that groups marketo fields based on supplied groups.
  // If a field doesn't belong to a group, it is placed in a group keyed by
  // field.Name.
  const groupedFields = useMemo(() => {
    if (!('result' in fields)) {
      return {}
    }
    return groupFields(fields.result, groups)
  }, [fields, groups])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues:
      'result' in fields
        ? calculateDefaultValues(fields.result, initialValues)
        : {},
    resolver: async (values: Record<string, string | boolean>) => {
      let errors: Record<string, { message: string }> = {}

      fields.result.forEach((field) => {
        if ('required' in field && field.required) {
          if (
            !(field.id in values) ||
            values[field.id] === '' ||
            values[field.id] === false ||
            values[field.id] === undefined ||
            (typeof values[field.id] === 'string' &&
              (values[field.id] as string).trim() === '')
          ) {
            errors[field.id] = {
              message: field.validationMessage ?? 'This field is required.',
            }
          }
        }

        // Validate that select field value is an allowed value
        if (field.dataType === 'select') {
          if (
            field.id in values &&
            field.fieldMetaData.values &&
            !field.fieldMetaData.values
              .map((v) => v.value)
              .includes(values[field.id] as string)
          ) {
            errors[field.id] = {
              message: field.validationMessage ?? 'Please select an option.',
            }
          }
        }

        if (field.dataType === 'email') {
          if (field.id in values && !isValidEmail(values[field.id] as string)) {
            errors[field.id] = {
              message:
                field.validationMessage ??
                'Please enter a valid email address.',
            }
          }
        }
      })

      if (validateFields) {
        const additionalValidations = await validateFields(values, errors)
        values = additionalValidations.values
        errors = additionalValidations.errors
      }

      return { values, errors }
    },
  })

  // Reset form if initialValues changes since defaultValues is cached on the
  // first render. This handles the situation where initialValues is updated
  // after the form is rendered, primarily when using router state which is
  // resolved _after_ the initial render for SSG pages.
  useEffect(() => {
    if (hasBeenRendered.current) {
      const newValues = calculateDefaultValues(fields.result, initialValues)
      Object.entries(newValues).forEach(([fieldId, value]) => {
        if (!methods.getValues(fieldId)) {
          methods.setValue(fieldId, value)
        }
      })
    }
  }, [hasBeenRendered, methods, fields, initialValues])

  // Track that we've finished rendering.
  useEffect(() => {
    hasBeenRendered.current = true
  }, [hasBeenRendered])

  const onSubmit = async (data: Record<string, unknown>) => {
    if (onSubmitStart) {
      onSubmitStart()
    }
    const leadFormFields = convertToRESTFields(data)

    segmentIdentify(leadFormFields)

    const res = await fetch(`${window.location.origin}/api/marketo/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: [
          {
            leadFormFields,
            visitorData: {
              pageURL: window.location.href,
            },
          },
        ],
        formId: metadata.result[0].id,
      }),
    })
    const marketoResponse = (await res.json()) as MarketoSubmissionResponse
    if (
      res.status === 200 &&
      marketoResponse.success &&
      !includesSkippedRecords(marketoResponse)
    ) {
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }

      if (resetOnSubmission) {
        methods.reset()
      }
    } else {
      console.error(marketoResponse)
      if (onSubmitError) {
        onSubmitError()
      }

      throw new Error('An error occurred while submitting form.')
    }
  }

  if (fields.success === false || metadata.success === false) {
    return (
      <div>
        <p>This form is currently unavailable. Please try again later.</p>
      </div>
    )
  }

  return (
    <FormMetadataContext.Provider value={metadata.result[0]}>
      <FormProvider {...methods}>
        <form
          className={className}
          onSubmit={methods.handleSubmit(onSubmit)}
          data-marketo-form-id={metadata.result[0].id}
          aria-label={formName}
        >
          {Object.entries(groupedFields).map(([groupName, fields]) => {
            // If this group name has a custom component defined, use that
            // instead of the default field components.
            if (groups && groupName in groups) {
              const Component = groups[groupName].component
              return (
                <Component
                  key={fields.map((f) => f.id).join('-')}
                  fields={fields}
                />
              )
            }

            if (fields.length > 1) {
              console.warn(
                `Multiple fields in group ${groupName} with no component defined.`
              )
            }

            return (
              <VisibilityRule
                key={fields[0].id}
                components={components}
                field={fields[0]}
              />
            )
          })}
          <Button
            disabled={
              methods.formState.isSubmitting ||
              (methods.formState.isSubmitSuccessful && !resetOnSubmission)
            }
            title={
              methods.formState.isSubmitting ||
              (methods.formState.isSubmitSuccessful && !resetOnSubmission)
                ? metadata.result[0].waitingLabel
                : submitTitle ?? metadata.result[0].buttonLabel
            }
          />
        </form>
      </FormProvider>
    </FormMetadataContext.Provider>
  )
}

export { defaultFieldGroupings }
export default Form
