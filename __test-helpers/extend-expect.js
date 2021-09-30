import '@testing-library/jest-dom/extend-expect'
import 'isomorphic-unfetch'
import nock from 'nock'

process.env.MKTG_CONTENT_API = 'http://localhost:3001'
process.env.MKTG_CONTENT_API_TOKEN = 'fake-bearer-token'

afterAll(() => {
  nock.cleanAll()
  nock.restore()
})
