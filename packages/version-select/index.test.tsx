import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VersionSelect from './index'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

jest.mock('next/router')

const useRouterMock = mocked(useRouter)
const mockPush = jest.fn()

const VERSIONS = [
  { name: 'latest', label: 'latest' },
  { name: 'v0.5.1', label: 'v0.5.1' },
  { name: 'v0.4.0', label: 'v0.4.0' },
]

const defaultProps = {
  versions: VERSIONS,
}

describe('<VersionSelect />', () => {
  const routerMock = ({
    route: '/docs/[[...page]]',
    pathname: '/docs/[[...page]]',
    asPath: '/docs',
    push: mockPush,
  } as unknown) as Router

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => routerMock)
  })

  it('should render a combobox', () => {
    const { getByRole } = render(<VersionSelect {...defaultProps} />)
    const combobox = getByRole('combobox')

    expect(combobox).toBeInTheDocument()
  })

  it('should render options', () => {
    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} />
    )

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    expect(options).toHaveLength(VERSIONS.length)
  })

  it('should display the latest version', () => {
    const { getByRole } = render(<VersionSelect {...defaultProps} />)

    const button = getByRole('button')
    expect(button).toHaveTextContent('latest')
  })

  it('should display version from the URL', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        asPath: '/docs/v0.5.1/some/nested/article',
        push: mockPush,
      } as unknown) as Router
    })
    const { getByRole } = render(<VersionSelect {...defaultProps} />)

    const button = getByRole('button')
    expect(button).toHaveTextContent('v0.5.1')
  })

  it('should navigate to a selected version', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/commands/[[...page]]',
        pathname: '/commands/[[...page]]',
        asPath: '/commands',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} />
    )
    const index = 1

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/commands/v0.5.1')
  })

  it('should navigate to the latest version', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/commands/[[...page]]',
        pathname: '/commands/[[...page]]',
        asPath: '/commands/v0.5.1',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} />
    )
    const index = 0

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/commands')
  })

  it('should navigate to a selected version while retaining the sub path', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        query: {
          page: ['some', 'nested', 'article'],
        },
        asPath: '/docs/some/nested/article',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} />
    )
    const index = 2

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(
      1,
      '/docs/v0.4.0/some/nested/article'
    )
  })

  it('should navigate to the latest version while retaining the sub path', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        query: {
          page: ['v0.4.0', 'some', 'nested', 'article'],
        },
        asPath: '/docs/v0.4.0/some/nested/article',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} />
    )
    const index = 0

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/docs/some/nested/article')
  })
})
