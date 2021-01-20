# GlossaryPage

The **GlossaryPage** component lets you create a specialized glossary view for HashiCorp product docs. Under the hood this component utilizes [**DocsPage**](../docs-page) to ensure the layout is consistent with other docs pages.

## Example Usage

```js
import GlossaryPage from '@hashicorp/react-glossary-page'
import generateStaticProps from '@hashicorp/react-glossary-page/server'

import order from 'data/docs-navigation.js'
import { productName, productSlug } from 'data/metadata'

export default function GlossaryLayout(staticProps) {
  return (
    <GlossaryPage
      order={order}
      product={{ name: productName, slug: productSlug }}
      staticProps={staticProps}
    />
  )
}

export async function getStaticProps() {
  return generateStaticProps({ productName })
}
```

To ensure a link appears in the docs navigation, be sure to add an item to the `data/docs-navigation.js` file. The glossary link should appear at the top-level of the navigation.

```js
{
  title: 'Glossary',
  href: '/docs/glossary',
}
```

## Props

See [props.js](./props.js) for more information on props.
