import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Pluggable } from 'unified'
import grayMatter from 'gray-matter'
interface Options {
  mdxContentHook?: (content: string) => string
  remarkPlugins?: Pluggable[]
  rehypePlugins?: Pluggable[]
  scope?: Record<string, unknown>
}

async function renderPageMdx(
  mdxFileString: string,
  {
    mdxContentHook = (c) => c,
    remarkPlugins = [],
    rehypePlugins = [],
    scope,
  }: Options = {}
): Promise<{
  mdxSource: MDXRemoteSerializeResult
  frontMatter: Record<string, unknown>
}> {
  const { data: frontMatter, content: rawContent } = grayMatter(mdxFileString)
  const content = mdxContentHook(rawContent)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins,
      rehypePlugins,
    },
    scope,
  })
  return { mdxSource, frontMatter }
}

export default renderPageMdx
