import nock from 'nock'

import document_200 from '../../content-api/__fixtures__/document_200.json'
import navData_200 from '../../content-api/__fixtures__/navData_200.json'
import document_v4 from '../../content-api/__fixtures__/document_v0.4.x.json'
import navData_v4 from '../../content-api/__fixtures__/navData_v0.4.x.json'
import versionMetadata_200 from '../../content-api/__fixtures__/versionMetadata_200.json'

import RemoteContentLoader, { mapVersionList } from './remote-content'

let loader: RemoteContentLoader
let scope: nock.Scope

describe('RemoteContentLoader', () => {
  beforeAll(() => {
    loader = new RemoteContentLoader({
      basePath: 'commands',
      product: 'waypoint',
    })

    nock.disableNetConnect()

    scope = nock(process.env.MKTG_CONTENT_API!)
  })

  afterAll(() => {
    nock.enableNetConnect()
  })

  test('generates paths from remote nav data', async () => {
    scope
      .get('/api/content/waypoint/version-metadata')
      .query({ partial: 'true' })
      .reply(200, versionMetadata_200)
    scope
      .get('/api/content/waypoint/nav-data/v0.5.x/commands')
      .reply(200, navData_200)

    const paths = await loader.loadStaticPaths()

    expect(paths).toMatchSnapshot()
  })

  test('generates props from remote data', async () => {
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

    const props = await loader.loadStaticProps({ params: {} })

    expect(props).toMatchInlineSnapshot(
      {
        mdxSource: {
          compiledSource: expect.any(String),
        },

        navData: expect.any(Array),
      },
      `
      Object {
        "currentPath": "",
        "frontMatter": Object {
          "layout": "commands",
          "page_title": "Waypoint Commands (CLI)",
        },
        "githubFileUrl": "https://github.com/hashicorp/waypoint/blob/main/website/content/commands/index.mdx",
        "mdxSource": Object {
          "compiledSource": Any<String>,
          "scope": Object {},
        },
        "navData": Any<Array>,
        "versions": Array [
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
        ],
      }
    `
    )
  })

  test('should return a null github file url for non-latest versions', async () => {
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

    const versionedDocsLoader = new RemoteContentLoader({
      ...loader.opts,
      enabledVersionedDocs: true,
    })

    const props = await versionedDocsLoader.loadStaticProps({
      params: {
        page: ['v0.4.x'],
      },
    })

    expect(props.githubFileUrl).toBeNull()
  })
})

describe('mapVersionList', () => {
  const versionMetadataList = versionMetadata_200.result
  const versionList = mapVersionList(versionMetadataList)

  test('should label the first item as "latest"', () => {
    expect(versionList[0].name).toEqual('latest')
    expect(versionList[0].label.endsWith('(latest)')).toBe(true)
  })

  test('should sort by semver descending', () => {
    const list = [
      { version: 'v0.11.x' },
      { version: 'v0.9.x' },
      { version: 'v0.10.x' },
      { version: 'v1.9.x' },
      { version: 'v1.1.x' },
      { version: 'v1.10.x' },
      { version: 'v2.11.x' },
    ]
    const versionList = mapVersionList(list as any)

    expect(versionList).toMatchInlineSnapshot(`
Array [
  Object {
    "label": "v2.11.x",
    "name": "v2.11.x",
  },
  Object {
    "label": "v1.10.x",
    "name": "v1.10.x",
  },
  Object {
    "label": "v1.9.x",
    "name": "v1.9.x",
  },
  Object {
    "label": "v1.1.x",
    "name": "v1.1.x",
  },
  Object {
    "label": "v0.11.x",
    "name": "v0.11.x",
  },
  Object {
    "label": "v0.10.x",
    "name": "v0.10.x",
  },
  Object {
    "label": "v0.9.x",
    "name": "v0.9.x",
  },
]
`)
  })

  test('should map a list of version-metadata to a format for <VersionSelect/>', () => {
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
