import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VersionSelect from './index'

const VERSIONS = [
  { name: 'main', label: 'main' },
  { name: 'v0.5.1', label: 'v0.5.1' },
  { name: 'v0.4.0', label: 'v0.4.0' },
]

const defaultProps = {
  versions: VERSIONS,
}

const mockPush = jest.fn()

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: mockPush,
    }
  },
}))

describe('<VersionSelect />', () => {
  let renderResult: RenderResult
  beforeEach(() => {
    renderResult = render(<VersionSelect {...defaultProps} />)
    jest.clearAllMocks()
  })

  it('should render a combobox', () => {
    const { getByRole } = renderResult
    const combobox = getByRole('combobox')

    expect(combobox).toBeInTheDocument()
  })

  it('should render options', () => {
    const { getByRole, getAllByRole } = renderResult

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    expect(options).toHaveLength(VERSIONS.length)
  })

  it('should navigate to the selected version', () => {
    const { getByRole, getAllByRole } = renderResult
    const index = 1

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, `/${VERSIONS[index].name}`)
  })
})
