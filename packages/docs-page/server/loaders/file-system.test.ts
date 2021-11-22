import { mocked } from 'ts-jest/utils'
import FileSystemLoader from './file-system'
import { resolveNavData } from '../resolve-nav-data'
import navData from '../__fixtures__/navData.json'

jest.mock('../resolve-nav-data')
const mockedResolveNavData = mocked(resolveNavData)

const CONTENT_DIR = 'packages/docs-page/server/__fixtures__'

let loader: FileSystemLoader

describe('FileSystemLoader', () => {
  beforeAll(() => {
    loader = new FileSystemLoader({
      navDataFile: 'test',
      localContentDir: CONTENT_DIR,
      product: 'waypoint',
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generates path from nav data', async () => {
    mockedResolveNavData.mockImplementation(async () => navData)

    const paths = await loader.loadStaticPaths()

    expect(paths).toMatchSnapshot()
  })

  test('generates static props from mdx file', async () => {
    const props = await loader.loadStaticProps({ params: {} })

    expect(props).toMatchInlineSnapshot(
      {
        mdxSource: { compiledSource: expect.any(String) },
        navData: expect.any(Array),
      },
      `
      Object {
        "currentPath": "",
        "frontMatter": Object {
          "description": "Welcome to the intro guide to Vault! This guide is the best place to start with Vault. We cover what Vault is, what problems it can solve, how it compares to existing software, and contains a quick start for using Vault.",
          "page_title": "Introduction",
        },
        "githubFileUrl": "https://github.com/hashicorp/waypoint/blob/main/website/packages/docs-page/server/__fixtures__/index.mdx",
        "headings": Array [
          Object {
            "aliases": Array [],
            "level": 1,
            "permalinkSlug": "introduction-to-vault",
            "slug": "introduction-to-vault",
            "title": "Introduction to Vault",
          },
          Object {
            "aliases": Array [],
            "level": 2,
            "permalinkSlug": "what-is-vault",
            "slug": "what-is-vault",
            "title": "What is Vault?",
          },
          Object {
            "aliases": Array [],
            "level": 2,
            "permalinkSlug": "next-steps",
            "slug": "next-steps",
            "title": "Next Steps",
          },
        ],
        "mdxSource": Object {
          "compiledSource": Any<String>,
          "scope": Object {},
        },
        "navData": Any<Array>,
        "versions": Array [],
      }
    `
    )
  })
})
