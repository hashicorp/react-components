import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AlertBanner from './index.jsx'

describe('<AlertBanner />', () => {
  it('should render a <AlertBanner />', () => {
    const { container } = render(<AlertBanner text="text" tag="tag" />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-alert-banner')
  })

  it('should render the right tag string', () => {
    const { container } = render(<AlertBanner text="text" tag="tag" />)
    expect(container.querySelector('.tag').textContent).toBe('tag')
  })

  it('should render the right link string', () => {
    const { container } = render(
      <AlertBanner text="text" tag="tag" linkText="https://hashicorp.com/" />
    )
    expect(container.querySelector('.link-text').textContent).toBe(
      'https://hashicorp.com/'
    )
  })

  it('should close when clicking on close', () => {
    let didClose = false
    class AlertBannerText extends AlertBanner {
      onClose() {
        didClose = true
      }
    }
    const { container } = render(
      <AlertBannerText
        text="text"
        tag="tag"
        linkText="https://hashicorp.com/"
      />
    )
    container.querySelector('.close').click()
    expect(didClose).toBe(true)
  })
})
