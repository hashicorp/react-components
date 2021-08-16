import { render, screen, fireEvent } from '@testing-library/react'
import ConsentBanner from './banner'

test('should display the correct privacy policy url', () => {
  const testValue = 'test'
  render(<ConsentBanner privacyPolicyLink={testValue} />)
  expect(screen.getByTestId('privacy-policy')).toHaveAttribute(
    'href',
    testValue
  )
})

test('should display the correct cookie policy url', () => {
  const testValue = 'test'
  render(<ConsentBanner cookiePolicyLink={testValue} />)
  expect(screen.getByTestId('cookie-policy')).toHaveAttribute('href', testValue)
})

test('should run the onManagePreferences function when the correct button is clicked', () => {
  const mock = jest.fn()
  render(<ConsentBanner onManagePreferences={mock} />)
  fireEvent.click(screen.getByTestId('manage-preferences'))
  expect(mock).toHaveBeenCalled()
})

test('should run the onAccept function when the correct button is clicked', () => {
  const mock = jest.fn()
  render(<ConsentBanner onAccept={mock} />)
  fireEvent.click(screen.getByTestId('accept'))
  expect(mock).toHaveBeenCalled()
})
