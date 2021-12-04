import path from 'path'
import fs from 'fs'
import { GetStaticPropsContext } from 'next'
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
}

export default class FileSystemLoader implements DataLoader {
  constructor(public opts: FileSystemLoaderOpts) {
    if (!this.opts.paramId) this.opts.paramId = DEFAULT_PARAM_ID
    if (!this.opts.mainBranch) this.opts.mainBranch = 'main'
    if (!this.opts.scope) this.opts.scope = {}
    if (!this.opts.remarkPlugins) this.opts.remarkPlugins = []
  }

  loadStaticPaths = async (): Promise<$TSFixMe> => {
    const navData = await resolveNavData(
      this.opts.navDataFile,
      this.opts.localContentDir
    )
    return getPathsFromNavData(navData, this.opts.paramId)
  }

  loadStaticProps = async ({
    params,
  }: GetStaticPropsContext): Promise<$TSFixMe> => {
    const mdxRenderer = (mdx) =>
      renderPageMdx(mdx, {
        remarkPlugins: this.opts.remarkPlugins,
        scope: this.opts.scope,
        localPartialsDir: this.opts.localPartialsDir,
      })
    // Build the currentPath from page parameters
    const currentPath = params[this.opts.paramId]
      ? (params[this.opts.paramId] as string[]).join('/')
      : ''
    //  Read in the nav data, and resolve local filePaths
    const navData = await resolveNavData(
      this.opts.navDataFile,
      this.opts.localContentDir
    )
    //  Get the navNode that matches this path
    const navNode = getNodeFromPath(
      currentPath,
      navData,
      this.opts.localContentDir
    )
    //  Read in and process MDX content from the navNode's filePath
    const mdxFile = path.join(process.cwd(), navNode.filePath)
    const mdxString = await fs.promises.readFile(mdxFile, 'utf8')
    const { mdxSource, frontMatter } = await mdxRenderer(mdxString)

    // Construct the githubFileUrl, used for "Edit this page" link
    const normalizedFilePath = navNode.filePath
      .split(path.sep)
      .join(path.posix.sep)
    const githubFileUrl = `https://github.com/hashicorp/${this.opts.product}/blob/${this.opts.mainBranch}/website/${normalizedFilePath}`
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
