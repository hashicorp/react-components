# DocsPage

The **DocsPage** component lets you create a Hashicorp branded docs page in NextJS projects using `next-mdx-remote`. This is a very highly abstracted component with slightly more involved usage since it renders an entire page.

## Example Usage

This component is intended to be used on an [optional catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) page, like `pages/docs/[[slug]].mdx` - example source shown below:

```js
import order from 'data/docs-navigation.js'
import DocsPage from '@hashicorp/react-docs-page'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@hashicorp/react-docs-page/server'

const productName = 'Vault'
const productSlug = 'vault'
// this example is at `pages/docs/[[slug]].mdx` - if the path is different
// this 'subpath' prop should be adjusted to match
const subpath = 'docs'

function DocsLayout(props) {
  return (
    <DocsPage
      productName={productName}
      productSlug={productSlug}
      subpath={subpath}
      order={order}
      showEditPage={true}
      staticProps={props}
    />
  )
}

export async function getStaticPaths() {
  return generateStaticPaths(subpath)
}

export async function getStaticProps({ params }) {
  return generateStaticProps({ subpath, productName, params })
}

export default DocsLayout
```

This may seem like a complex example, but there is a lot going on here. The component is taking care of an entire base-level route, including an index page and its potentially hundreds of sub-pages, while providing a minimal interface surface area.

In order for the search functionality to work properly, this component requires a `.env` file with the following keys filled in:

```
NEXT_PUBLIC_ALGOLIA_APP_ID
NEXT_PUBLIC_ALGOLIA_INDEX
NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
```

## Props

See [props.js](props.js) for more information on props.
