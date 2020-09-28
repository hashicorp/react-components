# DocsPage

The **DocsPage** component lets you create a Hashicorp branded docs page in NextJS projects.

```shell
npm install @hashicorp/react-docs-page
```

## Usage

```jsx
import DocsPage from '@hashicorp/react-docs-page'

<DocsPage
  head={{
    is: require('next/head'),
    title: 'Introduction | HashiDocs by HashiCorp'
    description: 'Documentation for things that go without explaining.',
    siteName: 'HashiDocs by HashiCorp',
  }}
  product="hashidocs"
  resourceURL="https://github.com/hashicorp/hashidocs/blob/master/website/pages/docs/introduction.mdx"
  sidenav={{
    Link: require('next/link'),
    category: 'intro',
    currentPage: '/docs/configuration',
    data: require('path/to/pages/*.mdx').frontMatter,
    order: require('path/to/data/hashidocs-navigation')
  }}
/>
```

## Props

### head

The `head` prop defines the props passed into [HashiHead].

```jsx
{
  is: require('next/head'),
  title: 'JSON Job Specification - HTTP API',
  description: 'Jobs can also be specified via the HTTP API using a JSON format. This guide discusses the job specification in JSON format.',
  siteName: 'Nomad by HashiCorp'
}
```

### product

The `product` prop defines the current product for color theming.
It is used exclusively by [DocsSidenav].

```jsx
{
  product: 'nomad'
}
```

### resourceURL

The `resourceURL` prop defines the source used to generate the content of the page.

```jsx
{
  resourceURL: 'https://https://github.com/hashicorp/nomad/blob/master/website/pages/docs/commands/acl/bootstrap.mdx'
}
```

### sidenav

The `sidenav` prop defines the props passed into [DocsSidenav].

```jsx
{
  Link: require('next/link'),
  category: 'intro',
  currentPage: '/docs/configuration',
  data: require('path/to/pages/*.mdx').frontMatter,
  order: require('path/to/data/api-navigation')
}
```

### children

Additional children may be appended to the component.

[docssidenav]: https://github.com/hashicorp/web-components/tree/master/packages/docs-sidenav
[frontmatter]: https://jekyllrb.com/docs/front-matter/
[hashihead]: https://github.com/hashicorp/web-components/tree/master/packages/head
