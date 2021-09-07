import { render } from '@testing-library/react'
import StatusBar from './status-bar'

describe('<StatusBar />', () => {
  test('should add the dark class when needed', () => {
    const darkElem = render(<StatusBar dark={true} />).container.firstChild
    expect(darkElem).toHaveClass('dark')

    const lightElem = render(<StatusBar dark={false} />).container.firstChild
    expect(lightElem).not.toHaveClass('dark')
  })

  test('should add the active class when needed', () => {
    const active = render(<StatusBar active={true} timing={1} />).container
      .firstChild

    expect(active.querySelector('span')).toHaveClass('active')
    expect(active.querySelector('span')).toHaveAttribute(
      'style',
      'animation-duration: 1s;'
    )

    const inactive = render(<StatusBar active={false} timing={1} />).container
      .firstChild

    expect(inactive.querySelector('span')).not.toHaveClass('active')
    expect(inactive.querySelector('span')).toHaveAttribute(
      'style',
      'animation-duration: 0s;'
    )
  })
})
