import { GetStaticPaths, GetStaticProps, GetStaticPathsResult } from 'next'
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

interface BaseOpts {
  fallback?: GetStaticPathsResult['fallback']
  revalidate?: number
  product: string
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
      } & BaseOpts)
): {
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

      loader = new RemoteContentLoader({
        ...restOpts,
      })
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
      const props = await loader.loadStaticProps(ctx)
      return {
        props,
        revalidate: opts.revalidate,
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
  product?: { name: string; slug: string }
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
}: GenerateStaticPropsContext) {
  const loader = new FileSystemLoader({
    navDataFile,
    localContentDir,
    product: product.slug,
    paramId,
  })

  return loader.loadStaticProps({ params, remarkPlugins, scope, mainBranch })
}
