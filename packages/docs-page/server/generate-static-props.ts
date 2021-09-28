import path from 'path'
import fs from 'fs'
import moize, { Options } from 'moize'

import {
  fetchNavData,
  fetchDocument,
  fetchVersionMetadataList,
} from '../content-api'
import { ENABLE_VERSIONED_DOCS, DEFAULT_PARAM_ID } from './consts'

import renderPageMdx from '../render-page-mdx'

import { stripVersionFromPathParams, normalizeVersion } from '../util'

import { resolveNavData } from './resolve-nav-data'
import { getNodeFromPath } from './get-node-from-path'

const moiseOpts: Options = { isPromise: true, maxSize: Infinity }
const cachedFetchNavData = moize(fetchNavData, moiseOpts)
const cachedFetchVersionMetadataList = moize(
  fetchVersionMetadataList,
  moiseOpts
)

export interface GenerateStaticPropsContext {
  navDataFile: string
  localContentDir: string
  params: Record<string, string[]> // {} | { page: ["destroy"] }
  product: { name: string; slug: string }
  mainBranch?: string // = 'main',
  remarkPlugins?: any[]
  scope?: any // optional, I think?
  paramId?: string
  basePath: string // 'docs'
}

export async function generateStaticProps({
  navDataFile,
  localContentDir,
  params,
  product: { name: productName, slug: productSlug },
  mainBranch = 'main',
  remarkPlugins = [],
  scope,
  paramId = DEFAULT_PARAM_ID,
  basePath,
}: GenerateStaticPropsContext) {
  const mdxRenderer = (mdx) =>
    renderPageMdx(mdx, {
      remarkPlugins,
      scope,
    })

  // Build the currentPath from page parameters
  const currentPath = params[paramId] ? params[paramId].join('/') : ''

  let versions = []
  let latestVersion = null

  // This code path handles versioned docs integration, which is currently gated behind the ENABLE_VERSIONED_DOCS env var
  if (ENABLE_VERSIONED_DOCS) {
    // given: v0.5.x (latest), v0.4.x, v0.3.x
    const [versionFromPath, paramsNoVersion] = stripVersionFromPathParams(
      params[paramId]
    )
    // versionFromPath should realistically only ever be "latest" | "v0.4.x" | "v0.3.x"
    // It could be v0.5.x if a use navigates directly to it.

    const versionMetadataList = await cachedFetchVersionMetadataList(
      productSlug
    )
    versions = versionMetadataList.map((e) => {
      const { isLatest, version, display } = e
      if (isLatest) {
        latestVersion = version
      }

      const displayValue = display ?? version

      return {
        name: isLatest ? 'latest' : version,
        label: isLatest ? `${displayValue} (latest)` : displayValue,
      }
    })

    // Only load docs content from the DB if we're in production or there's an explicit version in the path
    // Preview and dev environments will read the "latest" content from the filesystem
    if (
      process.env.VERCEL_ENV === 'production' ||
      versionFromPath !== 'latest'
    ) {
      // remove trailing index to ensure we fetch the right document from the DB
      const pathParamsNoIndex = paramsNoVersion.filter(
        (param, idx, arr) => !(param === 'index' && idx === arr.length - 1)
      )

      const currentVersionNormalized =
        versionFromPath === 'latest'
          ? latestVersion
          : normalizeVersion(versionFromPath)

      const _fullPath = [
        'doc',
        currentVersionNormalized,
        basePath,
        ...pathParamsNoIndex,
      ].join('/')

      const documentPromise = fetchDocument(productSlug, _fullPath)
      const navDataPromise = cachedFetchNavData(
        productSlug,
        basePath,
        currentVersionNormalized
      )

      const [document, navData] = await Promise.all([
        documentPromise,
        navDataPromise,
      ])

      const { mdxSource } = await mdxRenderer(document.markdownSource)
      const frontMatter = document.metadata

      // Construct the githubFileUrl, used for "Edit this page" link
      // https://github.com/hashicorp/waypoint/blob/main/website/content/commands/index.mdx
      // https://github.com/hashicorp/waypoint/blob/v0.5.2/website/content/commands/index.mdx
      // https://github.com/hashicorp/waypoint/blob/e591452/website/content/commands/index.mdx
      // https://github.com/hashicorp/waypoint/blob/e591452e6f9a155a038d45158e05d904ba006d37/website/content/commands/index.mdx
      // const githubFileUrl = `https://github.com/hashicorp/${productSlug}/blob/${document.sha}/website/content/${doc.filePath}`

      // Todo: https://app.asana.com/0/1100423001970639/1201024261811837/f
      // Must be serializeable
      const githubFileUrl = null

      return {
        versions,
        currentPath,
        frontMatter,
        githubFileUrl,
        mdxSource,
        navData: navData.navData,
      }
    }
  }

  //  Read in the nav data, and resolve local filePaths
  const navData = await resolveNavData(navDataFile, localContentDir)
  //  Get the navNode that matches this path
  const navNode = getNodeFromPath(currentPath, navData, localContentDir)
  //  Read in and process MDX content from the navNode's filePath
  const mdxFile = path.join(process.cwd(), navNode.filePath)
  const mdxString = fs.readFileSync(mdxFile, 'utf8')
  const { mdxSource, frontMatter } = await mdxRenderer(mdxString)

  // Construct the githubFileUrl, used for "Edit this page" link
  const githubFileUrl = `https://github.com/hashicorp/${productSlug}/blob/${mainBranch}/website/${navNode.filePath}`
  // Return all the props
  return {
    currentPath,
    frontMatter,
    githubFileUrl,
    mdxSource,
    navData,
    versions,
    latestVersion,
  }
}
