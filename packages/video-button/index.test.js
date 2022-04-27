import { render, screen, fireEvent } from '@testing-library/react'
import VideoButton from '.'

describe('<VideoButton />', () => {
  it('should render defaults', () => {
    render(<VideoButton>Play video</VideoButton>)
    const buttonElement = screen.getByTestId('video-button')
    expect(buttonElement).toBeInTheDocument()
    // Visually hidden text is in the document
    expect(screen.queryByText('Play video')).toBeInTheDocument()
    // Theme
    expect(buttonElement).toHaveClass('white')
    // Size
    expect(buttonElement).toHaveClass('medium')
    // Radius
    expect(buttonElement).toHaveClass('full')
  })

  it('should render themed variant', () => {
    render(<VideoButton theme="action">Play video</VideoButton>)
    const buttonElement = screen.getByTestId('video-button')
    expect(buttonElement).toHaveClass('action')
    expect(buttonElement).not.toHaveClass('white')
  })

  it('should render size variant', () => {
    render(<VideoButton size="large">Play video</VideoButton>)
    const buttonElement = screen.getByTestId('video-button')
    expect(buttonElement).toHaveClass('large')
    expect(buttonElement).not.toHaveClass('medium')
  })

  it('should render radii variant', () => {
    render(<VideoButton radius="rounded">Play video</VideoButton>)
    const buttonElement = screen.getByTestId('video-button')
    expect(buttonElement).toHaveClass('rounded')
    expect(buttonElement).not.toHaveClass('full')
  })

  it('should call onClick handler', () => {
    const mockOnClick = jest.fn()
    render(<VideoButton onClick={mockOnClick}>Play video</VideoButton>)
    const buttonElement = screen.getByTestId('video-button')
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
