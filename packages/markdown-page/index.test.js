import { render } from '@testing-library/react'
import generateStaticProps from './server'
import MarkdownPage from './'
import TestComponent from './fixtures/test-component'

test('renders a page from a markdown file', async () => {
  const res = await generateStaticProps({
    pagePath: 'packages/markdown-page/fixtures/test-page.mdx',
  })()
  const container = render(<MarkdownPage staticProps={res.props.staticProps} />)
  const htmlOutput = container.baseElement.innerHTML
  expect(htmlOutput).toMatch(/Test Page<\/h1>/)
  expect(htmlOutput).toMatch(
    /This is a cool test page for the <code>&lt;MarkdownPage \/&gt;<\/code> component, wow!/
  )
})

test('renders components', async () => {
  const components = { TestComponent }
  const res = await generateStaticProps({
    pagePath: 'packages/markdown-page/fixtures/test-page-with-component.mdx',
    components,
  })()
  const container = render(
    <MarkdownPage staticProps={res.props.staticProps} components={components} />
  )
  const htmlOutput = container.baseElement.innerHTML
  expect(htmlOutput).toMatch(/<p>hello im a test component!<\/p>/)
})
