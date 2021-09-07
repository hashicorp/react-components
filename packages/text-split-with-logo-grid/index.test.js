import { render, screen } from '@testing-library/react'
import TextSplitWithLogoGrid from './'

const propsBase = {
  textSplit: {
    className: 'g-text-split',
    heading: 'Open and Extensible',
    content:
      'Terraform works with over 160 different providers for a broad set of common infrastructure. Providers leverage infrastructure-specific APIs to deliver unique capabilities for Terraform users.\n\nOur provider SDK makes it simple to create new and custom providers.',
    linkStyle: 'as-links',
  },
  logoGrid: [
    {
      url: 'https://www.datocms-assets.com/2885/1566919170-aws.svg',
      alt: 'AWS',
      linkUrl: '/integrations/aws',
    },
    {
      url:
        'https://www.datocms-assets.com/2885/1539799149-azure-stacked-color.svg',
      alt: 'Microsoft Azure',
      linkUrl: '/integrations/microsoft',
    },
    {
      url: 'https://www.datocms-assets.com/2885/1513617132-google-cloud.svg',
      alt: 'Google Cloud',
      linkUrl: '/integrations/google-cloud',
    },
    {
      url: 'https://www.datocms-assets.com/2885/1566919186-oracle.svg',
      alt: 'Oracle',
      linkUrl: '/integrations/oracle',
    },
    {
      url: 'https://www.datocms-assets.com/2885/1521842502-alibaba.png',
      alt: 'Alibaba Cloud',
      linkUrl: '/integrations/alibaba',
    },
    {
      url: 'https://www.datocms-assets.com/2885/1616772767-vmware.png',
      alt: 'Vmware',
      linkUrl: '/integrations/vmware',
    },
  ],
}

describe('<TextSplitWithLogoGrid />', () => {
  it('should render a `.g-text-split` root element', () => {
    const { container } = render(<TextSplitWithLogoGrid {...propsBase} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(propsBase.textSplit.className)
  })

  it('should render a custom image', () => {
    const { textSplit } = propsBase
    const customImgAlt = 'My special custom image'
    const logoGrid = [
      {
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
        alt: customImgAlt,
      },
      {
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
      },
      {
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
      },
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
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
        alt: 'Serverless Icon',
        linkUrl: 'https://www.hashicorp.com/integrations/microsoft',
      },
      {
        url: 'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
        alt: 'Serverless Icon 2',
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
    logoGrid.forEach(({ alt, linkUrl }) => {
      const gridItemElem = screen.getByAltText(alt)
      expect(gridItemElem).toBeVisible()
      const linkElem = gridItemElem.closest('a')
      expect(linkElem).toBeVisible()
      expect(linkElem.href).toBe(linkUrl)
    })
  })

  it('should throw an error if a logoGrid item has no url', () => {
    const { textSplit } = propsBase
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(
        <TextSplitWithLogoGrid
          textSplit={textSplit}
          logoGrid={[
            {
              url:
                'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
            },
            { linkUrl: '/', alt: 'No url' },
            {
              url:
                'https://www.datocms-assets.com/2885/1573738628-serverless.svg',
            },
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
