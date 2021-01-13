import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import { DocsPageWrapper } from '@hashicorp/react-docs-page'
import generateComponents from '@hashicorp/react-docs-page/components'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'

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
  additionalComponents,
  product,
  terms,
  content,
  docsPageData,
  order,
}) {
  return (
    <div>
      <DocsPageWrapper
        allPageData={docsPageData}
        description="Glossary"
        filePath="/glossary"
        order={[...order, { title: 'Glossary', href: '/docs/glossary' }]}
        pagePath="/docs/glossary/"
        pageTitle="Glossary"
        product={{ name: product.name, slug: product.slug }}
        subpath="docs"
      >
        <>
          <h1>{product.name} Glossary</h1>
          <p>
            This page collects brief definitions of some of the technical terms
            used in the documentation for {product.name}, as well as some terms
            that come up frequently in conversations throughout the{' '}
            {product.name} community.
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
