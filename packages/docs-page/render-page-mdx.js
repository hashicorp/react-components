import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import jumpToSection from '@hashicorp/platform-remark-plugins/plugins/jump-to-section'
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
      addRemarkPlugins: [...remarkPlugins, jumpToSection],
    }),
    // `scope.headings` is used for the `jumpToSection` remark plugin
    // - it can be removed when `jumpToSection` is removed
    scope: { ...scope, headings },
  })

  return { mdxSource, frontMatter, headings }
}

export default renderPageMdx
