# Button

A clickable text box that allows a user to take an action.

### Props

See [the props file](props.js) for more details.

**Note**: this component also will reflect any additional props you pass it to the top level. However, passing such props is discouraged. If absolutely necessary, it's encouraged to document the use of those "additional" props so that they can be added to the component explicitly. This allows us to create a more transparent view of the component's functionality, and allows us to better support those additional props as we iterate on this component.

### Dependents

- `hashi-hero`
- `hashi-logo-grid`
- `hashi-newsletter-signup-form`

### Notes

Previously, this component accepted a `classes` prop, which would pass classNames to the component's root element. The `classes` prop is now deprecated, please use `className` instead, which serves the same purpose of passing additional classes to the `.g-btn` element.
