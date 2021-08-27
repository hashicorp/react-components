import { render, screen } from '@testing-library/react'
import slugify from 'slugify'
import Button from './'

describe('<Button />', () => {
  it('should render a className if provided', () => {
    const className = 'my-special-button'
    const { container } = render(
      <Button title="No URL here" className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })

  it('should render a <button/> when no url is passed', () => {
    const { container } = render(<Button title="No URL here" />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('BUTTON')
  })

  it('should render a `.g-btn` <a/> with the correct href when passed a url', () => {
    const url = 'https://www.hashicorp.com'
    const { container } = render(<Button title="Linked Button" url={url} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('A')
    expect(rootElem.getAttribute('href')).toBe(url)
  })

  it('should use the title prop as the button text', () => {
    const title = 'My Button Title'
    render(<Button title={title} />)
    expect(screen.getByText(title)).toBeInTheDocument()
  })

  it('should use the slugified title prop as a data-ga-button attr', () => {
    const title = 'A Really Cool Title!'
    const { container } = render(<Button title={title} />)
    const actual = container.firstChild.getAttribute('data-ga-button')
    const expected = slugify(title, { lower: true })
    expect(actual).toBe(expected)
  })

  it('should use the ga_prefix to set the data-ga-button attribute', () => {
    const title = 'A Really Cool Title!'
    const ga_prefix = 'fooprefix'
    const { container } = render(<Button title={title} ga_prefix={ga_prefix} />)
    const actual = container.firstChild.getAttribute('data-ga-button')
    const expected = `${ga_prefix} | ${slugify(title, { lower: true })}`
    expect(actual).toBe(expected)
  })

  it('should use linkType=outbound to set rel=noopener and target=_blank ', () => {
    const url = 'https://www.hashicorp.com'
    const { container } = render(
      <Button title="My Button" url={url} linkType="outbound" />
    )
    const elem = container.firstChild
    expect(elem.getAttribute('rel')).toBe('noopener')
    expect(elem.getAttribute('target')).toBe('_blank')
  })

  it('should use the external prop to set rel=noopener and target=_blank ', () => {
    const url = 'https://www.hashicorp.com'
    const { container } = render(
      <Button title="My Button" external url={url} />
    )
    const elem = container.firstChild
    expect(elem.getAttribute('rel')).toBe('noopener')
    expect(elem.getAttribute('target')).toBe('_blank')
  })

  it('should accept a string for the external prop', () => {
    const url = 'https://www.hashicorp.com'
    const { container } = render(
      <Button title="My Button" external="true" url={url} />
    )
    const elem = container.firstChild
    expect(elem.getAttribute('rel')).toBe('noopener')
    expect(elem.getAttribute('target')).toBe('_blank')
  })

  it('should merge additional classNames', () => {
    const { container } = render(<Button title="Button" className="foobar" />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('foobar')
  })

  const linkTypes = ['inbound', 'outbound', 'anchor', 'download']
  linkTypes.forEach((linkType) => {
    it(`should render an icon for ${linkType} links`, () => {
      const props = { title: 'Button', linkType, url: '#' }
      render(<Button {...props} />)
      const svgElem = screen.getByRole('presentation')
      expect(svgElem).toBeVisible()
      expect(svgElem.tagName).toBe('svg')
    })
  })

  it('should gracefully handle an incomplete icon prop', () => {
    render(
      <Button title="Button" icon={{ position: 'right', isAnimated: true }} />
    )
    const svgElem = screen.queryByRole('img')
    expect(svgElem).not.toBeInTheDocument()
  })

  it('should render a custom svg icon', () => {
    const customSvg = `<svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 12L14 18M4 12H20H4ZM20 12L14 6L20 12Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    const props = { title: 'Button', icon: { svg: customSvg }, url: '#' }
    render(<Button {...props} />)
    const svgElem = screen.getByRole('img')
    expect(svgElem).toBeVisible()
    expect(svgElem.tagName).toBe('svg')
  })
})
