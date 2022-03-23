import { GetStaticPaths, GetStaticProps, GetStaticPathsResult } from 'next'
import debug from 'debug'

import { ContentApiError } from '../content-api'
import FileSystemLoader from './loaders/file-system'
import RemoteContentLoader from './loaders/remote-content'
import { DataLoader } from './loaders/types'

// We currently export most utilities individually,
// since we have cases such as Packer remote plugin docs
// where we want to re-use these utilities to build
// getStaticPaths and getStaticProps functions that
// fall outside the use case of local-only content
export { getNodeFromPath } from './get-node-from-path'
export { getPathsFromNavData } from './get-paths-from-nav-data'
export { validateNavData } from './validate-nav-data'
export { validateFilePaths } from '@hashicorp/react-docs-sidenav/utils/validate-file-paths'

const log = debug('@hashicorp/react-docs-page')

interface BaseOpts {
  fallback?: GetStaticPathsResult['fallback']
  revalidate?: number
  product: string
  scope?: Record<string, $TSFixMe>
}

export function getStaticGenerationFunctions(
  opts:
    | ({
        basePath: string
        strategy: 'remote'
      } & BaseOpts)
    | ({
        localContentDir: string
        navDataFile: string
        strategy: 'fs'
        /** Optional location of the partials directory
         * relative to process.cwd().
         * Passed to our resolveIncludes plugin.
         * Defaults to "content/partials". */
        localPartialsDir?: string
      } & BaseOpts)
): {
  getStaticPaths: GetStaticPaths
  getStaticProps: GetStaticProps
} {
  const logger = log.extend('getStaticGenerationFunctions')
  logger(`opts %O`, opts)

  let loader: DataLoader

  switch (opts.strategy) {
    default:
    case 'fs': {
      logger("Using 'fs' loader")
      const { strategy, ...restOpts } = opts
      loader = new FileSystemLoader({ ...restOpts }, logger)
      break
    }
    case 'remote': {
      logger("Using 'remote' loader")
      const { strategy, ...restOpts } = opts
      loader = new RemoteContentLoader({ ...restOpts }, logger)
    }
  }

  return {
    getStaticPaths: async (ctx) => {
      const pathslogger = log.extend('getStaticPaths')
      pathslogger(`ctx %O`, ctx)
      const paths = await loader.loadStaticPaths(ctx)
      const result = {
        fallback: opts.fallback ?? 'blocking',
        paths,
      }
      pathslogger(`result %O`, result)
      return result
    },
    getStaticProps: async (ctx) => {
      const propslogger = log.extend('getStaticProps')
      propslogger(`ctx %O`, ctx)
      try {
        const props = await loader.loadStaticProps(ctx)
        const result = {
          props,
          revalidate: opts.revalidate,
        }
        propslogger(`result %O`, result)
        return result
      } catch (err) {
        propslogger('error %O', err)
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
    logger: log,
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
