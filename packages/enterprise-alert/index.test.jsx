import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import EnterpriseAlert from './index.jsx'

describe('<EnterpriseAlert />', () => {
  test('renders correctly', () => {
    const { container } = render(<EnterpriseAlert product="consul" />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('g-enterprise-alert')
    expect(rootElem).toHaveClass(`consul`)
    expect(rootElem).not.toHaveClass(`inline`)
    expect(rootElem.querySelector('a')).toHaveAttribute('href', `https://www.hashicorp.com/products/consul`)
    expect(rootElem.querySelector('strong')).toHaveTextContent(`Consul Enterprise`)
  })

	test('renders with { product: "nomad", inline: true } options', () => {
    const { container } = render(<EnterpriseAlert product="nomad" inline={true} />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('g-enterprise-alert')
    expect(rootElem).toHaveClass(`nomad`)
    expect(rootElem).toHaveClass(`inline`)
    expect(rootElem.querySelector('a')).toBe(null)
    expect(rootElem.querySelector('strong')).toBe(null)
  })

	test('renders with { product: "consul", content: "Hello, World!" } options', () => {
    const { container } = render(<EnterpriseAlert product="consul" content="Hello, World!" />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('g-enterprise-alert')
    expect(rootElem).toHaveClass(`consul`)
    expect(rootElem).not.toHaveClass(`inline`)
    expect(rootElem.querySelector('p')).toHaveTextContent(`Hello, World!`)
  })
})
