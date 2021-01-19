import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import slugify from 'slugify'
import { DocsPageWrapper } from '@hashicorp/react-docs-page'
import { fastReadFrontMatter } from '@hashicorp/react-docs-page/server'
import generateComponents from '@hashicorp/react-docs-page/components'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'

export default async function generateStaticProps({
  additionalComponents,
  productName,
  scope,
}) {
  const docsPath = path.join(process.cwd(), 'content', 'docs')

  const docsPageData = (await fastReadFrontMatter(docsPath)).map((p) => {
    p.__resourcePath = `docs/${p.__resourcePath}`
    return p
  })

  const { terms, mdxBlob } = await getGlossaryTerms()
  return {
    props: {
      terms,
      content: await renderToString(mdxBlob, {
        mdxOptions: markdownDefaults({
          resolveIncludes: path.join(process.cwd(), 'content/partials'),
        }),
        components: generateComponents(productName, additionalComponents),
      }),
      docsPageData,
    },
  }
}

async function getGlossaryTerms() {
  const glossaryDir = path.join(process.cwd(), 'content', 'glossary')

  // get a list of paths to all term files
  const termFiles = (await fs.promises.readdir(glossaryDir)).map((filename) =>
    path.join(glossaryDir, filename)
  )

  let mdxBlob = ''

  // read the mdx files, add heading elements to the markdown, and sort
  const terms = (
    await Promise.all(
      termFiles.map(async (filePath) => {
        const source = await fs.promises.readFile(filePath, {
          encoding: 'utf-8',
        })
        const { content, data } = matter(source)

        return {
          title: data.title,
          slug: slugify(data.title, { lower: true, strict: true }),
          content: `## ${data.title}\n${content}`,
        }
      })
    )
  ).sort(({ titleA }, { titleB }) => titleA > titleB)

  // create a single mdx blob so we only have a single call out to next-mdx-remote. This reduces generated boilerplate code
  for (const term of terms) {
    mdxBlob = mdxBlob.concat('\n', term.content)
  }

  return { terms, mdxBlob }
}
