import { render, screen } from '@testing-library/react'
import TextSplit from './index'

const propsBase = {
  heading: 'Example Heading',
  content:
    'Example content. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
  checkboxes: ['First item', 'A second checkbox', 'Checkbox item number three'],
  links: [
    {
      text: 'Example Link',
      url: 'https://www.hashicorp.com',
      type: 'inbound',
    },
    {
      text: 'Second Link',
      url: 'https://www.hashicorp.com',
      type: 'outbound',
    },
  ],
}

describe('<TextSplit />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-nice-text-split'
    const { container } = render(
      <TextSplit {...propsBase} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should display simple heading and content strings', () => {
    const { heading, content } = propsBase
    render(<TextSplit {...propsBase} />)
    expect(screen.getByText(heading)).toBeVisible()
    expect(screen.getByTestId('heading')).toBeVisible()
    expect(screen.getByText(content)).toBeVisible()
    expect(screen.getByTestId('content')).toBeVisible()
  })

  it('should throw an error when neither a heading or content is supplied', () => {
    const basePropsModified = Object.assign({}, propsBase)
    delete basePropsModified.heading
    delete basePropsModified.content
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(<TextSplit {...basePropsModified} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should throw an error when a link with missing properties is supplied', () => {
    const basePropsModified = Object.assign({}, propsBase)
    delete basePropsModified.links
    const badLinks = [{ url: 'URL but no text' }, { text: 'text But No URL' }]
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    expect(() => {
      render(<TextSplit {...basePropsModified} links={badLinks} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should support a content string with newlines, and render paragraphs', () => {
    const content = 'My first paragraph\nSecond paragraph too'
    render(<TextSplit {...propsBase} content={content} />)
    expect(screen.getByText(content.split('\n')[0])).toBeVisible()
    expect(screen.getByText(content.split('\n')[1])).toBeVisible()
  })

  it('should render checkboxes', () => {
    const testCheckboxes = [
      'First checkbox',
      'Second checkbox',
      'A third test checkbox',
    ]
    render(<TextSplit {...propsBase} checkboxes={testCheckboxes} />)
    testCheckboxes.forEach((itemText) => {
      expect(screen.getByText(itemText)).toBeVisible()
    })
    expect(screen.getByTestId('checkbox-list')).toBeVisible()
  })

  it('should render link items as links', () => {
    const testLinks = [
      { text: 'Link number one', url: '/first' },
      { text: 'Second test link', url: '/second' },
    ]
    render(<TextSplit {...propsBase} links={testLinks} />)
    testLinks.forEach((testLink) => {
      const linkElem = screen.getByText(testLink.text)
      expect(linkElem).toBeVisible()
      expect(linkElem.closest('a').getAttribute('href')).toBe(testLink.url)
    })
    expect(screen.getByTestId('links')).toBeVisible()
  })

  it('should not display an empty heading tag when no heading is passed', () => {
    const basePropsModified = Object.assign({}, propsBase)
    delete basePropsModified.heading
    //  Ensure testId is not rendered when no heading is passed
    render(<TextSplit {...basePropsModified} />)
    expect(screen.queryByTestId('heading')).not.toBeInTheDocument()
  })

  it('should not display an empty content container when no content is passed', () => {
    const basePropsModified = Object.assign({}, propsBase)
    delete basePropsModified.content

    render(<TextSplit {...basePropsModified} />)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('should not display an empty checkboxes container when no checkboxes are passed', () => {
    render(<TextSplit {...propsBase} checkboxes={undefined} />)
    expect(screen.queryByTestId('checkbox-list')).not.toBeInTheDocument()
  })

  it('should not display an empty links container when no links are provided', () => {
    const basePropsModified = Object.assign({}, propsBase)
    delete basePropsModified.links

    render(<TextSplit {...basePropsModified} />)
    expect(screen.queryByTestId('links')).not.toBeInTheDocument()
  })

  it('should allow arbitrary React children to be rendered', () => {
    const customCopy = 'My special component'
    const customAltText = 'Some image alt text'
    render(
      <TextSplit {...propsBase}>
        <p>{customCopy}</p>
        <img alt={customAltText} src="" />
      </TextSplit>
    )
    expect(screen.getByAltText(customAltText)).toBeVisible()
    expect(screen.getByText(customCopy)).toBeVisible()
  })

  it('should correctly render React content', () => {
    const textString = 'This is some React content'
    const content = (
      <p>
        <strong>{textString}</strong>
      </p>
    )
    render(<TextSplit content={content}>Hello</TextSplit>)
    const customElem = screen.getByText(textString)
    expect(customElem).toBeVisible()
    expect(customElem.tagName).toBe('STRONG')
  })
})
