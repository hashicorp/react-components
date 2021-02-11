import { render } from '@testing-library/react'
import CommandLineTerminal from './'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<CommandLineTerminal />', () => {
  it('supports rendering a title', () => {
    const { getByText } = render(
      <CommandLineTerminal {...defaultProps} title="Test Title" />
    )
    expect(getByText('Test Title')).toBeInTheDocument()
  })

  it('renders theme class if provided', () => {
    const { getByTestId } = render(
      <CommandLineTerminal {...defaultProps} product="boundary" />
    )

    expect(getByTestId('terminal-root')).toHaveClass('boundary')
  })

  it('renders code lines', () => {
    const { getByText } = render(
      <CommandLineTerminal
        {...defaultProps}
        lines={[{ code: 'Line 1' }, { code: 'Line 2' }]}
      />
    )
    expect(getByText('Line 1')).toBeInTheDocument()
    expect(getByText('Line 2')).toBeInTheDocument()
  })
})
