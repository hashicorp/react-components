import '@testing-library/jest-dom/extend-expect'
import 'isomorphic-unfetch'
import nock from 'nock'

process.env.MKTG_CONTENT_API = 'http://localhost:3001'
process.env.MKTG_CONTENT_API_TOKEN = 'fake-bearer-token'

afterAll(() => {
  nock.cleanAll()
  nock.restore()
})

// Address an issue with mocking and clearing the module cache when dealing with components, ensures only one instance of react gets loaded
// ref: https://github.com/facebook/jest/issues/8987#issuecomment-584898030
let mockActualReact

jest.doMock('react', () => {
  if (!mockActualReact) {
    mockActualReact = jest.requireActual('react')
  }
  return mockActualReact
})
