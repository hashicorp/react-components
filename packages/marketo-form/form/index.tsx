import { useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Button from '@hashicorp/react-button'
import Field from '../partials/field'
import NameField from '../partials/fields/name-field'
import {
  convertToRESTFields,
  groupFields,
  calculateDefaultValues,
} from '../utils'
import type {
  MarketoForm,
  MarketoFormField,
  MarketoFormikComponents,
} from '../types'

interface Props {
  formId: number
  marketoForm: MarketoForm
  groups?: Record<
    string,
    {
      fields: string[]
      component: (props: { fields: MarketoFormField[] }) => JSX.Element
    }
  >
  components?: MarketoFormikComponents
  submitTitle?: string
  className?: string
  onSubmitSuccess?: () => void
  onSubmitError?: () => void
}

const defaultFieldGroupings = {
  name: {
    fields: ['FirstName', 'LastName'],
    component: NameField,
  },
}

const Form = ({
  formId,
  marketoForm,
  groups = defaultFieldGroupings,
  components,
  submitTitle,
  className,
  onSubmitSuccess,
  onSubmitError,
}: Props) => {
  // memoized function that groups marketo fields based on supplied groups.
  // If a field doesn't belong to a group, it is placed in a group keyed by
  // field.Name.
  const groupedFields = useMemo(() => {
    return groupFields(marketoForm.result, groups)
  }, [marketoForm, groups])

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: calculateDefaultValues(marketoForm.result),
  })

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
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
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
            <Field
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
        <div>
          <small>{`Marketo Form (${formId})`}</small>
        </div>
      </form>
    </FormProvider>
  )
}

export { defaultFieldGroupings }
export default Form
