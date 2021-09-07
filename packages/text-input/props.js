module.exports = {
  field: {
    type: 'object',
    description:
      'Props for the input element, supplied by [Formik <Field/>](https://jaredpalmer.com/formik/docs/api/field).',
    required: true,
    testValue: {
      name: 'mytextinput',
      value: '',
    },
    // sub-props
    name: {
      type: 'string',
      description: 'name of the field',
    },
    value: {
      type: 'string',
      description: 'field value',
    },
    onChange: {
      type: 'function',
      description: 'a function fired with the value on change',
    },
  },
  form: {
    type: 'object',
    description:
      'Form data including `error` and `touched` info, supplied by [Formik <Field/>](https://jaredpalmer.com/formik/docs/api/field).',
    required: true,
    testValue: { errors: {}, touched: {} },
    // sub-props
    value: {
      type: 'object',
      description: 'contains "errors" and "touched" keys',
    },
  },
  label: {
    type: 'string',
    description: 'Label text, HTML allowed.',
    testValue: 'My text input label',
  },
  type: {
    type: 'string',
    control: 'select',
    options: ['text', 'email', 'hidden'],
    description: '`type` for the input field.',
    testValue: 'text',
  },
  placeholder: {
    type: 'string',
    description: 'Placeholder text for the field',
    testValue: 'My placeholder',
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  theme: {
    type: 'object',
    description:
      'Controls the appearance of the text input. `theme.background` should be one of `["light", "dark", "brand"].`',
    testValue: { background: 'light' },
    // sub-properties
    background: {
      type: 'string',
      options: ['light', 'dark', 'brand'],
    },
  },
}
