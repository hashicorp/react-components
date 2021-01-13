import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import { DocsPageWrapper } from '@hashicorp/react-docs-page'
import generateComponents from '@hashicorp/react-docs-page/components'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'

import order from 'data/docs-navigation.js'
import { productName, productSlug } from 'data/metadata'

function GlossaryTableOfContents({ terms }) {
  return (
    <ul>
      {terms.map(({ title }) => (
        <li key={title}>
          <a href={`#${title}`}>{title}</a>
        </li>
      ))}
    </ul>
  )
}

export default function GlossaryPage({
  product,
  terms,
  content,
  docsPageData,
}) {
  return (
    <div>
      <DocsPageWrapper
        product={{ name: product.name, slug: product.slug }}
        staticProps={{
          frontMatter: {
            page_title: 'Glossary',
            layout: 'docs',
            description: 'Glossary',
          },
          data: docsPageData,
          filePath: 'docs/glossary.mdx',
          pagePath: '/docs/glossary/',
        }}
        order={[...order, { title: 'Glossary', href: '/docs/glossary' }]}
        subpath="docs"
      >
        <>
          <h1>{productName} Glossary</h1>
          <p>
            This page collects brief definitions of some of the technical terms
            used in the documentation for {productName}, as well as some terms
            that come up frequently in conversations throughout the{' '}
            {productName} community.
          </p>
          <GlossaryTableOfContents terms={terms} />
          {hydrate(content, {
            components: generateComponents(product.name, additionalComponents),
          })}
        </>
      </DocsPageWrapper>
    </div>
  )
}
