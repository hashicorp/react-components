import { generateStaticPaths, generateStaticProps } from './server'

const NAV_DATA_FILE = 'data/commands-nav-data.json'
const CONTENT_DIR = 'content/commands'
const basePath = 'commands'

describe('generateStaticPaths', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.skip('should generate static paths', async () => {
    const input = {
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      product: { name: 'Waypoint', slug: 'waypoint' },
      basePath: basePath,
    }
    const res = await generateStaticPaths(input)
    expect(res).toMatchInlineSnapshot()
  })
})

describe('generateStaticProps', () => {
  it.skip('should generate static props', async () => {
    const input = {
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      product: { name: 'Waypoint', slug: 'waypoint' },
      params: {},
      basePath,
    }
    const res = await generateStaticProps(input as any)
    expect(res).toMatchInlineSnapshot()
  })
})
