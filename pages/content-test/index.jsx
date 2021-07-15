import MarkdownPage from '../../packages/markdown-page'
import Button from '../../packages/button'
import generateGetStaticProps from '../../packages/markdown-page/server'

function ContentTestPage(staticProps) {
  return <MarkdownPage {...staticProps} components={{ Button }} />
}

export const getStaticProps = generateGetStaticProps({
  pagePath: 'packages/content/fixtures/example-content.mdx',
})

export default ContentTestPage
