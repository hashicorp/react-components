import path from 'path'
import renderToString from 'next-mdx-remote/render-to-string'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'
import generateComponents from './components'
import grayMatter from 'gray-matter'

async function renderPageMdx(
  mdxFileString,
  {
    productName,
    mdxContentHook = (c) => c,
    additionalComponents = {},
    remarkPlugins = [],
    scope,
  } = {}
) {
  const components = generateComponents(productName, additionalComponents)
  const { data: frontMatter, content: rawContent } = grayMatter(mdxFileString)
  const content = mdxContentHook(rawContent)
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
