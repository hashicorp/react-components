import { render } from '@testing-library/react'
import EnterpriseAlert from './'

describe('<EnterpriseAlert />', () => {
  test('passes a provided className to the root element', () => {
    const className = 'my-enterprise-alert'
    const { container } = render(<EnterpriseAlert className={className} />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(className)
  })

  test('renders product theming and messaging as expected ', () => {
    const { container } = render(<EnterpriseAlert product="consul" />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(`consul`)
    expect(rootElem).not.toHaveClass(`inline`)
    expect(rootElem.querySelector('a')).toHaveAttribute(
      'href',
      `https://www.hashicorp.com/products/consul`
    )
    expect(rootElem.querySelector('strong')).toHaveTextContent(
      `Consul Enterprise`
    )
  })

  test('renders with { product: "nomad", inline: true } options', () => {
    const { container } = render(
      <EnterpriseAlert product="nomad" inline={true} />
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(`nomad`)
    expect(rootElem).toHaveClass(`inline`)
    expect(rootElem.querySelector('a')).toBe(null)
    expect(rootElem.querySelector('strong')).toBe(null)
  })

  test('renders with { product: "consul", content: "Hello, World!" } options', () => {
    const { container } = render(
      <EnterpriseAlert product="consul">Hello, World!</EnterpriseAlert>
    )
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass(`consul`)
    expect(rootElem).not.toHaveClass(`inline`)
    expect(rootElem.querySelector('p')).toHaveTextContent(`Hello, World!`)
  })
})
