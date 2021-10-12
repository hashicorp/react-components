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

    expect(paths).toMatchInlineSnapshot(`
      Array [
        Object {
          "params": Object {
            "page": Array [],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "main",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "configuration",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "build-interface",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "compiling",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "example-application",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "creating-plugins",
              "testing",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "main-func",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "passing-values",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "authenticator",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "configurable",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "configurable-notify",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "builder",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "registry",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "platform",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "release-manager",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "destroy",
            ],
          },
        },
        Object {
          "params": Object {
            "page": Array [
              "extending-waypoint",
              "plugin-interfaces",
              "default-parameters",
            ],
          },
        },
      ]
    `)
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
