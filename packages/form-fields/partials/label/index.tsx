import s from './style.module.css'
import clsx from 'clsx'
import { IconAlertTriangleFill16 } from '@hashicorp/flight-icons/svg-react/alert-triangle-fill-16'

interface LabelProps {
  label: string
  helpText?: string
  helpId?: string
  htmlFor?: string
  id?: string
  required?: boolean
  error?: string | false
}

const Label = ({
  label,
  helpText,
  helpId,
  htmlFor,
  id,
  required,
  error,
}: LabelProps) => {
  return (
    <>
      <label
        id={id}
        htmlFor={htmlFor}
        className={clsx(s.label, {
          [s.hasHelp]: helpText,
          [s.hasError]: error,
        })}
      >
        {required ? (
          <>
            {label}
            <span className={s.required}>*</span>
          </>
        ) : (
          label
        )}
      </label>
      {helpText && (
        <div id={helpId} className={clsx(s.help, { [s.hasError]: error })}>
          {helpText}
        </div>
      )}
      {error && (
        <div className={s.error}>
          <IconAlertTriangleFill16 />
          {error}
        </div>
      )}
    </>
  )
}

export default Label
