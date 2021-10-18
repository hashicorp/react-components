import { render, screen } from '@testing-library/react'
import TextSplitWithImage from './'

const propsBase = {
  textSplit: {
    className: 'g-text-split',
    heading: 'My WithImage Heading',
    content:
      'Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.\nEtiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.',
    linkStyle: 'links',
    links: [
      {
        text: 'Frequently Asked Questions',
        url: 'https://www.hashicorp.com',
        type: 'anchor',
      },
      {
        text: 'Location Details',
        url: 'https://www.hashicorp.com',
        type: 'outbound',
      },
    ],
  },
  image: {
    url: 'https://www.datocms-assets.com/2885/1508522484-share.jpg',
    alt: 'My special alt text',
  },
}

describe('<TextSplitWithImage />', () => {
  it('should render a `.g-text-split` <div> root element', () => {
    const { container } = render(<TextSplitWithImage {...propsBase} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(propsBase.textSplit.className)
  })

  it('should render the passed image, verifiable by alt text', () => {
    const { image } = propsBase
    render(<TextSplitWithImage {...propsBase} />)
    expect(screen.getByAltText(image.alt)).toBeVisible()
  })

  it('should use the textSplit heading as an alt text fallback', () => {
    const { image, textSplit } = propsBase
    render(
      <TextSplitWithImage
        textSplit={textSplit}
        image={{ alt: '', url: image.url }}
      />
    )
    expect(screen.getByAltText(textSplit.heading)).toBeVisible()
  })

  it('should handle an undefined image prop by throwing an error', () => {
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    const { textSplit } = propsBase
    expect(() => {
      render(<TextSplitWithImage textSplit={textSplit} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })
})
