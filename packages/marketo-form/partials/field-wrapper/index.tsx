import type { ReactNode } from 'react'

const FieldWrapper = ({
  children,
  fieldId,
}: {
  children: ReactNode
  fieldId: string
}) => {
  return (
    <div className="marketo-form-field-wrapper" data-field-id={fieldId}>
      {children}
    </div>
  )
}

export default FieldWrapper
