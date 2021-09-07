import { render, screen } from '@testing-library/react'
import ContentCta from './'

const baseProps = {
  product: 'terraform',
  heading: 'Lorem Ipsum Dolor Sit Amet',
  content:
    'Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  links: [
    {
      title: 'First Action',
      url: 'https://www.example.com',
    },
    {
      title: 'Second Action',
      url: 'https://www.example.com',
    },
  ],
}

describe('<ContentCta />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-content-cta'
    const { container } = render(
      <ContentCta {...baseProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should display simple heading and content strings and links', () => {
    const { heading, content } = baseProps
    render(<ContentCta {...baseProps} />)
    expect(screen.getByText(heading)).toBeVisible()
    expect(screen.getByText(content)).toBeVisible()
    expect(screen.getByTestId('heading')).toBeVisible()
    expect(screen.getByTestId('content')).toBeVisible()
    expect(screen.getByTestId('links')).toBeVisible()
  })

  it('should render links passed to it', () => {
    render(<ContentCta {...baseProps} />)
    baseProps.links.forEach((link) => {
      expect(screen.getByText(link.title)).toBeVisible()
    })
  })

  it('should throw an error if heading, content, or product is not supplied', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.heading
    delete basePropsModified.content
    delete basePropsModified.product
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(<ContentCta {...basePropsModified} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should throw an error when a link with missing properties is supplied', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.links
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    const urlButNoText = [{ url: 'URL but no text' }]
    expect(() => {
      render(<ContentCta {...basePropsModified} links={urlButNoText} />)
    }).toThrowError()
    const textButNoUrl = [{ title: 'title But No URL' }]
    expect(() => {
      render(<ContentCta {...basePropsModified} links={textButNoUrl} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })
})
