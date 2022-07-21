import React from 'react'
import { render } from '@testing-library/react'
import VersionAlert from './index'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

const useRouterMock = mocked(useRouter)

jest.mock('next/router')

describe('<VersionAlert />', () => {
  const routerMock = {
    asPath: '/docs',
  } as unknown as Router

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => routerMock)
  })

  it('should be hidden when no version is present in the URL', () => {
    const { container } = render(<VersionAlert product={'waypoint'} />)
    expect(container.hasChildNodes()).toBe(false)
  })

  it.each([
    [
      /* Product      */ 'Waypoint',
      /* Path         */ '/docs/v0.5.x',
      /* Text content */ "You're looking at documentation for Waypoint v0.5.x. Click here to view the latest content.",
    ],
    [
      'CDK for Terraform',
      '/cdktf/v0.10.x',
      "You're looking at documentation for CDK for Terraform v0.10.x. Click here to view the latest content.",
    ],
    [
      'Terraform Enterprise',
      '/enterprise/v202207-1',
      "You're looking at documentation for Terraform Enterprise v202207-1. Click here to view the latest content.",
    ],
  ])(
    'given product: %p, and path: %p as arguments, should render an alert: %p',
    (product, path, textContent) => {
      useRouterMock.mockImplementation(() => {
        return {
          asPath: path,
        } as unknown as Router
      })

      const { getByTestId } = render(<VersionAlert product={product} />)

      expect(getByTestId('text')).toHaveTextContent(textContent)
    }
  )
})
