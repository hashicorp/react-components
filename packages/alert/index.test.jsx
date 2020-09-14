import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Alert from './index.jsx'

const defaultProps = {
	url: `#`,
	tag: `New`,
	tagColor: `vault-gray`,
	text: `Tortor Tellus Inceptos Parturient`,
	textColor: `dark`
}

describe('<Alert />', () => {
  test('renders correctly', () => {
    const { container } = render(<Alert {...defaultProps} />)
    const rootElem = container.firstChild
    expect(rootElem).toHaveClass('g-alert')
    expect(rootElem).toHaveClass(defaultProps.tagColor)
    expect(rootElem).toHaveClass(defaultProps.textColor)
    expect(rootElem).toHaveAttribute('href', defaultProps.url)
    expect(screen.getByTestId('tag')).toHaveTextContent(defaultProps.tag)
    expect(screen.getByTestId('text')).toHaveTextContent(defaultProps.text)
  })
})
