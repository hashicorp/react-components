import { render } from '@testing-library/react'
import AlertBanner from './'

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

  describe('with an expiration date set', () => {
    beforeAll(() => {
      // Lock Date.now() with value of Oct. 20, 2020
      const lockedDateNow = new Date('2020-10-20T00:00:00-07:00').valueOf()
      jest.spyOn(Date, 'now').mockImplementation(() => lockedDateNow)
    })

    afterAll(() => {
      Date.now.mockRestore()
    })

    it('should show the banner when the current date has not surpassed the expiration date', () => {
      const expirationDate = '2020-10-30T12:00:00-07:00'
      const { container } = render(<AlertBanner text="text" tag="tag" expirationDate={expirationDate} />)
      expect(container.firstChild).toHaveClass('show')
    })

    it('should NOT show the banner when the current date has surpassed the expiration date', () => {
      const expirationDate = '2020-10-01T12:00:00-07:00'
      const { container } = render(<AlertBanner text="text" tag="tag" expirationDate={expirationDate} />)
      expect(container.firstChild).not.toHaveClass('show')
    })
  })
})
