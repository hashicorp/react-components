## Product Meta

This package contains helpers for accessing Product related metadata. This is specifically helpful with theme color overrides.

```ts
interface ProductMeta {
  name: string
  slug: string
  themeClass?: string // a class that resets `brand` css variables
}
```

The following are available functions and components for use:

- `useProductMeta`: A hook for accessing Product Metadata
- `ProductMetaProvider`: A provider component that _sets_ the product for all child consumers.
- `withProductMeta`: A Higher Order Component that passes Product Metadata as the `product` prop — helpful with class components.

### `useProductMeta`

This function is designed to work both within and outside of a Product Context. Components can pass a product name directly and get metadata outside of context, or they can set the 'product' higher up in the tree via `ProductProvider`, call `useProductMeta` without passing a product argument, context will provide the correct metadata.

```ts
useProductMeta(product?: Products): ProductMeta

type Products =
  | 'hashicorp'
  | 'boundary'
  | 'consul'
  | 'nomad'
  | 'packer'
  | 'terraform'
  | 'vault'
  | 'vagrant'
  | 'waypoint'
```

**Defaults**

If `useProductMeta` is passed `undefined` or a non-product string, the values will default to:

```js
{
  name: 'Hashicorp',
  slug: 'hashicorp',
  // themeClass is undefined, defaults to HC brand colors
}
```

### Examples:

Consuming metadata by passing `product` directly (not within context)

```js
export default function Content({ content, product }) {
  const { name, themeClass } = useProductMeta(product)

  return (
    <article className={`${themeClass || ''} `}>
      <h1>{name}</h1>
      {content}
    </article>
  )
}
```

#### `ProductMetaProvider`

Accessing metadata from a product set by a provider:

```js
export default function SomeParent({ children }) {
  return (
    <ProductMetaProvider product="terraform">
      //... renders `Content` further down the tree
    </ProductMetaProvider>
  )
}

function Content({ content }) {
  const { name, theme } = useProductMeta()

  return (
    <article className={`${themeClass ?? ''} `}>
      <h1>{name}</h1>
      {content}
    </article>
  )
}
```

In this usecase, the child components don't need a `product` prop, because it is set within the parent context.

#### `withProductMeta`

Using the `withProductMeta` HOC to pass down product metadata.

```js
class Content extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, themeClass } = this.props.product

    return (
      <article className={`${themeClass ?? ''} `}>
        <h1>{name}</h1>
        {content}
      </article>
    )
  }
}

export default withProductMeta(Content)
```

#### Resetting Product Theme Variables

The final client usecase in Markdown or on a page for this `Content` component could look like:

```jsx
<Content product="terraform" content="LoremIpsum">
```

And say the corresponding CSS is:

```css
h1 {
  color: var(--brand);
}
```

This `--brand` value will be overridden to be `--terraform` purple.
