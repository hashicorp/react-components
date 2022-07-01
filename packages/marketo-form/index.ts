import Form from './form'
import NameField from './partials/fields/name-field'

const defaultFieldGroupings = {
  name: {
    fields: ['FirstName', 'LastName'],
    component: NameField,
  },
}

export { defaultFieldGroupings }

export default Form
