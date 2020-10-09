import { render, screen } from '@testing-library/react'
import SectionHeader from './'

test('renders headline and description, including markdown', () => {
  render(
    <SectionHeader
      headline="Headline **with markdown**"
      description="Description **with markdown**"
    />
  )
  expect(screen.getByTestId('h2')).toHaveTextContent('Headline with markdown')
  expect(screen.getByTestId('description')).toHaveTextContent(
    'Description with markdown'
  )
})

test('renders an h1 when `useH1` prop is true', () => {
  render(<SectionHeader headline="Headline **with markdown**" useH1={true} />)
  expect(screen.getByTestId('h1')).toHaveTextContent('Headline with markdown')
})
