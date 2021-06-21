import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/nextjs-scripts/markdown'
import matter from 'gray-matter'

/*

need this to get code-block "kitchen sink" stuff to work,
as need to pull nextjs-scripts from project root, not packages/markdown-page/node_modules
... and don't actually want to update markdown-page quite yet.

other than the dep issue, this file is identical to
packages/markdown-page/node_modules

*/
export default function generateGetStaticProps({
  pagePath,
  includesRoot = path.join(process.cwd(), 'content/partials'),
  components = {},
}) {
  return async function getStaticProps() {
    const filePath = path.join(process.cwd(), pagePath)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    const mdxSource = await serialize(content, {
      components,
      mdxOptions: markdownDefaults({
        resolveIncludes: includesRoot,
      }),
    })
    return {
      props: {
        staticProps: {
          mdxSource,
          head: {
            title: data.page_title || null,
            description: data.description || null,
          },
        },
      },
    }
  }
}
