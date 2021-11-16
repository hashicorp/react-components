import { config } from 'dotenv'
config()
import HashiHead from '@hashicorp/react-head'
import Head from 'next/head'
import { render, screen } from '@testing-library/react'
import DocsPage from '.'
import props from './props'
import { getTestValues } from 'swingset/testing'
import renderPageMdx from './render-page-mdx'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

const defaultProps = getTestValues(props)

// Mocking HashiHead as it's already unit tested itself
jest.mock('@hashicorp/react-head', () => jest.fn(() => null))

const useRouterMock = mocked(useRouter)
const headMock = mocked(Head)

jest.mock('next/router')
jest.mock('next/head')

describe('<DocsPage />', () => {
  const routerMock = ({
    asPath: '/docs/overview',
  } as unknown) as Router

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => routerMock)
    headMock.mockImplementation(({ children }) => <>{children}</>)
  })

  it('passes `title`, `description`, and `siteName` correctly to <HashiHead>', () => {
    render(<DocsPage {...defaultProps} />)
    expect(HashiHead).toHaveBeenCalledWith(
      {
        description: 'Test description',
        siteName: 'Terraform by HashiCorp',
        title: 'Test Page | Terraform by HashiCorp',
      },
      expect.anything()
    )
  })

  it('passes props correctly to <DocsSidenav>', () => {
    render(<DocsPage {...defaultProps} />)
    // Confirm `baseRoute` and `navData` by checking for a rendered link
    const activeLeaf = screen.getByText('AWS').closest('a')
    expect(activeLeaf.getAttribute('href')).toBe(
      '/docs/agent/autoauth/methods/aws'
    )
    // Confirm `currentPath` by ensuring a link is marked as active
    expect(activeLeaf.getAttribute('data-is-active')).toBe('true')
  })

  it('passes `product` and `content` correctly to <Content>', () => {
    render(<DocsPage {...defaultProps} />)
    // Confirm `content` is being rendered
    const contentParagraphs = screen.getAllByText('This is a cool docs page!')
    expect(contentParagraphs.length).toBe(4)
    const contentParagraph = contentParagraphs[0]
    expect(contentParagraph.tagName).toBe('P')
    // Confirm `product` is passed via class
    const contentContainer = contentParagraph.closest('article')
    expect(contentContainer.className).toContain('terraform')
  })

  it('displays `showEditPage` as true by default, and renders `mainBranch` in the link', () => {
    render(<DocsPage {...defaultProps} />)
    const expectedHref =
      'https://github.com/hashicorp/vault/blob/master/website/content/docs/agent/autoauth/methods/aws.mdx'
    const editPageLink = screen.getByText('Edit this page').closest('a')
    expect(editPageLink.getAttribute('href')).toBe(expectedHref)
  })

  it('if `showEditPage` is set to false, does not display', () => {
    render(<DocsPage {...defaultProps} showEditPage={false} />)
    const editPageLink = screen.queryByText('Edit this page')
    expect(editPageLink).toBeNull()
  })

  it('passes `additionalComponents` to mdx remote for rendering if present', async () => {
    function CustomComponent() {
      return <strong>Text in custom component</strong>
    }
    const additionalComponents = { CustomComponent }
    const { mdxSource, frontMatter } = await renderPageMdx(
      "## Heading Two\n\nHere's a paragraph of content.\n\n<CustomComponent />"
    )
    render(
      <DocsPage
        {...defaultProps}
        additionalComponents={additionalComponents}
        staticProps={{
          currentPath: defaultProps.staticProps.currentPath,
          mdxSource,
          frontMatter,
          navData: defaultProps.staticProps.navData,
        }}
      />
    )
    // Find the text rendered by the custom component
    const customComponentElem = screen.getByText('Text in custom component')
    expect(customComponentElem.tagName).toBe('STRONG')
  })

  it('initializes jump to section UI if there is an h1 and two or more h2s', async () => {
    const { mdxSource, frontMatter } = await renderPageMdx(
      "---\n\npage_title: Test Title\ndescription: Test description\n---\n\n# Heading One\n\nAn intro paragraph.\n\n## Heading Two\n\nHere's a paragraph of content.\n\n## Here a second heading\n\nAnd another paragraph."
    )
    render(
      <DocsPage
        {...defaultProps}
        staticProps={{
          currentPath: defaultProps.staticProps.currentPath,
          mdxSource,
          frontMatter,
          navData: defaultProps.staticProps.navData,
        }}
      />
    )
    const jumpToSectionElem = screen.getByText('Jump to Section')
    expect(jumpToSectionElem.tagName).toBe('SPAN')
  })

  describe('when versioned docs is enabled', () => {
    it('should allow crawlers to index latest pages', () => {
      useRouterMock.mockImplementation(() => {
        return ({
          asPath: '/docs',
        } as unknown) as Router
      })

      render(
        <DocsPage
          {...defaultProps}
          showVersionSelect={true}
          staticProps={{
            ...defaultProps.staticProps,
            versions: [
              { name: 'latest', label: 'latest' },
              { name: 'v0.5.1', label: 'v0.5.1' },
            ],
          }}
        />
      )

      expect(
        document.querySelector('meta[name=robots]')
      ).not.toBeInTheDocument()
    })

    it('should tell crawlers to not index versioned pages', () => {
      useRouterMock.mockImplementation(() => {
        return ({
          asPath: '/docs/v0.5.1',
        } as unknown) as Router
      })

      render(
        <DocsPage
          {...defaultProps}
          showVersionSelect={true}
          staticProps={{
            ...defaultProps.staticProps,
            versions: [
              { name: 'latest', label: 'latest' },
              { name: 'v0.5.1', label: 'v0.5.1' },
            ],
          }}
        />
      )

      expect(document.querySelector('meta[name=robots]')).toBeInTheDocument()
    })
  })
})
