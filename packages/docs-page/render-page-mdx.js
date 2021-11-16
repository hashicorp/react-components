import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import grayMatter from 'gray-matter'

async function renderPageMdx(
  mdxFileString,
  { mdxContentHook = (c) => c, remarkPlugins = [], scope } = {}
) {
  const headings = []

  const { data: frontMatter, content: rawContent } = grayMatter(mdxFileString)
  const content = mdxContentHook(rawContent)
  const mdxSource = await serialize(content, {
    mdxOptions: markdownDefaults({
      pluginOptions: { anchorLinks: { headings } },
      resolveIncludes: path.join(process.cwd(), 'content/partials'),
      addRemarkPlugins: remarkPlugins,
    }),
    scope,
  })

  return { mdxSource, frontMatter, headings }
}

export default renderPageMdx
