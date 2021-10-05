import { mocked } from 'ts-jest/utils'
import nock from 'nock'
import { resolveNavData } from './resolve-nav-data'

import { generateStaticProps, mapVersionList } from './generate-static-props'
import navData from './__fixtures__/navData.json'
import document_200 from '../content-api/__fixtures__/document_200.json'
import navData_200 from '../content-api/__fixtures__/navData_200.json'
import document_v4 from '../content-api/__fixtures__/document_v0.4.x.json'
import navData_v4 from '../content-api/__fixtures__/navData_v0.4.x.json'
import versionMetadata_200 from '../content-api/__fixtures__/versionMetadata_200.json'

const NAV_DATA_FILE = 'data/commands-nav-data.json'
const CONTENT_DIR = 'packages/docs-page/server/__fixtures__'
const basePath = 'commands'

jest.mock('./resolve-nav-data')
const mockedResolveNavData = mocked(resolveNavData)

describe('generateStaticProps', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should generate static props', async () => {
    mockedResolveNavData.mockImplementation(async () => navData)

    const input = {
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      product: { name: 'Waypoint', slug: 'waypoint' },
      params: {},
      basePath,
    }
    const res = await generateStaticProps(input)
    expect(res).toMatchSnapshot()
  })

  describe('when versioned docs is enabled', () => {
    let scope: nock.Scope

    beforeEach(() => {
      nock.disableNetConnect()
      scope = nock(process.env.MKTG_CONTENT_API, {
        reqheaders: {
          authorization: `Bearer ${process.env.MKTG_CONTENT_API_TOKEN}`,
        },
      })
    })

    afterAll(() => {
      nock.restore()
    })

    it('should generate static props', async () => {
      scope
        .get('/api/content/waypoint/version-metadata')
        .query({ partial: 'true' })
        .reply(200, versionMetadata_200)
      scope
        .get('/api/content/waypoint/doc/v0.5.x/commands')
        .reply(200, document_200)
      scope
        .get('/api/content/waypoint/nav-data/v0.5.x/commands')
        .reply(200, navData_200)

      const input = {
        navDataFile: NAV_DATA_FILE,
        localContentDir: CONTENT_DIR,
        product: { name: 'Waypoint', slug: 'waypoint' },
        params: {
          page: ['v0.5.x'],
        },
        basePath,
      }
      const res = await generateStaticProps(input, {
        VERCEL_ENV: 'true',
        ENABLE_VERSIONED_DOCS: 'true',
      })
      expect(res).toMatchSnapshot()
    })

    it('should return a null github file url for non-latest versions', async () => {
      scope
        .get('/api/content/waypoint/version-metadata')
        .query({ partial: 'true' })
        .reply(200, versionMetadata_200)
      scope
        .get('/api/content/waypoint/doc/v0.4.x/commands')
        .reply(200, document_v4)
      scope
        .get('/api/content/waypoint/nav-data/v0.4.x/commands')
        .reply(200, navData_v4)

      const input = {
        navDataFile: NAV_DATA_FILE,
        localContentDir: CONTENT_DIR,
        product: { name: 'Waypoint', slug: 'waypoint' },
        params: {
          page: ['v0.4.x'],
        },
        basePath,
      }
      const res = await generateStaticProps(input, {
        VERCEL_ENV: 'true',
        ENABLE_VERSIONED_DOCS: 'true',
      })
      expect(res.githubFileUrl).toBe(null)
    })
  })
})

describe('mapVersionList', () => {
  const versionMetadataList = versionMetadata_200.result
  const versionList = mapVersionList(versionMetadataList)

  it('should label the first item as "latest"', () => {
    expect(versionList[0].name).toEqual('latest')
    expect(versionList[0].label.endsWith('(latest)')).toBe(true)
  })

  it('should map a list of version-metadata to a format for <VersionSelect/>', () => {
    expect(versionList).toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "v0.5.2 (latest)",
          "name": "latest",
        },
        Object {
          "label": "v0.4.x",
          "name": "v0.4.x",
        },
        Object {
          "label": "v0.3.x",
          "name": "v0.3.x",
        },
      ]
    `)
  })
})
