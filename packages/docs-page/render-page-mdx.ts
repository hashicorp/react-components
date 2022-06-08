import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'
import type { ContentPluginsOptions } from '@hashicorp/platform-markdown-utils'
import grayMatter from 'gray-matter'

// TODO: ensure resolving includes still works
// import path from 'path'
// resolveIncludes: path.join(process.cwd(), localPartialsDir),
// localPartialsDir = 'content/partials',
// localPartialsDir?: string

interface Options {
  mdxContentHook?: (content: string) => string
  remarkPlugins?: ContentPluginsOptions['addRemarkPlugins']
  scope?: Record<string, unknown>
}

async function renderPageMdx(
  mdxFileString: string,
  { mdxContentHook = (c) => c, remarkPlugins = [], scope }: Options = {}
): Promise<{
  mdxSource: MDXRemoteSerializeResult
  frontMatter: Record<string, unknown>
}> {
  const { data: frontMatter, content: rawContent } = grayMatter(mdxFileString)
  const content = mdxContentHook(rawContent)
  const mdxSource = await serialize(content, {
    mdxOptions: markdownDefaults({ remarkPlugins }),
    scope,
  })
  return { mdxSource, frontMatter }
}

export default renderPageMdx
