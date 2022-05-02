import { fireEvent, render, screen } from '@testing-library/react'
import CloseButton from '.'

describe('<CloseButton />', () => {
  it('should render', () => {
    render(<CloseButton onClick={() => {}} ariaLabel="Close video" />)
    const element = screen.getByLabelText('Close video')
    expect(element).toBeInTheDocument()
  })

  it('should handle onClick events', () => {
    const mockOnClick = jest.fn()
    render(<CloseButton onClick={mockOnClick} ariaLabel="Close video" />)
    const element = screen.getByLabelText('Close video')
    fireEvent.click(element)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
