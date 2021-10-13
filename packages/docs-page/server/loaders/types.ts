import { GetStaticPathsContext, GetStaticPropsContext } from 'next'

export interface DataLoader {
  opts: DataLoaderOpts
  loadStaticPaths(ctx?: GetStaticPathsContext): Promise<$TSFixMe>
  loadStaticProps(ctx?: GetStaticPropsContext): Promise<$TSFixMe>
}

export interface DataLoaderOpts {
  product: string
  paramId?: string
}
