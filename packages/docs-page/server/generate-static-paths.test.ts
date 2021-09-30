import { mocked } from 'ts-jest/utils'
import { resolveNavData } from './resolve-nav-data'

import { generateStaticPaths } from './'
import navData from './__fixtures__/navData.json'

const NAV_DATA_FILE = 'data/commands-nav-data.json'
const CONTENT_DIR = 'packages/docs-page/server/__fixtures__'
const basePath = 'commands'

jest.mock('./resolve-nav-data')
const mockedResolveNavData = mocked(resolveNavData)

describe('generateStaticPaths', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should generate static paths', async () => {
    mockedResolveNavData.mockImplementation(async () => navData)

    const input = {
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      product: { name: 'Waypoint', slug: 'waypoint' },
      basePath: basePath,
    }
    const res = await generateStaticPaths(input)
    expect(res).toMatchSnapshot()
  })
})
