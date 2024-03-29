/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ParsedUrlQuery } from 'querystring'
import { Pluggable } from 'unified'
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
  /**
   * In most cases, `basePath` should suffice when resolving nav-data, because
   * it happens to match the prefix of nav-data file.
   *
   * If it does not, `navDataPrefix` will serve as an optional override.
   */
  navDataPrefix?: string
  enabledVersionedDocs?: boolean
  remarkPlugins?: ((params?: ParsedUrlQuery) => Pluggable[]) | Pluggable[]
  rehypePlugins?: Pluggable[]
  mainBranch?: string // = 'main',
  scope?: Record<string, $TSFixMe>
  /**
   * Allows us to override the default ref from which we fetch the latest content.
   * e.g. when no version exists in the path, and latestVersionRef was 'my-stable-branch', we would fetch content for `my-stable-branch`
   */
  latestVersionRef?: string
}

/**
 * TODO: export this from future content-api client
 * @see https://app.asana.com/0/1100423001970639/1201071725174928/f
 */
export type ReleaseStage = 'alpha' | 'beta' | 'rc' | 'stable'
export interface VersionMetadataItem {
  product: string
  ref: string
  version: string
  created_at: string
  display?: string
  sha: string
  isLatest?: boolean
  fullPath: string
  releaseStage: ReleaseStage
}

export interface VersionSelectItem {
  name: string
  label: string
  version: string
  isLatest: boolean
  releaseStage: ReleaseStage
}

const moizeOpts: Options = { isPromise: true, maxSize: Infinity }
const cachedFetchNavData = moize(fetchNavData, moizeOpts)
const cachedFetchVersionMetadataList = moize(
  fetchVersionMetadataList,
  moizeOpts
)

const determineLabel = (option: VersionMetadataItem) => {
  const displayValue = option.display || option.version

  if (option.isLatest) {
    return `${displayValue} (latest)`
  }

  if (
    typeof option.releaseStage !== 'undefined' &&
    option.releaseStage !== 'stable'
  ) {
    return `${displayValue} (${option.releaseStage})`
  }

  return displayValue
}

/**
 * Formats a list of version-metadata to,
 * be passed to `<VersionSelect versions={[...]} />`.
 * - Sorts by semver, descending
 */
export function mapVersionList(
  list: VersionMetadataItem[]
): VersionSelectItem[] {
  const versions = list.map((versionOption) => {
    const { isLatest, version, releaseStage } = versionOption

    return {
      name: isLatest ? 'latest' : version,
      label: determineLabel(versionOption),
      isLatest: isLatest || false,
      releaseStage: releaseStage,
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
    if (!this.opts.rehypePlugins) this.opts.rehypePlugins = []
    if (!this.opts.navDataPrefix) this.opts.navDataPrefix = this.opts.basePath
    if (!this.opts.mdxContentHook)
      this.opts.mdxContentHook = (mdxContent, scope) => mdxContent
  }

  loadStaticPaths = async (): Promise<$TSFixMe> => {
    // Fetch version metadata to get "latest"
    const versionMetadataList = await cachedFetchVersionMetadataList(
      this.opts.product
    )

    const latest: string =
      this.opts.latestVersionRef ??
      versionMetadataList.find((e) => e.isLatest).version

    // Fetch and parse navigation data
    const navDataResponse = await cachedFetchNavData(
      this.opts.product,
      this.opts.navDataPrefix!,
      latest
    )
    const navData = navDataResponse.navData
    return getPathsFromNavData(navData, this.opts.paramId)
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
      if (!Array.isArray(remarkPlugins)) {
        throw new Error(
          '`remarkPlugins:` When specified as a function, must return an array of remark plugins'
        )
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we default this in the constructor, so it must be defined
      remarkPlugins = this.opts.remarkPlugins!
    }

    // given: v0.5.x (latest), v0.4.x, v0.3.x
    const [versionFromPath, paramsNoVersion] = stripVersionFromPathParams(
      params![this.opts.paramId!] as string[]
    )

    const mdxRenderer = (mdx) =>
      renderPageMdx(mdx, {
        mdxContentHook: this.opts.mdxContentHook,
        remarkPlugins,
        rehypePlugins: this.opts.rehypePlugins,
        scope: { version: versionFromPath, ...this.opts.scope },
      })

    const versionMetadataList: VersionMetadataItem[] =
      await cachedFetchVersionMetadataList(this.opts.product)

    const latestVersion =
      this.opts.latestVersionRef ??
      versionMetadataList.find((e) => e.isLatest)!.version

    let versionToFetch = latestVersion

    if (this.opts.enabledVersionedDocs) {
      versionToFetch =
        versionFromPath === 'latest'
          ? latestVersion
          : normalizeVersion(versionFromPath)
    }

    /**
     * Note: we expect the provided params to not include
     * a trailing `/index`, as our URLs do not include trailing `/index`.
     *
     * The reason for this is that otherwise, we end allowing visitors to see
     * all category pages at both `/some-doc` and `/some-doc/index` URLs.
     * We want the latter URL to 404, so we do NOT want to automatically
     * resolve trailing `/index` from provided URL path parts.
     */
    const fullPath = [
      'doc',
      versionToFetch,
      this.opts.basePath,
      ...paramsNoVersion,
    ].join('/')

    const documentPromise = fetchDocument(this.opts.product, fullPath)
    const navDataPromise = cachedFetchNavData(
      this.opts.product,
      this.opts.navDataPrefix!,
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
      const isLatest =
        (versionFromPath === 'latest' && Boolean(this.opts.latestVersionRef)) ||
        versionMetadataList.find((e) => e.version === document.version)!
          .isLatest
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
