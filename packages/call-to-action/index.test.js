import { render, screen } from '@testing-library/react'
import CallToAction from './'

const baseProps = {
  heading: 'Lorem Ipsum Dolor Sit Amet',
  content:
    'Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  links: [
    {
      text: 'First Action',
      url: 'https://www.example.com',
    },
    {
      text: 'Second Action',
      url: 'https://www.example.com',
    },
  ],
}

describe('<CallToAction />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-call-to-action'
    const { container } = render(
      <CallToAction {...baseProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should display simple heading and content strings and links', () => {
    const { heading, content } = baseProps
    render(<CallToAction {...baseProps} />)
    expect(screen.getByText(heading)).toBeVisible()
    expect(screen.getByText(content)).toBeVisible()
    expect(screen.getByTestId('heading')).toBeVisible()
    expect(screen.getByTestId('content')).toBeVisible()
    expect(screen.getByTestId('links')).toBeVisible()
  })

  it('should render links passed to it', () => {
    render(<CallToAction {...baseProps} />)
    baseProps.links.forEach((link) => {
      expect(screen.getByText(link.text)).toBeVisible()
    })
  })

  it('should throw an error when neither a heading or content is supplied', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.heading
    delete basePropsModified.content
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(<CallToAction {...basePropsModified} />)
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
      render(<CallToAction {...basePropsModified} links={urlButNoText} />)
    }).toThrowError()
    const textButNoUrl = [{ text: 'text But No URL' }]
    expect(() => {
      render(<CallToAction {...basePropsModified} links={textButNoUrl} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should not display an empty heading tag when no heading is passed', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.heading

    render(<CallToAction {...basePropsModified} />)
    expect(screen.queryByTestId('heading')).not.toBeInTheDocument()
  })

  it('should not display an empty content container when no content is passed', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.content

    render(<CallToAction {...basePropsModified} />)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('should not display an empty links container with not links provided', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.links

    const { queryByTestId } = render(<CallToAction {...basePropsModified} />)
    expect(queryByTestId('links')).not.toBeInTheDocument()
  })
})
