import { render, screen } from '@testing-library/react'
import TextSplits from './'

const exampleTextSplits = [
  {
    textSplit: {
      heading: 'Example with Logo Grid',
      content:
        'Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    },
    logoGrid: [
      {
        slug: 'microsoft-azure',
        linkUrl: 'https://www.hashicorp.com/integrations/microsoft',
      },
      {
        slug: 'aws',
        linkUrl: 'https://www.hashicorp.com/integrations/aws',
      },
      {
        slug: 'google',
        linkUrl: 'https://www.hashicorp.com/integrations/google-cloud',
      },
      'vmware',
      'alibaba-cloud',
      'oracle',
      'kubernetes',
      'datadog',
      'openstack',
    ],
  },
  {
    textSplit: {
      heading: 'Example with Code Block',
      content:
        'Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
      textSide: 'right',
    },
    codeBlock: {
      options: { showWindowBar: true },
      code: `task <span class="token string">"webservice"</span> <span class="token punctuation">{</span>\n\t<span class="token property">driver</span> <span class="token punctuation">=</span> <span class="token string">"docker"</span>\n  \n\t<span class="token keyword">config</span> <span class="token punctuation">{</span>\n\t\t<span class="token property">image</span> <span class="token punctuation">=</span> <span class="token string">"redis:3.2"</span>\n\t\t<span class="token keyword">labels</span> <span class="token punctuation">{</span>\n\t\t\t<span class="token property">group</span> <span class="token punctuation">=</span> <span class="token string">"webservice-cache"</span>\n\t  <span class="token punctuation">}</span>\n\t<span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n`,
      language: 'hcl',
    },
  },
  {
    textSplit: {
      heading: 'Example with Image',
      content:
        'Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    },
    image: {
      url: 'https://www.datocms-assets.com/2885/1508522484-share.jpg',
      alt: 'My special alt text',
    },
  },
]

describe('<TextSplitWithLogoGrid />', () => {
  it('should render the appropriate TextSplitWith* component for each textSplit entry', () => {
    render(<TextSplits textSplits={exampleTextSplits} />)
    exampleTextSplits.forEach((item) => {
      const { textSplit, codeBlock, image, logoGrid } = item
      expect(screen.getByText(textSplit.heading)).toBeVisible()
      if (codeBlock) {
        const codeTokenElem = screen.getByText('driver')
        expect(codeTokenElem).toBeVisible()
        expect(codeTokenElem.tagName).toBe('SPAN')
        expect(codeTokenElem).toHaveClass('token')
      } else if (image) {
        const imageElem = screen.getByAltText(image.alt)
        expect(imageElem).toBeVisible()
        expect(imageElem.tagName).toBe('IMG')
      } else if (logoGrid) {
        const svgElem = screen.getByTitle('aws').closest('svg')
        expect(svgElem).toBeVisible()
        const linkedItem = svgElem.closest('a')
        expect(linkedItem).toBeVisible()
        expect(linkedItem.href).toBe(
          'https://www.hashicorp.com/integrations/aws'
        )
      } else {
        throw new Error('Broken test, unexpected unrecognized TextSplit.')
      }
    })
  })

  it("should throw an error if a textSplit entry isn't recognized.", () => {
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(
        <TextSplits
          textSplits={[{ textSplit: exampleTextSplits[0].textSplit }]}
        />
      )
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })
})
