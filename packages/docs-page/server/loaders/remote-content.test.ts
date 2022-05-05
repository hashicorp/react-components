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

  test("allows 'navDataPrefix' to look up nav data", async () => {
    const loader = new RemoteContentLoader({
      basePath: 'plugin/mux',
      navDataPrefix: 'plugin-mux',
      product: 'terraform-plugin-mux',
    })

    scope
      .get('/api/content/terraform-plugin-mux/version-metadata')
      .query({ partial: 'true' })
      .reply(200, {
        meta: {
          status_code: 200,
          status_text: 'OK',
        },
        result: [
          {
            product: 'terraform-plugin-mux',
            ref: 'refs/heads/main',
            version: 'v0.6.x',
            created_at: '2022-05-05T20:45:15.560Z',
            display: 'v0.6.x',
            sha: 'b20cf6618b0bdf4c9eb8895b1d30eca11cc3eae5',
            sk: 'version-metadata/v0.6.x',
            isLatest: true,
            pk: 'terraform-plugin-mux#version-metadata',
          },
        ],
      })

    // NOTE: The key assertion is the 'plugin-mux' segment in this URL
    scope
      .get('/api/content/terraform-plugin-mux/nav-data/v0.6.x/plugin-mux')
      .reply(200, {
        meta: {
          status_code: 200,
          status_text: 'OK',
        },
        result: {
          product: 'terraform-plugin-mux',
          githubFile: 'website/docs/plugin-mux-nav-data.json',
          version: 'v0.6.x',
          created_at: '2022-05-05T20:45:15.438Z',
          sha: 'b20cf6618b0bdf4c9eb8895b1d30eca11cc3eae5',
          sk: 'nav-data/v0.6.x/plugin-mux',
          subpath: 'plugin-mux',
          pk: 'terraform-plugin-mux#nav-data/v0.6.x/plugin-mux',
          navData: [
            {
              heading: 'Combining and Translating',
            },
            {
              title: 'Overview',
              path: '',
            },
            {
              title: 'Combining Protocol v5 Providers',
              path: 'combining-protocol-version-5-providers',
            },
            {
              title: 'Combining Protocol v6 Providers',
              path: 'combining-protocol-version-6-providers',
            },
            {
              title: 'Translating Protocol v5 to v6',
              path: 'translating-protocol-version-5-to-6',
            },
            {
              title: 'Translating Protocol v6 to v5',
              path: 'translating-protocol-version-6-to-5',
            },
          ],
        },
      })

    const paths = await loader.loadStaticPaths()
    expect(paths).toHaveLength(6)
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
            "isLatest": true,
            "label": "v0.5.2 (latest)",
            "name": "latest",
            "version": "v0.5.x",
          },
          Object {
            "isLatest": false,
            "label": "v0.4.x",
            "name": "v0.4.x",
            "version": "v0.4.x",
          },
          Object {
            "isLatest": false,
            "label": "v0.3.x",
            "name": "v0.3.x",
            "version": "v0.3.x",
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
          "isLatest": false,
          "label": "v2.11.x",
          "name": "v2.11.x",
          "version": "v2.11.x",
        },
        Object {
          "isLatest": false,
          "label": "v1.10.x",
          "name": "v1.10.x",
          "version": "v1.10.x",
        },
        Object {
          "isLatest": false,
          "label": "v1.9.x",
          "name": "v1.9.x",
          "version": "v1.9.x",
        },
        Object {
          "isLatest": false,
          "label": "v1.1.x",
          "name": "v1.1.x",
          "version": "v1.1.x",
        },
        Object {
          "isLatest": false,
          "label": "v0.11.x",
          "name": "v0.11.x",
          "version": "v0.11.x",
        },
        Object {
          "isLatest": false,
          "label": "v0.10.x",
          "name": "v0.10.x",
          "version": "v0.10.x",
        },
        Object {
          "isLatest": false,
          "label": "v0.9.x",
          "name": "v0.9.x",
          "version": "v0.9.x",
        },
      ]
    `)
  })

  test('should map a list of version-metadata to a format for <VersionSelect/>', () => {
    expect(versionList).toMatchInlineSnapshot(`
      Array [
        Object {
          "isLatest": true,
          "label": "v0.5.2 (latest)",
          "name": "latest",
          "version": "v0.5.x",
        },
        Object {
          "isLatest": false,
          "label": "v0.4.x",
          "name": "v0.4.x",
          "version": "v0.4.x",
        },
        Object {
          "isLatest": false,
          "label": "v0.3.x",
          "name": "v0.3.x",
          "version": "v0.3.x",
        },
      ]
    `)
  })
})
