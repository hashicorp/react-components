import type { ParsedUrlQuery } from 'querystring'
import moize, { Options } from 'moize'
import semver from 'semver'
import { GetStaticPropsContext } from 'next'
import renderPageMdx from '../../render-page-mdx'
import {
  fetchNavData,
  fetchVersionMetadataList,
  fetchDocument,
} from '../../content-api'
import { normalizeVersion, stripVersionFromPathParams } from '../../util'

import { DEFAULT_PARAM_ID } from '../consts'

import { DataLoader, DataLoaderOpts } from './types'
import { getPathsFromNavData } from '../get-paths-from-nav-data'

interface RemoteContentLoaderOpts extends DataLoaderOpts {
  basePath: string
  enabledVersionedDocs?: boolean
  remarkPlugins?: ((params?: ParsedUrlQuery) => $TSFixMe[]) | $TSFixMe[]
  mainBranch?: string // = 'main',
  scope?: Record<string, $TSFixMe>
}

/**
 * TODO: export this from future content-api client
 * @see https://app.asana.com/0/1100423001970639/1201071725174928/f
 */
interface VersionMetadataItem {
  product: string
  ref: string
  version: string
  created_at: string
  display?: string
  sha: string
  isLatest?: boolean
  fullPath: string
}

export interface VersionSelectItem {
  name: string
  label: string
  version: string
  isLatest: boolean
}

const moizeOpts: Options = { isPromise: true, maxSize: Infinity }
const cachedFetchNavData = moize(fetchNavData, moizeOpts)
const cachedFetchVersionMetadataList = moize(
  fetchVersionMetadataList,
  moizeOpts
)

/**
 * Formats a list of version-metadata to,
 * be passed to `<VersionSelect versions={[...]} />`.
 * - Sorts by semver, descending
 */
export function mapVersionList(
  list: VersionMetadataItem[]
): VersionSelectItem[] {
  const versions = list
    .sort((a, b) =>
      semver.compare(semver.coerce(b.version)!, semver.coerce(a.version)!)
    )
    .map((e) => {
      const { isLatest, version, display } = e

      const displayValue = display || version

      return {
        name: isLatest ? 'latest' : version,
        label: isLatest ? `${displayValue} (latest)` : displayValue,
        isLatest: isLatest || false,
        version,
      }
    })

  return versions
}

export default class RemoteContentLoader implements DataLoader {
  constructor(public opts: RemoteContentLoaderOpts) {
    if (typeof this.opts.enabledVersionedDocs === 'undefined')
      this.opts.enabledVersionedDocs =
        process.env.ENABLE_VERSIONED_DOCS?.toString() === 'true'

    if (!this.opts.paramId) this.opts.paramId = DEFAULT_PARAM_ID
    if (!this.opts.mainBranch) this.opts.mainBranch = 'main'
    if (!this.opts.scope) this.opts.scope = {}
    if (!this.opts.remarkPlugins) this.opts.remarkPlugins = []
  }

  loadStaticPaths = async (): Promise<$TSFixMe> => {
    // Fetch version metadata to get "latest"
    const versionMetadataList = await cachedFetchVersionMetadataList(
      this.opts.product
    )
    const latest = versionMetadataList.find((e) => e.isLatest).version
    // Fetch and parse navigation data
    return getPathsFromNavData(
      (await cachedFetchNavData(this.opts.product, this.opts.basePath, latest))
        .navData,
      this.opts.paramId
    )
  }

  loadStaticProps = async ({
    params,
  }: GetStaticPropsContext): Promise<$TSFixMe> => {
    // Build the currentPath from page parameters
    const currentPath =
      params && this.opts.paramId && params[this.opts.paramId]
        ? (params[this.opts.paramId] as string[]).join('/')
        : ''

    let remarkPlugins: $TSFixMe[] = []

    // We support passing in a function to remarkPlugins, which gets the parameters of the current page
    if (typeof this.opts.remarkPlugins === 'function') {
      remarkPlugins = this.opts.remarkPlugins(params)
    }

    const mdxRenderer = (mdx) =>
      renderPageMdx(mdx, {
        remarkPlugins,
        scope: this.opts.scope,
      })

    // given: v0.5.x (latest), v0.4.x, v0.3.x
    const [versionFromPath, paramsNoVersion] = stripVersionFromPathParams(
      params![this.opts.paramId!] as string[]
    )

    const versionMetadataList: VersionMetadataItem[] = await cachedFetchVersionMetadataList(
      this.opts.product
    )
    // remove trailing index to ensure we fetch the right document from the DB
    const pathParamsNoIndex = paramsNoVersion.filter(
      (param, idx, arr) => !(param === 'index' && idx === arr.length - 1)
    )

    const latestVersion = versionMetadataList.find((e) => e.isLatest)!.version

    let versionToFetch = latestVersion

    if (this.opts.enabledVersionedDocs) {
      versionToFetch =
        versionFromPath === 'latest'
          ? latestVersion
          : normalizeVersion(versionFromPath)
    }

    const fullPath = [
      'doc',
      versionToFetch,
      this.opts.basePath,
      ...pathParamsNoIndex,
    ].join('/')

    const documentPromise = fetchDocument(this.opts.product, fullPath)
    const navDataPromise = cachedFetchNavData(
      this.opts.product,
      this.opts.basePath,
      versionToFetch
    )

    const [document, navData] = await Promise.all([
      documentPromise,
      navDataPromise,
    ])

    const { mdxSource } = await mdxRenderer(document.markdownSource)
    const frontMatter = document.metadata

    // Construct the githubFileUrl, used for "Edit this page" link

    // Must be serializeable
    let githubFileUrl: string | null = null

    if (document.githubFile) {
      // Link latest version to `main`
      // Hide link on older versions
      const isLatest = versionMetadataList.find(
        (e) => e.version === document.version
      )!.isLatest
      if (isLatest) {
        // GitHub only allows you to modify a file if you are on a branch, not a commit
        githubFileUrl = `https://github.com/hashicorp/${this.opts.product}/blob/${this.opts.mainBranch}/${document.githubFile}`
      }
    }

    return {
      versions: mapVersionList(versionMetadataList),
      currentPath,
      frontMatter,
      githubFileUrl,
      mdxSource,
      navData: navData.navData,
    }
  }
}
