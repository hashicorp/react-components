import { render, screen } from '@testing-library/react'
import Content from './'

test('renders content accurately', () => {
  render(<Content content={<p data-testid="test">test</p>} />)
  expect(screen.getByTestId('test')).toHaveTextContent('test')
})

test('renders a product class if one is passed', () => {
  const { container } = render(<Content product="terraform" />)

  expect(container.firstChild).toHaveClass('terraform')
})
