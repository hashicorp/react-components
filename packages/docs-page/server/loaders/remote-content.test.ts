import nock from 'nock'

import document_200 from '../../content-api/__fixtures__/document_200.json'
import navData_200 from '../../content-api/__fixtures__/navData_200.json'
import document_v4 from '../../content-api/__fixtures__/document_v0.4.x.json'
import navData_v4 from '../../content-api/__fixtures__/navData_v0.4.x.json'
import versionMetadata_200 from '../../content-api/__fixtures__/versionMetadata_200.json'

import RemoteContentLoader from './remote-content'

let loader: RemoteContentLoader
let scope: nock.Scope

describe('RemoteContentLoader', () => {
  beforeAll(() => {
    loader = new RemoteContentLoader({
      basePath: 'commands',
      product: 'waypoint',
    })

    nock.disableNetConnect()

    scope = nock(process.env.MKTG_CONTENT_API, {
      reqheaders: {
        authorization: `Bearer ${process.env.MKTG_CONTENT_API_TOKEN}`,
      },
    })
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
