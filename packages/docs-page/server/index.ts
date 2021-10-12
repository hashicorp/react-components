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
        basePath?: string
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
        // derive basePath from __dirname, example: .next/server/pages/waypoint/docs
        basePath: __dirname.split('/').slice(-1)[0],
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
