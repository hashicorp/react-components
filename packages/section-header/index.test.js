import { render, screen } from '@testing-library/react'
import SectionHeader from './'

test('renders headline and description, including HTML for description', () => {
  render(
    <SectionHeader
      headline="Headline with plain text"
      description="Description <strong>with html</strong>"
    />
  )
  expect(screen.getByTestId('h2')).toHaveTextContent('Headline with plain text')
  expect(screen.getByTestId('description')).toHaveTextContent(
    'Description with html'
  )
})

test('renders an h1 when `useH1` prop is true', () => {
  render(<SectionHeader headline="Headline with plain text" useH1={true} />)
  expect(screen.getByTestId('h1')).toHaveTextContent('Headline with plain text')
})
