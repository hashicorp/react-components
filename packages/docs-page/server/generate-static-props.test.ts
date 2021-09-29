import { mocked } from 'ts-jest/utils'
import { resolveNavData } from './resolve-nav-data'

import { generateStaticProps, mapVersionList } from './generate-static-props'
import navData from './__fixtures__/navData.json'
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
