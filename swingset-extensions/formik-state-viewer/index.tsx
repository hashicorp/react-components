import { useFormikContext } from 'formik'
import s from './style.module.css'

// This component is a simple helper to see the current state of Formik values & errors as you develop a form
export default function FormikStateViewer() {
  const { values, errors, touched } = useFormikContext<Record<string, unknown>>()
  return (
    <div className={s.formikStateViewer}>
      <h3 className={s.heading}>Formik State</h3>
      <div className={s.grid}>
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
              {Object.keys(values).map((key) => `${key} : '${values[key]}'\n`)}
            </code>
          </pre>
        </div>
        <div>
          <h4>Touched:</h4>
          <pre>
            <code>
              {Object.keys(touched).map((key) => `${key} : ${touched[key]}\n`)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
