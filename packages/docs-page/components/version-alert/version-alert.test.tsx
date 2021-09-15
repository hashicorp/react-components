import React from 'react'
import { render } from '@testing-library/react'
import VersionAlert from './index'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

const useRouterMock = mocked(useRouter)

jest.mock('next/router')

describe('<VersionAlert />', () => {
  const routerMock = ({
    asPath: '/docs',
  } as unknown) as Router

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => routerMock)
  })

  it('should be hidden when no version is present in the URL', () => {
    const { container } = render(<VersionAlert product={'waypoint'} />)
    expect(container.hasChildNodes()).toBe(false)
  })

  it('should be shown when viewing an older version', () => {
    useRouterMock.mockImplementation(() => {
      return ({
        asPath: '/docs/v0.5.1',
      } as unknown) as Router
    })

    const { getByText } = render(<VersionAlert product={'waypoint'} />)

    expect(getByText('waypoint', { exact: false })).toBeInTheDocument()
    expect(getByText('v0.5.1', { exact: false })).toBeInTheDocument()
  })
})
