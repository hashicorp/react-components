import { mocked } from 'ts-jest/utils'
import { resolveNavData } from './resolve-nav-data'

import { generateStaticProps } from './'
import navData from './__fixtures__/navData.json'

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
