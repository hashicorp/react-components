import TextField from '../text-field'
import type { MarketoFormField, MarketoFormTextField } from '../../../types'
import styles from './style.module.css'

const NameFields = ({ fields }: { fields: MarketoFormField[] }) => {
  return (
    <div className={styles.name}>
      <TextField field={fields[0] as MarketoFormTextField} />
      <TextField field={fields[1] as MarketoFormTextField} />
    </div>
  )
}

export default NameFields
