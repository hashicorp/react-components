import { MDXRemote } from 'next-mdx-remote'
import { DocsPageInner } from '@hashicorp/react-docs-page'
import generateComponents from '@hashicorp/react-docs-page/components'
import s from './style.module.css'

function GlossaryTableOfContents({ terms }) {
  return (
    <ul className={s.tableOfContents}>
      {terms.map(({ title, slug }) => (
        <li key={title}>
          <a href={`#${slug}`}>{title}</a>
        </li>
      ))}
    </ul>
  )
}

export default function GlossaryPage({
  additionalComponents,
  product,
  showEditPage,
  staticProps: { mdxSource, terms, navData, githubFileUrl },
}) {
  return (
    <DocsPageInner
      navData={navData}
      description="Glossary"
      filePath="glossary"
      githubFileUrl={githubFileUrl}
      currentPath="glossary"
      pageTitle="Glossary"
      product={{ name: product.name, slug: product.slug }}
      baseRoute="docs"
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
        <MDXRemote
          {...mdxSource}
          components={generateComponents(product.name, additionalComponents)}
        />
      </>
    </DocsPageInner>
  )
}
