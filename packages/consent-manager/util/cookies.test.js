import cookies from 'js-cookie'
import * as cookiesJS from './cookies.js'

it('should get the domain', () => {
  const originalLocation = global.window.location
  const originalCookiesGet = cookies.get
  const originalCookiesSet = cookies.set

  // mocks
  delete global.window.location
  global.window.location = { hostname: 'foo.bar.baz.net' }
  cookies.get = jest.fn().mockImplementationOnce(() => 'baz.net')
  cookies.set = jest.fn()

  expect(cookiesJS.getDomain()).toBe('baz.net')

  // restore mocks
  global.window.location = originalLocation
  cookies.get = originalCookiesGet
  cookies.set = originalCookiesSet
})

it('should load preferences', () => {
  const preferences = JSON.stringify({ loadAll: true, version: 1 })
  const originalCookiesGetJSON = cookies.getJSON

  // mocks
  cookies.getJSON = jest.fn().mockImplementationOnce(() => preferences)

  expect(cookiesJS.loadPreferences()).toBe(preferences)

  // restore mocks
  cookies.getJSON = originalCookiesGetJSON
})

it('should save preferences', () => {
  const preferences = { loadAll: true, version: 1 }
  const version = 1
  const args = [
    cookiesJS.COOKIE_KEY,
    preferences,
    { expires: cookiesJS.COOKIE_EXPIRES, domain: '' },
  ]
  const originalCookiesJSGetDomain = cookiesJS.getDomain
  const originalCookiesSet = cookies.set

  // mocks
  // eslint-disable-next-line no-import-assign -- it's mocked, so the rule does not apply
  cookiesJS.getDomain = jest.fn().mockImplementation(() => 'baz.net')
  cookies.set = jest.fn()

  cookiesJS.savePreferences(preferences, version)

  const lastArgs = cookies.set.mock.calls[cookies.set.mock.calls.length - 1]

  expect(JSON.stringify(lastArgs)).toBe(JSON.stringify(args))

  // restore mocks
  // eslint-disable-next-line no-import-assign -- it's mocked, so the rule does not apply
  cookiesJS.getDomain = originalCookiesJSGetDomain
  cookies.set = originalCookiesSet
})
