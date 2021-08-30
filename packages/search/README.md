# @hashicorp/react-search

## Props

### renderHitContent

> `function` | `({ hit: object, Highlight: React.Node }) => React.Component` | _Required_

A render function whose result is used to display each query "hit"

**Params**

| Property  | Type         | Description                                                                         |
| --------- | ------------ | ----------------------------------------------------------------------------------- |
| hit       | `object`     | https://www.algolia.com/doc/api-reference/widgets/highlight/react/#widget-param-hit |
| Highlight | `React.Node` | https://www.algolia.com/doc/api-reference/widgets/highlight/react/                  |

### resolveHitLink

> `function` | | `( hit: object ) => NextLinkProps` | _Optional_ | **Default:** (hit) => ({ href:`/${hit.objectID}` })

A function whose return value is spread as props to `next/link`.
For more information about the available props, reference the next/link documentation: https://nextjs.org/docs/api-reference/next/link

**Params**

| Property | Type     | Description                                                                         |
| -------- | -------- | ----------------------------------------------------------------------------------- |
| hit      | `object` | https://www.algolia.com/doc/api-reference/widgets/highlight/react/#widget-param-hit |

### placeholder

> `string` | _Optional_ | **Default:** `Search`

## Usage

```jsx
import Search from '@hashicorp/react-search'

function SearchBar() {
  return (
    <Search
      renderHitContent={({ hit, Highlight }) => <div>...</div>}
      resolveHitLink={(hit) => ({ href: { pathname: `/${hit.objectID}`, query: { id: hit.__queryID} } })}
      placeholder="Search documentation"
    />
}
```

### Environment Variables

This component relies on the presence of the following environment variables to be available client side:

```text
NEXT_PUBLIC_ALGOLIA_APP_ID
NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
NEXT_PUBLIC_ALGOLIA_INDEX
```

### React

To use the primary `<Search />` component, ensure it exists as a child of the `<SearchProvider />` component. For example:

**App.jsx**

```jsx
import Search, { SearchProvider } from '@hashicorp/react-search'

function App() {
  return (
    <>
      <SearchProvider>
        <Search
          renderHitContent={({hit, Highlight}) => (
            <span className="name">
              <Highlight attribute="name" hit={hit} tagName="span" />
            </span>
          )}
          resolveHitLink={(hit) => ({ href: `/${hit.objectID}` })}
        />
        <ComponentA>
        <ComponentB>
      </SearchProvider>
      <ComponentC__WithoutSearchContext>
    </>
  )
}
```

Any child component of `<SearchProvider />` can utilize the provided `useSearch()` hook and access search-specific information. For example:

```jsx
import { useSearch } from '@hashicorp/react-search'

function ComponentA() {
  const { query } = useSearch()

  return <code>Search query: {query}</code>
}
```

## useSearch()

`useSearch()` exposes the following values:

- `client` (`object`) - Initialized Algolia client
- `indexName` (`string`) - The name of the Algolia index that search is performed upon
- `initAlgoliaInsights` (`function`) - Required to initialize Algolia
- `isCancelled` (`boolean`) - Indicates if search is currently cancelled or not
- `logClick` (`function`) - Fires an analytics event via the `search-insights` package
- `query` (`string`) - Current search query
- `setIsCancelled` (`function`) - Setter function that updates the search cancel state
- `setQuery` (`function`) - Setter function that updates the search query

## Tools

This package includes a `tools.js` file that includes Algolia-related Node.js scripts

### Usage

```js
const {
  indexDocsContent,
  indexContent,
} = require('@hashicorp/react-search/tools')
/* It's worth noting that you'd only want to use *one* of the two exported functions */
```

#### indexDocsContent

> `function` | `(config: object)`
> This specific helper function is designed specifically for perfoming search indexing on our various product sites' documentation pages.

##### config.algoliaConfig: { appId: string, apiKey: string, index: string }

Algolia-related configuration

_Default_:

```js
{
  apiKey: process.env.ALGOLIA_API_KEY,
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
}
```

##### config.contentDir: string

Path to directory that contains the content to be indexed by Algolia

_Default_: `path.join(__dirname, 'pages')`

##### config.filesPattern: string

[minimatch](https://github.com/isaacs/minimatch)-style string to be performed within `config.contentDir`. The results of this pattern match will determine which files to index.

_Default_: `'**/*.mdx'`

##### config.globOptions: { [k:string]: any }

Additional options to include to the glob match. Available options [here](https://github.com/isaacs/node-glob#options)

_Default_: `{ ignore: path.join(config.contentDir, 'partials/**/*') }`

##### config.frontmatterKeys: string[]

Assuming your search-indexed content includes [frontmatter](https://jekyllrb.com/docs/front-matter/), the keys included in this `array` will be included as search criteria.

_Default_: `['page_title', 'description']`

#### indexContent

> `function` | `(config: object)`
> This generic helper function allows for custom Algolia indexing

##### config.algoliaConfig: { appId: string, apiKey: string, index: string }

Algolia-related configuration

_Default_:

```js
{
  apiKey: process.env.ALGOLIA_API_KEY,
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
}
```

##### config.getSearchObjects: () => any

This function should return an array of objects that will get passed to Algolias [`partialUpdateObjects`](https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/) function

## Setting Up Algolia

In order for this component to work at all, you will need to configure an algolia index. Steps to manage this are below:

- Log in to algolia.com using HashiCorp SSO. If you do not have access to algolia, reach out to IT and request access.
- Within algolia, select "incices", then "create new index". See existing indices for naming patterns when choosing your index name. For docs sites, it is usually `product_NAME`.
- In your local `.env` file, use the index name as your `NEXT_PUBLIC_ALGOLIA_INDEX` value
- Make sure that you have created a file in your project that runs the `indexDocsContent` script out of `tools. The file should be quite simple, and look like this:

  ```js
  const { indexDocsContent } = require('@hashicorp/react-search/tools')
  indexDocsContent()
  ```

- Typically we run this script via circleci. Head over to your project's circle configuration and add a block along these lines to jobs:

  ```yaml
  jobs:
    algolia-index:
      docker:
        - image: docker.mirror.hashicorp.services/node:12
      steps:
        - checkout
        - run:
            name: Push content to Algolia Index
            command: |
              cd website/
              npm install
              node scripts/index_search_content.js
  ```

- Then make sure to run the job in the workflows section as well, only when the website is deployed. For docs sites this is on merge to the `stable-website` branch. For most other HashiCorp websites, this is on merge to `main` or `master`.

  ```yaml
  workflows:
    - algolia-index:
        filters:
          branches:
            only:
              - stable-website
  ```

- Next, you'll want to setup two API keys for (1) searching and (2) indexing. Our Algolia keys are currently managed via a [Terraform configuration](https://github.com/hashicorp/mktg-terraform/blob/main/algolia.tf). The ACL for the keys should be configured as follows:

  | **Index** | **ACL**                                                                                    | **Example Descrption**              |
  |-----------|--------------------------------------------------------------------------------------------|-------------------------------------|
  | search    | `search`, `browse`, `listIndexes`                                                          | `{product/project name}: search UI` |
  | index     | `addObject`, `deleteObject`, `search`, `browse`, `listIndexes`, `settings`, `editSettings` | `{product/project name}: write key` |

- Open a PR to update the Terraform Configuration with the new pair of keys.
- Grab the `index` API key, which is sensitive and should not be public, and add it to the environment variables in circleci as `ALGOLIA_API_KEY`.
- Grab the `search` API key, which is public, and add it to the `.env` file in the project: `NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY=xxxx`.
- With this in place, you should be all set! Run the index script once locally, manually setting the algolia API key (like `ALGOLIA_API_KEY=xxxx node scripts/index_search_content.js`) to seed the index and make sure that the component is fully functional locally, then everything should be set!
