module.exports = {
  label: {
    type: 'string',
    required: true,
    description:
      'Text to display next to the checkbox. Accepts plain text or HTML.',
    testValue: 'My checkbox label',
  },
  field: {
    type: 'object',
    required: true,
    description:
      'Props to pass to the underlying `<input />` element, `{ name, value, checked, onChange }`. Note that for this component, which uses `<input type="checkbox" />`, the `field.value` and `field.checked` properties should be identical. The `field` prop is typically supplied by [Formik <Field/>](https://jaredpalmer.com/formik/docs/api/field).',
    testValue: {
      name: 'default-checkbox',
      value: true,
      checked: true,
      onChange: null,
    },
  },
  form: {
    type: 'object',
    required: true,
    description:
      'Form data. A non-empty error string `errors[field.name]` will be shown if present, but only if `touched[field.name]` is also truthy. The `form` prop is typically supplied by [Formik <Field/>](https://jaredpalmer.com/formik/docs/api/field).',
    properties: {
      touched: {
        type: 'object',
        description: 'supplied by formik',
      },
      errors: {
        type: 'object',
        description: 'supplied by formik',
      },
    },
    testValue: { touched: {}, errors: {} },
  },
  theme: {
    type: 'object',
    description: 'Controls the appearance of the checkbox',
    properties: {
      background: {
        type: 'string',
        description: 'background color the checkbox sits on top of',
        options: ['light', 'dark', 'brand'],
      },
    },
    testValue: { background: 'light' },
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
