import { render, screen } from '@testing-library/react'
import Aside from '.'

describe('<Aside />', () => {
  it('should pass a provided className to the root element', () => {
    const className = 'my-special-aside-class'
    const { container } = render(
      <Aside className={className}>Here&apos;s some content</Aside>
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })

  it('should render the provided React children', () => {
    const linkText = 'Special Link Text'
    const linkUrl = 'https://www.example.com'
    render(
      <Aside>
        <a href={linkUrl}>{linkText}</a>
      </Aside>
    )
    const linkElement = screen.getByText(linkText)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', linkUrl)
  })
})
