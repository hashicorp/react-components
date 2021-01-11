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

test('when the enabled prop changes, it should not fire onChange', () => {
  const onChange = jest.fn()
  const { rerender } = render(<Toggle onChange={onChange} />)
  rerender(<Toggle enabled />)
  expect(onChange).not.toHaveBeenCalled()
})

test('when clicked, the enabled status switches', () => {
  render(<Toggle />)
  const toggle = screen.getByTestId('react-toggle')
  expect(toggle).not.toHaveClass('on')
  fireEvent.click(toggle)
  expect(toggle).toHaveClass('on')
})

test('when clicked, onChange is called once with the new value', () => {
  const onChange = jest.fn()
  render(<Toggle onChange={onChange} />)
  const toggle = screen.getByTestId('react-toggle')
  fireEvent.click(toggle)
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(true)
})
