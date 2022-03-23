import path from 'path'
import fs from 'fs'
import { GetStaticPropsContext } from 'next'
import { Debugger } from 'debug'
import { getPathsFromNavData } from '../get-paths-from-nav-data'
import { resolveNavData } from '../resolve-nav-data'

import { DEFAULT_PARAM_ID } from '../consts'

import renderPageMdx from '../../render-page-mdx'

import { getNodeFromPath } from '../get-node-from-path'

import { DataLoader, DataLoaderOpts } from './types'

interface FileSystemLoaderOpts extends DataLoaderOpts {
  navDataFile: string
  localContentDir: string
  mainBranch?: string // = 'main',
  remarkPlugins?: $TSFixMe[]
  scope?: Record<string, $TSFixMe>
  localPartialsDir?: string
  githubFileUrl?: (path: string) => string
}

export default class FileSystemLoader implements DataLoader {
  debug?: Debugger

  constructor(public opts: FileSystemLoaderOpts, logger?: Debugger) {
    if (!this.opts.paramId) this.opts.paramId = DEFAULT_PARAM_ID
    if (!this.opts.mainBranch) this.opts.mainBranch = 'main'
    if (!this.opts.scope) this.opts.scope = {}
    if (!this.opts.remarkPlugins) this.opts.remarkPlugins = []

    if (logger) this.debug = logger.extend('FileSystemLoader')
    this.debug?.(`opts %O`, this.opts)
  }

  loadStaticPaths = async (): Promise<$TSFixMe> => {
    const logger = this.debug?.extend('loadStaticPaths')

    const navData = await resolveNavData(
      this.opts.navDataFile,
      this.opts.localContentDir
    )
    logger?.('navData %O', { navData })

    return getPathsFromNavData(navData, this.opts.paramId)
  }

  loadStaticProps = async ({
    params,
  }: GetStaticPropsContext): Promise<$TSFixMe> => {
    const logger = this.debug?.extend('loadStaticProps')

    logger?.('params %O', params)

    const mdxRenderer = (mdx) =>
      renderPageMdx(mdx, {
        remarkPlugins: this.opts.remarkPlugins,
        scope: this.opts.scope,
        localPartialsDir: this.opts.localPartialsDir,
      })

    // Build the currentPath from page parameters
    const currentPath =
      params && this.opts.paramId && params[this.opts.paramId]
        ? (params[this.opts.paramId] as string[]).join('/')
        : ''
    logger?.('currentPath %O', currentPath)

    //  Read in the nav data, and resolve local filePaths
    const navData = await resolveNavData(
      this.opts.navDataFile,
      this.opts.localContentDir
    )
    logger?.('navData %O', { navData })

    //  Get the navNode that matches this path
    const navNode = getNodeFromPath(
      currentPath,
      navData,
      this.opts.localContentDir
    )
    logger?.('navNode %O', { navNode })

    //  Read in and process MDX content from the navNode's filePath
    const mdxFile = path.join(process.cwd(), navNode.filePath)
    logger?.('mdxFile %O', { mdxFile })

    const mdxString = await fs.promises.readFile(mdxFile, 'utf8')
    logger?.('mdxString %O', { mdxString })

    const { mdxSource, frontMatter } = await mdxRenderer(mdxString)
    logger?.('mdxSource %O', { mdxSource })
    logger?.('frontMatter %O', { frontMatter })

    // Construct the githubFileUrl, used for "Edit this page" link
    const normalizedFilePath = navNode.filePath
      .split(path.sep)
      .join(path.posix.sep)
    logger?.('normalizedFilePath %O', { normalizedFilePath })

    const githubFileUrl = this.opts.githubFileUrl
      ? this.opts.githubFileUrl(normalizedFilePath)
      : `https://github.com/hashicorp/${this.opts.product}/blob/${this.opts.mainBranch}/website/${normalizedFilePath}`
    logger?.('githubFileUrl %O', { githubFileUrl })

    // Return all the props
    return {
      currentPath,
      frontMatter,
      githubFileUrl,
      mdxSource,
      navData,
      versions: [],
    }
  }
}
