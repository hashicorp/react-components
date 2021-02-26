import path from 'path'
import renderToString from 'next-mdx-remote/render-to-string'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'
import generateComponents from './components'
import grayMatter from 'gray-matter'

/*

  // example basic use
  const { mdxSource, frontMatter } = await renderPageMdx(
    mdxString,
    productName
  )

*/

async function renderPageMdx(
  mdxFileString,
  productName,
  scope, // optional, i think?
  additionalComponents = {},
  remarkPlugins = []
) {
  const components = generateComponents(productName, additionalComponents)
  const { data: frontMatter, content } = grayMatter(mdxFileString)
  const mdxSource = await renderToString(content, {
    mdxOptions: markdownDefaults({
      resolveIncludes: path.join(process.cwd(), 'content/partials'),
      addRemarkPlugins: remarkPlugins,
    }),
    components,
    scope,
  })

  return {
    mdxSource,
    frontMatter,
  }
}

export default renderPageMdx
