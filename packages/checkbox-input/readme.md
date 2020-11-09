# CheckboxInput

A controlled checkbox input intended for use with Formik.

## Props

For props documentation, see the `props.js` file, or [visit the playground](https://react-components.hashicorp.vercel.app/).

## Dependents

- `newsletter-signup-form`

## Notes

This component has been created as a [controlled input](https://reactjs.org/docs/forms.html#controlled-components) intended for use with [Formik](https://github.com/jaredpalmer/formik). Formik's [`<Field>`](https://jaredpalmer.com/formik/docs/api/field) component drives much of this component's prop structure.

This component should also be usable without Formik. You will need to pass a `field` prop, with properties `{ name, value, checked, onChange }` as described in the props spec, and you will also need to pass the `form` object prop, at minimum as `{ errors: {}, touched: {} }`. You can display an error message by passing it to `form.errors[field.name]`, and ensuring that `form.touched[field.name]` is truthy.

If you're migrating to this component from `boolean-input`, you will likely need to refactor code significantly, as you'll need to implement the related form with Formik. If you haven't used Formik in a while (or ever!), the [Formik overview](https://jaredpalmer.com/formik/docs/overview), particularly the [Basic example form](https://jaredpalmer.com/formik/docs/overview#the-gist), is probably the easiest place to start.
