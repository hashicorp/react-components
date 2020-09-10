import 'regenerator-runtime/runtime'
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DocsSidenav from './'
import transformProps from '../../__test-helpers/transform-props'
import expectThrow from '../../__test-helpers/expect-throw'

const defaultProps = transformProps(__dirname)

describe('<DocsSidenav />', () => {
  it('should render and display nesting levels correctly', () => {
    render(<DocsSidenav {...defaultProps} />)

    // For this test, we step through the expected nesting levels based on
    // the fixture data, ensuring that each level is nested properly and has
    // the classes to reflect whether it's shown as active
    const levelOne = screen.getByTestId('Vault Agent container')
    expect(levelOne).toHaveClass('open')
    expect(levelOne).toHaveClass('active')

    const levelTwo = screen.getByTestId('Auto-Auth container')
    expect(levelTwo).toHaveClass('open')
    expect(levelTwo).toHaveClass('active')

    const levelThree = screen.getByTestId('Methods container')
    expect(levelThree).toHaveClass('open')
    expect(levelThree).toHaveClass('active')

    const levelFour = screen.getByTestId('/docs/agent/autoauth/methods/aws')
    expect(levelFour).toHaveClass('active')

    // Let's also make sure that other pages are not also displaying as active
    // First we check an identically named page at a different level
    const [dupe1] = screen.getAllByTestId('/docs/agent/autoauth/aws')
    expect(dupe1).not.toHaveClass('active')
    // Next we check a page at the same level but with a different name
    const dupe2 = screen.getByTestId('/docs/agent/autoauth/methods/gcp')
    expect(dupe2).not.toHaveClass('active')
    // Finally we check the overview page at the same level
    const dupe3 = screen.getByTestId('/docs/agent/autoauth/methods')
    expect(dupe3).not.toHaveClass('active')
  })

  it.todo('should render accurately when the current page is an "overview"')

  it('should expand/collapse directory-level menu items when clicked', () => {
    render(<DocsSidenav {...defaultProps} />)

    const levelTwoLink = screen.getByText('Auto-Auth')
    fireEvent.click(levelTwoLink)
    const levelTwo = screen.getByTestId('Auto-Auth container')
    expect(levelTwo).not.toHaveClass('open')
    fireEvent.click(levelTwoLink)
    expect(levelTwo).toHaveClass('open')
  })

  it('should not display menu item as active when it uses an href that matches currentPage', async () => {
    render(<DocsSidenav {...defaultProps} currentPage="/docs/agent/autoauth/aws" />)

    const autoAuthContainer = screen.getByTestId('Auto-Auth container')
    expect(autoAuthContainer).toHaveClass('open')
    expect(autoAuthContainer).toHaveClass('active')

    const internalHrefContainer = screen.getByTestId('Internal Href container')
    expect(internalHrefContainer).not.toHaveClass('open')
    expect(internalHrefContainer).not.toHaveClass('active')

    const [activeAwsLink, inactiveAwsLink] = screen.getAllByTestId('/docs/agent/autoauth/aws')
    expect(activeAwsLink).toHaveClass('active')
    expect(inactiveAwsLink).not.toHaveClass('active')
  })

  it('should display title from index file for directory-level menu items that specify name and use an index file', async () => {
    render(
      <DocsSidenav
        {...defaultProps}
        data={[
          ...defaultProps.data,
          {
            __resourcePath: 'docs/agent/no-index-test/index.mdx',
            page_title: 'Title From Index File',
          }
        ]}
      />
    )

    const container = screen.getByTestId('Title From Index File container')
    expect(container).toHaveTextContent('Title From Index File')
  })

  it('should show/hide the menu when the "menu" button is clicked on mobile', async () => {
    render(<DocsSidenav {...defaultProps} />)

    const mobileMenu = screen.getByTestId('mobile-menu')
    const sidebarNav = screen.getByTestId('root')

    expect(sidebarNav).not.toHaveClass('open')
    fireEvent.click(mobileMenu)
    expect(sidebarNav).toHaveClass('open')
    fireEvent.click(mobileMenu)
    expect(sidebarNav).not.toHaveClass('open')
  })

  it('should error when a category is used with no content', () => {
    expectThrow(() => {
      render(<DocsSidenav {...defaultProps} order={[{ category: 'test' }]} />)
    }, 'The item "test" within "data/docs-navigation.js" has a category but no content, indicating that there is a folder that contains only an "index.mdx" file, which is not allowed. To fix this, move and rename "pages/docs/test/index.mdx" to "pages/docs/test.mdx", then change the value from "{ category: \'test\' }" to just "test"')
  })

  it('should error when a page is not found within a category', () => {
    expectThrow(() => {
      render(
        <DocsSidenav
          {...defaultProps}
          order={[
            {
              category: 'agent',
              content: [{ category: 'test', content: ['foo'] }],
            },
          ]}
        />
      )
    }, 'The page "foo" was not found within the category "agent/test". Please double-check to ensure that "docs/agent/test/foo.mdx" exists. If this page was never intended to exist, remove the key "foo" from the category "agent/test" in "data/docs-navigation.js"')
  })

  it('should error when a direct link does not use both "title" and "href"', () => {
    expectThrow(() => {
      render(<DocsSidenav {...defaultProps} order={[{ title: 'foo' }]} />)
    }, 'Malformed direct sidebar link:\n\n {"title":"foo"}\n\nDirect links must have a "href" and a "title" property.')

    expectThrow(() => {
      render(<DocsSidenav {...defaultProps} order={[{ href: 'bar' }]} />)
    }, 'Malformed direct sidebar link:\n\n {"href":"bar"}\n\nDirect links must have a "href" and a "title" property.')
  })

  it('should error when a category contains no index file and no name', () => {
    expectThrow(() => {
      render(
        <DocsSidenav
          {...defaultProps}
          order={[
            {
              category: 'agent',
              content: [
                {
                  category: 'no-index-test',
                  content: ['foo'],
                },
              ],
            },
          ]}
        />
      )
    }, 'An index page or "name" property is required for all categories.\nIf you would like an index page for this category, please add an index file at the path "agent/no-index-test/index.mdx".\nIf you do not want an index page for this category, please add a "name" property to the category object to specify the category\'s human-readable title.\n\nItem:\n{\n  "category": "no-index-test",\n  "content": [\n    "foo"\n  ],\n  "stack": [\n    "agent",\n    "no-index-test"\n  ]\n}')
  })

  it('should error when a category uses a name property and specifies an overview page', () => {
    expectThrow(() => {
      render(
        <DocsSidenav
          {...defaultProps}
          order={[
            {
              category: 'agent',
              content: [
                {
                  category: 'no-index-test',
                  name: 'No Index Test',
                  content: ['overview'],
                },
              ],
            },
          ]}
        />
      )
    }, 'The category "agent/no-index-test" is using a "name" property to indicate that it has no index, but also has a manually added "overview" page. This can be fixed with the following steps:\n\n- Change the "overview.mdx" page to be "index.mdx"\n- Remove the "name" property from the "no-index-test" data, instead indicate the category\'s name using the frontmatter on the new "index.mdx" page')
  })

  it('should render and display nesting levels correctly when provided new prop structure', () => {
    render(
      <DocsSidenav
        product="default"
        baseUrl="/docs"
        activePath="agent/autoauth/methods/aws"
        routes={[
          {
            title: 'Vault Agent',
            routes: [
              {
                title: 'Overview',
                path: 'agent',
              },
              {
                title: 'Auto-Auth',
                routes: [
                  {
                    title: 'Overview',
                    path: 'agent/autoauth',
                  },
                  {
                    title: 'Methods',
                    routes: [
                      {
                        title: 'Overview',
                        path: 'agent/autoauth/methods',
                      },
                      {
                        title: 'External Link',
                        href: 'https://google.com'
                      },
                      {
                        title: 'AliCloud',
                        path: 'agent/autoauth/methods/alicloud',
                      },
                      {
                        title: '<code>AWS</code>',
                        path: 'agent/autoauth/methods/aws',
                      },
                      {
                        title: 'Azure',
                        path: 'agent/autoauth/methods/azure',
                      },
                      { divider: true },
                      {
                        title: '<code>GCP</code>',
                        path: 'agent/autoauth/methods/gcp',
                      },
                      {
                        title: 'JWT',
                        path: 'agent/autoauth/methods/jwt',
                      },
                      {
                        title: 'Kubernetes',
                        path: 'agent/autoauth/methods/kubernetes',
                      },
                    ],
                  },
                  {
                    title: 'Sinks',
                    routes: [
                      {
                        title: 'Overview',
                        path: 'agent/autoauth/sinks',
                      },
                      {
                        title: 'File',
                        path: 'agent/autoauth/sinks/file'
                      }
                    ],
                  },
                  {
                    title: '<code>AWS</code>',
                    path: 'agent/autoauth/aws',
                  },
                ],
              },
              {
                title: 'No Index Category',
                routes: [
                  {
                    title: 'Foo Item',
                    path: 'agent/no-index-test/foo',
                  },
                ],
              },
              {
                title: 'Only Index Test <sup>ENT</sup>',
                routes: [
                  {
                    title: 'Overview',
                    path: 'agent/only-index-test',
                  }
                ],
              },
              {
                title: 'Internal Href',
                routes: [
                  {
                    title: 'Internal Link',
                    path: 'agent/autoauth/aws',
                    canonical: false
                  },
                ],
              },
            ],
          },
        ]}
      />
    )

    // For this test, we step through the expected nesting levels based on
    // the fixture data, ensuring that each level is nested properly and has
    // the classes to reflect whether it's shown as active
    const levelOne = screen.getByTestId('Vault Agent container')
    expect(levelOne).toHaveClass('open')
    expect(levelOne).toHaveClass('active')

    const levelTwo = screen.getByTestId('Auto-Auth container')
    expect(levelTwo).toHaveClass('open')
    expect(levelTwo).toHaveClass('active')

    const levelThree = screen.getByTestId('Methods container')
    expect(levelThree).toHaveClass('open')
    expect(levelThree).toHaveClass('active')

    const levelFour = screen.getByTestId('/docs/agent/autoauth/methods/aws')
    expect(levelFour).toHaveClass('active')

    // Let's also make sure that other pages are not also displaying as active
    // First we check an identically named page at a different level
    const [dupe1] = screen.getAllByTestId('/docs/agent/autoauth/aws')
    expect(dupe1).not.toHaveClass('active')
    // Next we check a page at the same level but with a different name
    const dupe2 = screen.getByTestId('/docs/agent/autoauth/methods/gcp')
    expect(dupe2).not.toHaveClass('active')
    // Finally we check the overview page at the same level
    const dupe3 = screen.getByTestId('/docs/agent/autoauth/methods')
    expect(dupe3).not.toHaveClass('active')
  })
})
