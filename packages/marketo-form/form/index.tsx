import { useEffect, useMemo, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Button from '@hashicorp/react-button'
import VisibilityRule from '../partials/visibility-rule'
import NameField from '../partials/fields/name-field'
import {
  convertToRESTFields,
  groupFields,
  calculateDefaultValues,
} from '../utils'
import type {
  MarketoForm,
  MarketoFormGroups,
  MarketoFormComponents,
} from '../types'

interface Props {
  /**
   * Numeric ID of the Marketo form being rendered. Used to determine where to
   * submit form values.
   */
  formId: number

  /**
   * The Marketo API response containing the fields to render.
   * See {@link MarketoForm} for more details.
   */
  marketoForm: MarketoForm

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
}

const defaultFieldGroupings = {
  name: {
    fields: ['FirstName', 'LastName'],
    component: NameField,
  },
}

function isValidEmail(value: string): boolean {
  // Source: https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
  /* eslint-disable-next-line no-useless-escape */
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i.test(
    value
  )
}

const Form = ({
  formId,
  marketoForm,
  groups = defaultFieldGroupings,
  initialValues,
  components,
  submitTitle,
  className,
  onSubmitSuccess,
  onSubmitError,
  validateFields,
}: Props) => {
  // Track if the form has been rendered at least once, so that we know if
  // react-hook-form has already cached values.
  const hasBeenRendered = useRef(false)

  // memoized function that groups marketo fields based on supplied groups.
  // If a field doesn't belong to a group, it is placed in a group keyed by
  // field.Name.
  const groupedFields = useMemo(() => {
    return groupFields(marketoForm.result, groups)
  }, [marketoForm, groups])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: calculateDefaultValues(marketoForm.result, initialValues),
    resolver: async (values: Record<string, string | boolean>) => {
      let errors: Record<string, { message: string }> = {}

      marketoForm.result.forEach((field) => {
        if (field.required) {
          if (
            !(field.id in values) ||
            values[field.id] === '' ||
            values[field.id] === false ||
            values[field.id] === undefined
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
      methods.reset(calculateDefaultValues(marketoForm.result, initialValues), {
        keepValues: true,
      })
    }
  }, [hasBeenRendered, methods, marketoForm, initialValues])

  // Track that we've finished rendering.
  useEffect(() => {
    hasBeenRendered.current = true
  }, [hasBeenRendered])

  const onSubmit = async (data: Record<string, unknown>) => {
    const res = await fetch(`${window.location.origin}/api/marketo/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: [
          {
            leadFormFields: convertToRESTFields(data),
            visitorData: {
              pageURL: window.location.href,
            },
          },
        ],
        formId,
      }),
    })
    const marketoResponse = (await res.json()) as { success: boolean }
    if (res.status === 200 && marketoResponse.success) {
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } else {
      console.error(marketoResponse)
      if (onSubmitError) {
        onSubmitError()
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        data-marketo-form-id={formId}
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
          disabled={methods.formState.isSubmitting}
          title={
            methods.formState.isSubmitting
              ? 'Submitting...'
              : submitTitle ?? 'Submit'
          }
        />
      </form>
    </FormProvider>
  )
}

export { defaultFieldGroupings }
export default Form
