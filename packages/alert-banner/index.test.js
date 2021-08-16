import { fireEvent, render, screen } from '@testing-library/react'
import cookie from 'js-cookie'
import slugify from 'slugify'
import AlertBanner from './'

/**
 * @TODO If we configured Jest to load CSS, we could convert some of these
 * tests to use jest-dom's .toBeVisible() assertions in a meaningful way,
 * eg by using getByText and asserting visibility rather than using a test attr.
 * jest-dom .toBeVisible: https://github.com/testing-library/jest-dom#tobevisible
 * Asana task: https://app.asana.com/0/1100423001970639/1200616367938010/f
 */

describe('<AlertBanner />', () => {
  it('should render a link that contains the tag, text, and linkText', () => {
    const tag = 'Newish'
    const text = 'This is a cool banner'
    const linkText = 'Check it out'
    const url = 'https://hashicorp.com/my-link'
    render(<AlertBanner tag={tag} text={text} linkText={linkText} url={url} />)
    const textElem = screen.getByText(text)
    const linkElem = textElem.closest('a')
    expect(linkElem).toBeInTheDocument()
    expect(linkElem.textContent).toBe(`${tag} ${text} ${linkText}`)
    expect(linkElem.href).toBe(url)
  })

  it('should allow closing the banner, and set a cookie to remember', () => {
    const tag = 'Newish'
    const text = 'This is a cool banner'
    const linkText = 'Check it out'
    const { container } = render(
      <AlertBanner tag={tag} text={text} linkText={linkText} />
    )
    const rootElem = container.firstChild
    const closeButton = screen.getByText('Dismiss alert')
    expect(rootElem).toHaveClass('isShown')
    fireEvent.click(closeButton)
    expect(rootElem).not.toHaveClass('isShown')

    const dismissalCookieId = `banner_${slugify(text, { lower: true })}`
    expect(cookie.get(dismissalCookieId)).toBe('1')
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

    it('should show the banner before the expiration date', () => {
      const expirationDate = '2020-10-30T12:00:00-07:00'
      const { container } = render(
        <AlertBanner text="text" tag="tag" expirationDate={expirationDate} />
      )
      const rootElem = container.firstChild
      expect(rootElem).toHaveClass('isShown')
    })

    it('should hide the banner after the expiration date', () => {
      const expirationDate = '2020-10-01T12:00:00-07:00'
      const { container } = render(
        <AlertBanner text="text" tag="tag" expirationDate={expirationDate} />
      )
      const rootElem = container.firstChild
      expect(rootElem).not.toHaveClass('isShown')
    })
  })
})
