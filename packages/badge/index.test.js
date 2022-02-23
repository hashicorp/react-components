import { render, screen } from '@testing-library/react'
import Badge from '.'

describe('<Badge />', () => {
  it('should render the provided React children', () => {
    const badgeText = 'New'
    render(<Badge>{badgeText}</Badge>)
    const badgeElement = screen.getByText(badgeText)
    expect(badgeElement).toBeInTheDocument()
  })
})
