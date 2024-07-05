/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { GetStaticPaths, GetStaticProps, GetStaticPathsResult } from 'next'
import { ContentApiError } from '../content-api'
import FileSystemLoader, { FileSystemLoaderOpts } from './loaders/file-system'
import RemoteContentLoader, {
  RemoteContentLoaderOpts,
} from './loaders/remote-content'
import { DataLoader } from './loaders/types'

// We currently export most utilities individually,
// since we have cases such as Packer remote plugin docs
// where we want to re-use these utilities to build
// getStaticPaths and getStaticProps functions that
// fall outside the use case of local-only content
export { getNodeFromPath } from './get-node-from-path'
export { getPathsFromNavData } from './get-paths-from-nav-data'
export { validateNavData } from './validate-nav-data'
export { default as validateFilePaths } from '@hashicorp/react-docs-sidenav/utils/validate-file-paths'

/**
 * Shared config fields for both the `remote` and `fs` strategies.
 * - See {@link RemoteOptions} & {@link FsOptions} for more details.
 */
export interface BaseOpts {
  fallback?: GetStaticPathsResult['fallback']
  revalidate?: number | boolean
  product: string
  scope?: Record<string, $TSFixMe>
}

/**
 * Config object that is passed to {@link getStaticGenerationFunctions}
 * when using the `remote` strategy
 */
export type RemoteOptions = {
  basePath: string
  strategy: 'remote'
} & BaseOpts &
  Partial<RemoteContentLoaderOpts>

/**
 * Config object that is passed to {@link getStaticGenerationFunctions}
 * when using the `fs` strategy
 */
export type FsOptions = {
  localContentDir: string
  navDataFile: string
  strategy: 'fs'
  /** Optional location of the partials directory
   * relative to process.cwd().
   * Passed to our resolveIncludes plugin.
   * Defaults to "content/partials". */
  localPartialsDir?: string
} & BaseOpts &
  Partial<FileSystemLoaderOpts>

/**
 *
 * @usage
 *
 * ```typescript
 * declare const remoteOpts: RemoteOptions
 * declare const fsOpts: FsOptions
 *
 * declare const useFs: boolean
 *
 * const { getStaticPaths, getStaticProps } = getStaticGenerationFunctions(
 *   useFs ? fsOpts : remoteOpts
 * )
 *
 * export { getStaticPaths, getStaticProps }
 * ```
 */
export function getStaticGenerationFunctions(opts: RemoteOptions | FsOptions): {
  getStaticPaths: GetStaticPaths
  getStaticProps: GetStaticProps
} {
  let loader: DataLoader

  switch (opts.strategy) {
    default:
    case 'fs': {
      const { strategy, ...restOpts } = opts
      loader = new FileSystemLoader({ ...restOpts })
      break
    }
    case 'remote': {
      const { strategy, ...restOpts } = opts
      loader = new RemoteContentLoader({ ...restOpts })
    }
  }

  return {
    getStaticPaths: async (ctx) => {
      const paths = await loader.loadStaticPaths(ctx)
      return {
        fallback: opts.fallback ?? 'blocking',
        paths,
      }
    },
    getStaticProps: async (ctx) => {
      try {
        const props = await loader.loadStaticProps(ctx)
        return {
          props,
          revalidate: opts.revalidate,
        }
      } catch (err) {
        console.error(`Failed to generate static props:`, err)

        if (err instanceof ContentApiError) {
          if (err.status === 404) {
            return {
              notFound: true,
            }
          }
        }
        throw err
      }
    },
  }
}

export interface GenerateStaticPathsContext {
  /** @example 'data/docs-nav-data.json' */
  navDataFile: string
  /** @example 'content/docs' */
  localContentDir: string
  /**
   * @default 'page'
   */
  paramId?: string
  /**
   * @example { name: 'Waypoint', slug: 'waypoint' }
   */
  product: { name: string; slug: string }
  /** @example 'docs' */
  basePath?: string
}

/**
 * @deprecated Use getStaticGenerationFunctions instead
 */
export function generateStaticPaths({
  navDataFile,
  localContentDir,
  paramId,
  product,
  basePath,
}: GenerateStaticPathsContext) {
  const loader = new FileSystemLoader({
    navDataFile,
    localContentDir,
    product: product.slug,
    paramId,
  })

  return loader.loadStaticPaths()
}

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
  githubFileUrl?: (path: string) => string
}

/**
 * @deprecated Use getStaticGenerationFunctions instead
 */
export function generateStaticProps({
  navDataFile,
  localContentDir,
  paramId,
  product,
  params,
  remarkPlugins,
  scope,
  mainBranch,
  githubFileUrl,
}: GenerateStaticPropsContext) {
  const loader = new FileSystemLoader({
    navDataFile,
    localContentDir,
    product: product.slug,
    paramId,
    scope,
    remarkPlugins,
    mainBranch,
    githubFileUrl,
  })

  return loader.loadStaticProps({ params })
}
