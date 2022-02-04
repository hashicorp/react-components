import nock from 'nock'
import { render, waitFor } from '@testing-library/react'
import * as Router from 'next/router'
import use404Redirects from '../use-404-redirects'

function HookTestComponent() {
  use404Redirects()
  return <div>Testing the use404Redirects hook...</div>
}

const useRouter = jest.spyOn(Router, 'useRouter')

describe('use404Redirects', () => {
  let originalLocation: typeof window.location
  let originalAnalytics: typeof window.analytics

  beforeAll(() => {
    originalLocation = window.location
    originalAnalytics = window.analytics
  })

  beforeEach(() => {
    nock('http://local.test')
      .head('/testing')
      .reply(308, '', { Location: '/new-destination' })
      .head('/new-destination')
      .reply(200, '')
      .head('/valid')
      .reply(200, '')

    delete (window as any).location
    window.location = {
      // We use an absolute URL here since fetch in Jest can't use relative URLs
      pathname: 'http://local.test/testing',
      href: 'http://local.test/testing',
    } as $TSFixMe
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.location = originalLocation
    window.analytics = originalAnalytics
  })

  afterAll(() => {
    nock.restore()
  })

  it('tracks event and calls router.replace with resolved URL', async () => {
    const useRouterMethods = { replace: jest.fn() } as $TSFixMe
    useRouter.mockImplementationOnce(() => useRouterMethods)

    window.analytics = { track: jest.fn() } as $TSFixMe

    // Render and assert
    render(<HookTestComponent />)
    await waitFor(() =>
      expect(useRouterMethods.replace).toHaveBeenCalledWith('/new-destination')
    )
    expect(window.analytics.track).toHaveBeenCalledTimes(1)
    expect(window.analytics.track).toBeCalledWith('http://local.test/testing', {
      category: 'Client-side Redirect',
      label: 'http://local.test/new-destination',
    })
  })

  it('does not call router.replace when current URL == resolved URL', async () => {
    const useRouterMethods = { replace: jest.fn() } as $TSFixMe
    useRouter.mockImplementationOnce(() => useRouterMethods)

    window.analytics = { track: jest.fn() } as $TSFixMe

    window.location = {
      pathname: 'http://local.test/valid',
      href: 'http://local.test/valid',
    } as $TSFixMe

    // Render and assert
    render(<HookTestComponent />)
    await waitFor(() => expect(useRouterMethods.replace).not.toHaveBeenCalled())
    expect(window.analytics.track).not.toHaveBeenCalled()
  })
})
