import { render, screen } from '@testing-library/react'
import propsDefault from './fixtures/default.json'
import CalloutItem from './index.js'

describe('<CalloutItem />', () => {
  it('should render an icon when an SVG is given', () => {
    const testSvgTitle = 'A short title of the string SVG'
    render(
      <CalloutItem
        {...propsDefault}
        icon={`<svg><title>${testSvgTitle}</title></svg>`}
      />
    )
    const expectedSvg = screen.getByTitle(testSvgTitle).parentNode
    expect(expectedSvg).toBeVisible()
    expect(expectedSvg.tagName.toLowerCase()).toBe('svg')
  })

  it('should render an icon when a render prop is given', () => {
    const testSvgTitle = 'A short title of the renderProp SVG'
    render(
      <CalloutItem
        {...propsDefault}
        icon={() => (
          <svg>
            <title>{testSvgTitle}</title>
          </svg>
        )}
      />
    )
    const expectedSvg = screen.getByTitle(testSvgTitle).parentNode
    expect(screen.getByTestId('icon')).toBeVisible()
    expect(expectedSvg).toBeVisible()
    expect(expectedSvg.tagName.toLowerCase()).toBe('svg')
  })

  it('should render an icon when the icon prop is passed in', () => {
    const testIcon = '<svg><title>Blank svg for test purposes</title></svg>'
    render(<CalloutItem {...propsDefault} icon={testIcon} />)
    expect(screen.getByTestId('icon')).toBeVisible()
  })

  it('should not render an icon container when no icon is provided', () => {
    render(<CalloutItem {...propsDefault} icon={undefined} />)
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
  })

  it('should render a heading when a string is given', () => {
    const heading = 'My test heading'
    render(<CalloutItem {...propsDefault} heading={heading} />)
    expect(screen.getByTestId('heading')).toBeVisible()
    expect(screen.getByText(propsDefault.heading)).toBeVisible()
  })

  it('should not render a heading container when none is provided', () => {
    render(<CalloutItem {...propsDefault} heading={undefined} />)
    expect(screen.queryByTestId('heading')).not.toBeInTheDocument()
  })

  it('should render content when a string is given', () => {
    const testContent = 'This is some test string content'
    render(<CalloutItem {...propsDefault} content={testContent} />)
    expect(screen.getByText(testContent)).toBeVisible()
  })

  it('should render content when a render prop is given', () => {
    const testContentText = 'This is some test render prop content'
    const testContentFn = () => <span>{testContentText}</span>
    render(<CalloutItem {...propsDefault} content={testContentFn} />)
    expect(screen.getByText(testContentText)).toBeVisible()
    expect(screen.getByText(testContentText).tagName.toLowerCase()).toBe('span')
  })

  it('should render content when a string is given', () => {
    render(<CalloutItem {...propsDefault} content="test content" />)
    expect(screen.getByText('test content')).toBeVisible()
    expect(screen.queryByTestId('content')).toBeVisible()
  })

  it('should not render content when none is provided', () => {
    render(<CalloutItem {...propsDefault} content={undefined} />)
    expect(screen.queryByTestId('content')).not.toBeInTheDocument()
  })

  it('should render a link when one is given', () => {
    const testLink = { text: 'My link text', url: '/my-test-example' }
    render(<CalloutItem {...propsDefault} link={testLink} />)
    const linkElem = screen.getByText(testLink.text)
    expect(screen.getByTestId('links')).toBeVisible()
    expect(linkElem).toBeVisible()
    expect(linkElem.parentNode.getAttribute('href')).toBe(testLink.url)
  })

  //  TODO - we may want to handle this test in Button, not here
  it('should throw an error when a button with missing properties is supplied', () => {
    //  Suppress console.error for this test, we expect an error
    jest.spyOn(console, 'error')
    global.console.error.mockImplementation(() => {})
    const urlButNoText = { url: 'URL but no text' }
    expect(() => {
      render(<CalloutItem {...propsDefault} link={urlButNoText} />)
    }).toThrowError()
    const textButNoUrl = { text: 'text But No URL' }
    expect(() => {
      render(<CalloutItem {...propsDefault} link={textButNoUrl} />)
    }).toThrowError()
    //  Restore console.error for further tests
    global.console.error.mockRestore()
  })

  it('should not display an empty container if no link is provided', () => {
    render(<CalloutItem {...propsDefault} link={undefined} />)
    expect(screen.queryByTestId('links')).not.toBeInTheDocument()
  })
})
