# Content

Styling wrapper for content markup, typically used to render markdown content. Support a small number of customizations, as well as a variable product color to be used as an accent.

### Props

- `content`: A [slot](https://reactjs.org/docs/composition-vs-inheritance.html#containment) to render child elements
- `product` _[optional]_: lowercase product name (vault, nomad, consul, terraform) - this will set link colors to the selected product color as defined in `global-styles`
