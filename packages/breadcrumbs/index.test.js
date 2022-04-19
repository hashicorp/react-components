import { render, screen } from '@testing-library/react'
import Breadcrumbs from '.'

describe('<Breadcrumbs />', () => {
  it('should render breadcrumbs', () => {
    render(<Breadcrumbs />)
    const element = screen.getByTestId('breadcrumbs')
    expect(element).toBeInTheDocument()
  })
})
