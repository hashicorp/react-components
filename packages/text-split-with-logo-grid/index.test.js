import { render, screen } from '@testing-library/react'
import TextSplitWithLogoGrid from './'

const propsBase = {
  textSplit: {
    heading: 'Open and Extensible',
    content:
      'Terraform works with over 160 different providers for a broad set of common infrastructure. Providers leverage infrastructure-specific APIs to deliver unique capabilities for Terraform users.\n\nOur provider SDK makes it simple to create new and custom providers.',
    linkStyle: 'as-links',
  },
  logoGrid: [
    'microsoft-azure',
    'aws',
    'google',
    'vmware',
    'alibaba-cloud',
    'oracle',
    'kubernetes',
    'datadog',
    'openstack',
  ],
}

describe('<TextSplitWithLogoGrid />', () => {
  it('should render a `.g-text-split` root element', () => {
    const { container } = render(<TextSplitWithLogoGrid {...propsBase} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-text-split')
  })

  it('should render the expected SVGR logo for a slug', () => {
    const { logoGrid, textSplit } = propsBase
    render(<TextSplitWithLogoGrid textSplit={textSplit} logoGrid={logoGrid} />)
    logoGrid.forEach((slug) => {
      expect(screen.getByTitle(slug)).toBeInTheDocument()
    })
  })

  it('should render a custom image', () => {
    const { textSplit } = propsBase
    const customImgAlt = 'My special custom image'
    const logoGrid = [
      {
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
        alt: customImgAlt,
      },
      'adobe',
      'datadog',
    ]
    render(<TextSplitWithLogoGrid textSplit={textSplit} logoGrid={logoGrid} />)
    expect(screen.getByAltText(customImgAlt)).toBeVisible()
    expect(screen.getByAltText(customImgAlt).getAttribute('src')).toBe(
      logoGrid[0].url
    )
  })

  it('should render a linked item when item has linkUrl', () => {
    const { textSplit } = propsBase
    const logoGrid = [
      {
        slug: 'microsoft-azure',
        linkUrl: 'https://www.hashicorp.com/integrations/microsoft',
      },
      {
        slug: 'aws',
        linkUrl: 'https://www.hashicorp.com/integrations/aws',
      },
      {
        url:
          'https://www.datocms-assets.com/2885/1601066676-servicenow-logo.svg',
        alt: 'Service Now Logo',
        linkUrl: 'https://www.hashicorp.com/integrations/servicenow/terraform',
      },
    ]
    render(<TextSplitWithLogoGrid textSplit={textSplit} logoGrid={logoGrid} />)
    logoGrid.forEach(({ slug, alt, linkUrl }) => {
      const gridItemElem = slug
        ? screen.getByTitle(slug).closest('svg')
        : screen.getByAltText(alt)
      expect(gridItemElem).toBeVisible()
      const linkElem = gridItemElem.closest('a')
      expect(linkElem).toBeVisible()
      expect(linkElem.href).toBe(linkUrl)
    })
  })

  it('should throw an error for unknown logo slugs', () => {
    const { textSplit } = propsBase
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(
        <TextSplitWithLogoGrid
          textSplit={textSplit}
          logoGrid={['my-fake-company-logo', 'adobe', 'microsoft-azure']}
        />
      )
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should throw an error if a logoGrid item has no slug and no url', () => {
    const { textSplit } = propsBase
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(
        <TextSplitWithLogoGrid
          textSplit={textSplit}
          logoGrid={[
            'adobe',
            { linkUrl: '/', alt: 'No slug or url' },
            'microsoft-azure',
          ]}
        />
      )
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should throw an error if there are not exactly 3, 6, or 9 logoGrid', () => {
    const { logoGrid, textSplit } = propsBase
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(
        <TextSplitWithLogoGrid
          textSplit={textSplit}
          logoGrid={logoGrid.slice(0, 4)}
        />
      )
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })
})
