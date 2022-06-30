import { render, screen } from '@testing-library/react'
import TierCard from '.'

describe('<TierCard />', () => {
  it('should render', () => {
    render(<TierCard />)
    expect(screen.getByText('Company, Role')).toBeInTheDocument()
  })
})
