import loadAnalytics from './load.js'

afterEach(() => {
  document.body.innerHTML = ''
  window.analytics = undefined
  window.test = undefined
})

test('reloads if analytics are already on the page', () => {
  const reloadMock = jest.fn()
  const windowSpy = jest.spyOn(global, 'window', 'get')
  windowSpy.mockImplementation(() => ({
    analytics: { initialized: true },
    location: { reload: reloadMock },
  }))
  loadAnalytics()
  expect(reloadMock).toHaveBeenCalled()
  windowSpy.mockRestore()
})

test('loads segment and additional services if loadAll is passed', () => {
  loadAnalytics({ loadAll: true }, 'XXX - write key')
  const html = document.body.innerHTML
  // script was injected
  expect(html).toMatch(
    /<script type="text\/javascript" src="https:\/\/cdn.segment.com\/analytics\.js/
  )
  // all services loaded
  expect(html).toMatch(
    /analytics\.load\("XXX - write key", {"integrations":{"All":true,"Segment\.io":true}}\);/
  )
})

test('loads only additional services if loadAll is passed and segment script is already on the page', () => {
  loadAnalytics({ loadAll: true }, 'XXX - write key', [
    { body: 'window.test = "active"' },
  ])
  expect(window.test).toBe('active')
})

test('loads segment services', () => {
  loadAnalytics({ segment: { foo: 'bar' } }, 'XXX - write key')
  const html = document.body.innerHTML
  expect(html).toMatch(
    /analytics\.load\("XXX - write key", {"integrations":{"All":false,"Segment.io":true,"foo":"bar"}}\);/
  )
})

test('loads custom services', () => {
  loadAnalytics({ custom: { test: {} } }, 'XXX - write key', [
    { name: 'test', body: 'window.test = "active"' },
  ])
  expect(window.test).toBe('active')
})
