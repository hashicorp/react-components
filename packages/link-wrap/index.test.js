import { render, screen } from '@testing-library/react'
import LinkWrap, { isAbsoluteURL } from './index'

describe('<LinkWrap />', () => {
  it('should render correctly with a Link element', () => {
    const mockLinkProps = {
      href: 'test-href',
      as: 'test-as',
      replace: 'test-replace',
      scroll: 'test-scroll',
      shallow: 'test-shallow',
      passHref: 'test-passHref',
    }

    render(
      <LinkWrap
        Link={Link}
        {...mockLinkProps}
        className="wow"
        data-test="works"
      >
        child
      </LinkWrap>
    )

    const linkElement = screen.getByTestId('wrapper')
    Object.entries(mockLinkProps).map(([k, v]) =>
      expect(linkElement).toHaveAttribute(`data-${k}`, v)
    )
    expect(linkElement).not.toHaveAttribute('href')
    expect(linkElement).not.toHaveAttribute('class')

    const aElement = screen.getByTestId('a')
    expect(aElement).toHaveAttribute('data-test', 'works')
    expect(aElement).toHaveAttribute('class', 'wow')
    expect(aElement).toContainHTML('child')
  })

  it('should render correctly without a Link element', () => {
    render(
      <LinkWrap href="/foo/bar" className="wow" data-test="works">
        child
      </LinkWrap>
    )

    const aElement = screen.getByTestId('a-raw')

    expect(aElement).toContainHTML('child')
    expect(aElement).toHaveAttribute('href', '/foo/bar')
    expect(aElement).toHaveAttribute('data-test', 'works')
    expect(aElement).toHaveAttribute('class', 'wow')
  })

  it('should not render a link wrapper if given an absolute URL', () => {
    render(
      <LinkWrap href="https://google.com/" Link={Link}>
        child
      </LinkWrap>
    )

    expect(screen.getByTestId('a-raw')).toBeInTheDocument()
  })
})

describe('isAbsoluteURL', () => {
  it('should correctly identify absolute URLs', () => {
    expect(isAbsoluteURL('http://hashicorp.com')).toBe(true)
    expect(isAbsoluteURL('https://hashicorp.com')).toBe(true)
    expect(isAbsoluteURL('httpS://hashicorp.com')).toBe(true)
    expect(isAbsoluteURL('file://hashicorp.com')).toBe(true)
    expect(isAbsoluteURL('mailto:someone@example.com')).toBe(true)
    expect(
      isAbsoluteURL('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
    ).toBe(true)
  })

  it('should correctly identify non-absolute URLs', () => {
    expect(isAbsoluteURL('//hashicorp.com')).toBe(false)
    expect(isAbsoluteURL('/foo/bar')).toBe(false)
    expect(isAbsoluteURL('foo/bar')).toBe(false)
    expect(isAbsoluteURL('foo')).toBe(false)
    expect(isAbsoluteURL('ht,tp://hashicorp.com')).toBe(false)
  })
})

function Link({ href, as, replace, scroll, shallow, passHref, children }) {
  return (
    <span
      data-href={href}
      data-as={as}
      data-replace={replace}
      data-scroll={scroll}
      data-shallow={shallow}
      data-passhref={passHref}
      data-testid="wrapper"
    >
      {children}
    </span>
  )
}
