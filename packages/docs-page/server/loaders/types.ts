import { GetStaticPathsContext, GetStaticPropsContext } from 'next'
import { Debugger } from 'debug'

export interface DataLoader {
  opts: DataLoaderOpts
  debug?: Debugger
  loadStaticPaths(ctx?: GetStaticPathsContext): Promise<$TSFixMe>
  loadStaticProps(ctx?: GetStaticPropsContext): Promise<$TSFixMe>
}

export interface DataLoaderOpts {
  product: string
  paramId?: string
}
