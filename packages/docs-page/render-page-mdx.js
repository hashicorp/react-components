import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import grayMatter from 'gray-matter'

async function renderPageMdx(
  mdxFileString,
  {
    mdxContentHook = (c) => c,
    remarkPlugins = [],
    scope,
    localPartialsDir = 'content/partials',
  } = {}
) {
  const { data: frontMatter, content: rawContent } = grayMatter(mdxFileString)
  const content = mdxContentHook(rawContent)
  const mdxSource = await serialize(content, {
    mdxOptions: markdownDefaults({
      resolveIncludes: path.join(process.cwd(), localPartialsDir),
      addRemarkPlugins: remarkPlugins,
    }),
    scope,
  })
  return { mdxSource, frontMatter }
}

export default renderPageMdx
