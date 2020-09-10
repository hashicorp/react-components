### CheckboxInput

A controlled checkbox input intended for use with Formik.

### Props

- `label` (string) - Label text, HTML is allowed.
- `field` (object) - Props for the input element, supplied by Formik <Field/>. https://jaredpalmer.com/formik/docs/api/field .
- `form` (object) - Form data including `error` and `touched` info, supplied by Formik <Field/>. https://jaredpalmer.com/formik/docs/api/field .
- `theme` (object) _[optional]_ - Controls the appearance of the checkbox. `theme.background` should be one of `["light", "dark", "brand"].`

### Dependents:

- `hashi-newsletter-signup-form`

### Notes

This component has been created as a [controlled input](https://reactjs.org/docs/forms.html#controlled-components) intended for use with [Formik](https://github.com/jaredpalmer/formik). Formik's [`<Field>`](https://jaredpalmer.com/formik/docs/api/field) component drives much of this component's prop structure.

This component should also be usable without Formik -- you will need to pass in `field` data in the expected format, and you will also need to pass in empty objects for `form={{ errors: {}, touched: {}}}` if you are appplying any validation to the field.

If you're migrating to this component from `boolean-input`, you will likely need to refactor code significantly, as you'll need to implement the related form with Formik. If you haven't used Formik in a while (or ever!), the [Formik overview](https://jaredpalmer.com/formik/docs/overview), particularly the [Basic example form](https://jaredpalmer.com/formik/docs/overview#the-gist), is probably the easiest place to start.
