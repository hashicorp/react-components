import { render, screen } from '@testing-library/react'
import { UtmParamsProvider } from '.'

describe('<UtmParamsProvider />', () => {
  it('should render with children', () => {
    const children = 'Hello world'
    render(<UtmParamsProvider>{children}</UtmParamsProvider>)
    const childEl = screen.getByText(children)
    expect(childEl).toBeInTheDocument()
  })
})
