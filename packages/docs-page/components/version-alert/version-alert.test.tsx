/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import { render } from '@testing-library/react'
import VersionAlert from './index'

import { mocked } from 'ts-jest/utils'
import { useRouter, Router } from 'next/router'

const useRouterMock = mocked(useRouter)

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('<VersionAlert />', () => {
  const routerMock = {
    asPath: '/docs',
  } as unknown as Router

  beforeEach(() => {
    jest.clearAllMocks()
    useRouterMock.mockImplementation(() => routerMock)
  })

  it('should be hidden when no version is present in the URL', () => {
    const { container } = render(
      <VersionAlert
        tag={'old version'}
        text={"You're looking at documentation for product"}
      />
    )
    expect(container.hasChildNodes()).toBe(false)
  })

  it('should render a tag and text content', () => {
    useRouterMock.mockImplementation(() => {
      return {
        asPath: 'cli/v1.1.x',
      } as unknown as Router
    })

    const { getByTestId } = render(
      <VersionAlert tag="old version" text="Some Text" />
    )

    expect(getByTestId('tag')).toHaveTextContent('old version')
    expect(getByTestId('text')).toHaveTextContent('Some Text')
  })
})
