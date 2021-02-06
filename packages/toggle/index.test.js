import Toggle from './'
import { render, screen, fireEvent } from '@testing-library/react'

test('when the enabled prop is not set, its not enabled', () => {
  render(<Toggle />)
  expect(screen.getByTestId('react-toggle')).not.toBeChecked()
})

test('when the enabled prop is set to true, its enabled', () => {
  render(<Toggle enabled />)
  expect(screen.getByTestId('react-toggle')).toBeChecked()
})

test('when the enabled prop changes after render, it is reflected', () => {
  const { rerender } = render(<Toggle />)
  expect(screen.getByTestId('react-toggle')).not.toBeChecked()
  rerender(<Toggle enabled />)
  expect(screen.getByTestId('react-toggle')).toBeChecked()
})

test('when the enabled prop changes, it should fire onChange', () => {
  const onChange = jest.fn()
  const { rerender } = render(<Toggle onChange={onChange} />)
  rerender(<Toggle enabled onChange={onChange} />)
  expect(onChange).toHaveBeenCalled()
})

test('when the enabled prop changes, it should not fire onChange if it is the same as the current state', () => {
  const onChange = jest.fn()
  const { rerender } = render(<Toggle onChange={onChange} />)
  const toggle = screen.getByTestId('react-toggle')
  fireEvent.click(toggle)
  rerender(<Toggle enabled onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(1)
})

test('when the enabled prop changes, it should fire onChange if it is different from the current state', () => {
  const onChange = jest.fn()
  const { rerender } = render(<Toggle onChange={onChange} />)
  const toggle = screen.getByTestId('react-toggle')
  fireEvent.click(toggle)
  rerender(<Toggle enabled={false} onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(2)
})

test('when clicked, the enabled status switches', () => {
  render(<Toggle />)
  const toggle = screen.getByTestId('react-toggle')
  expect(toggle).not.toBeChecked()
  fireEvent.click(toggle)
  expect(toggle).toBeChecked()
})

test('when clicked, onChange is called once with the new value', () => {
  const onChange = jest.fn()
  render(<Toggle onChange={onChange} />)
  const toggle = screen.getByTestId('react-toggle')
  fireEvent.click(toggle)
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(true)
})
