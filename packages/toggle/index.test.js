import Toggle from './'
import { render, screen, fireEvent } from '@testing-library/react'

test('when the enabled prop is not set, its not enabled', () => {
  render(<Toggle />)
  expect(screen.getByTestId('react-toggle')).not.toHaveClass('on')
})

test('when the enabled prop is set to true, its enabled', () => {
  render(<Toggle enabled />)
  expect(screen.getByTestId('react-toggle')).toHaveClass('on')
})

test('when the enabled prop changes after render, it is reflected', () => {
  const { rerender } = render(<Toggle />)
  expect(screen.getByTestId('react-toggle')).not.toHaveClass('on')
  rerender(<Toggle enabled />)
  expect(screen.getByTestId('react-toggle')).toHaveClass('on')
})

test('when clicked, the enabled status switches', () => {
  render(<Toggle />)
  const toggle = screen.getByTestId('react-toggle')
  expect(toggle).not.toHaveClass('on')
  fireEvent.click(toggle)
  expect(toggle).toHaveClass('on')
})
