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

## Props

_WIP_
