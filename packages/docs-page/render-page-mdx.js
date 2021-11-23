import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'

async function renderPageMdx(
  mdxFileString,
  {
    mdxContentHook = (c) => c,
    remarkPlugins = [],
    rehypePlugins = [],
    scope,
  } = {}
) {
  const content = mdxContentHook(mdxFileString)
  const mdxSource = await serialize(content, {
    mdxOptions: markdownDefaults({
      resolveIncludes: path.join(process.cwd(), 'content/partials'),
      addRemarkPlugins: remarkPlugins,
      addRehypePlugins: rehypePlugins,
    }),
    scope,
    parseFrontmatter: true,
  })
  return { mdxSource, frontMatter: mdxSource.frontmatter }
}

export default renderPageMdx
