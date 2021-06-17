import { useFormikContext } from 'formik'
import s from './style.module.css'

// This component is a simple helper to see the current state of Formik values & errors as you develop a form
export default function FormikStateViewer() {
  const { values, errors } = useFormikContext()
  return (
    <div className={s.formikStateViewer}>
      <div>
        <h4>Errors:</h4>
        <pre>
          <code>
            {JSON.stringify(errors)} <br />
          </code>
        </pre>
      </div>
      <div>
        <h4>Values:</h4>
        <pre>
          <code>
            {Object.keys(values).map(
              (key) => `${key} : ${values[key]}\n`
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}
