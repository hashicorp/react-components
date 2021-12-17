import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VersionSelect from './index'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

jest.mock('next/router')

const useRouterMock = mocked(useRouter)
const mockPush = jest.fn()

const VERSIONS = [
  { name: 'latest', label: 'v0.5.x (latest)' },
  { name: 'v0.4.x', label: 'v0.4.x' },
  { name: 'v0.3.x', label: 'v0.3.x' },
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
    const { getByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const combobox = getByRole('combobox')

    expect(combobox).toBeInTheDocument()
  })

  it('should render options', () => {
    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    expect(options).toHaveLength(VERSIONS.length)
  })

  it('should display the correct version from the URL', () => {
    // initial, latest
    useRouterMock.mockImplementation(() => {
      return ({
        asPath: '/commands',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, rerender } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    expect(getByRole('button')).toHaveTextContent('v0.5.x (latest)')

    // simulate navigation to v0.4.x
    useRouterMock.mockImplementation(() => {
      return ({
        asPath: '/commands/v0.4.x',
        push: mockPush,
      } as unknown) as Router
    })

    rerender(<VersionSelect {...defaultProps} basePath={'docs'} />)
    expect(getByRole('button')).toHaveTextContent('v0.4.x')

    // simulate browser-back to latest
    useRouterMock.mockImplementation(() => {
      return ({
        asPath: '/commands/',
        push: mockPush,
      } as unknown) as Router
    })

    rerender(<VersionSelect {...defaultProps} basePath={'docs'} />)
    expect(getByRole('button')).toHaveTextContent('v0.5.x (latest)')
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
      <VersionSelect {...defaultProps} basePath={'commands'} />
    )
    const index = 1

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/commands/v0.4.x')
  })

  it('should navigate to the latest version', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/commands/[[...page]]',
        pathname: '/commands/[[...page]]',
        asPath: '/commands/v0.4.x',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = 0

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/commands')
  })

  it('should navigate from a version to another version', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/commands/[[...page]]',
        pathname: '/commands/[[...page]]',
        asPath: '/commands/v0.4.x',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'commands'} />
    )
    const index = 2

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/commands/v0.3.x')
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
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = 2

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(
      1,
      '/docs/v0.3.x/some/nested/article'
    )
  })

  it('should navigate to the latest version while retaining the sub path', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        query: {
          page: ['v0.4.x', 'some', 'nested', 'article'],
        },
        asPath: '/docs/v0.4.x/some/nested/article',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = 0

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(1, '/docs/some/nested/article')
  })

  it('should navigate from a version to another version while retaining the sub path', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        query: {
          page: ['v0.4.x', 'some', 'nested', 'article'],
        },
        asPath: '/docs/v0.4.x/some/nested/article',
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = 2

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).toHaveBeenNthCalledWith(
      1,
      '/docs/v0.3.x/some/nested/article'
    )
  })

  it('should noop if selecting latest, while on latest', () => {
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
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = 0

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should noop if selecting a version, while on the same version', () => {
    const currentVersion = 'v0.4.x'

    useRouterMock.mockImplementation(() => {
      return ({
        route: '/docs/[[...page]]',
        pathname: '/docs/[[...page]]',
        query: {
          page: ['some', 'nested', 'article'],
        },
        asPath: `/docs/${currentVersion}/some/nested/article`,
        push: mockPush,
      } as unknown) as Router
    })

    const { getByRole, getAllByRole } = render(
      <VersionSelect {...defaultProps} basePath={'docs'} />
    )
    const index = VERSIONS.findIndex((v) => v.name === currentVersion)

    const combobox = getByRole('combobox')
    userEvent.click(combobox)

    const options = getAllByRole('option')
    userEvent.click(options[index])

    expect(mockPush).not.toHaveBeenCalled()
  })
})
