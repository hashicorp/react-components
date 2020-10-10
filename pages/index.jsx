import createPage from '@hashicorp/octavo/page'
import createStaticProps from '@hashicorp/octavo/getStaticProps'
import Head from 'next/head'
import Link from 'next/head'
import { SearchProvider } from '../packages/search'

const components = { Head, Link, SearchProvider }

// for search component
process.env.NEXT_PUBLIC_ALGOLIA_APP_ID = 'YY0FFNI7MF'
process.env.NEXT_PUBLIC_ALGOLIA_INDEX = 'product_NOMAD'
process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY =
  '5037da4824714676226913c65e961ca0'

export default createPage({ components })
export const getStaticProps = createStaticProps({ components })
