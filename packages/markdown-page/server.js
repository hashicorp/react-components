import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import markdownDefaults from '@hashicorp/platform-markdown-utils'

export default function generateGetStaticProps({
  pagePath,
  includesRoot = path.join(process.cwd(), 'content/partials'),
}) {
  return async function getStaticProps() {
    const filePath = path.join(process.cwd(), pagePath)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const mdxSource = await serialize(fileContent, {
      mdxOptions: markdownDefaults({ resolveIncludes: includesRoot }),
      parseFrontmatter: true,
    })
    return {
      props: {
        staticProps: {
          mdxSource,
          head: {
            title: mdxSource.frontmatter.page_title || null,
            description: mdxSource.frontmatter.description || null,
          },
        },
      },
    }
  }
}
