import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import { DocsPageWrapper } from '@hashicorp/react-docs-page'
import generateComponents from '@hashicorp/react-docs-page/components'

// TODO: generate slug for anchor in ToC
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
  mainBranch,
  order,
  product,
  showEditPage,
  staticProps: { content, terms, docsPageData },
}) {
  return (
    <DocsPageWrapper
      allPageData={docsPageData}
      description="Glossary"
      filePath="glossary"
      mainBranch={mainBranch}
      order={[...order, { title: 'Glossary', href: '/docs/glossary' }]}
      pagePath="/docs/glossary/"
      pageTitle="Glossary"
      product={{ name: product.name, slug: product.slug }}
      subpath="docs"
      showEditPage={showEditPage}
    >
      <>
        <h1>{product.name} Glossary</h1>
        <p>
          This page collects brief definitions of some of the technical terms
          used in the documentation for {product.name}, as well as some terms
          that come up frequently in conversations throughout the {product.name}{' '}
          community.
        </p>
        <GlossaryTableOfContents terms={terms} />
        {hydrate(content, {
          components: generateComponents(product.name, additionalComponents),
        })}
      </>
    </DocsPageWrapper>
  )
}
