import createPage from 'swingset/page'
import createStaticProps from 'swingset/getStaticProps'
import Head from 'next/head'
import Link from 'next/head'
import { SearchProvider } from '../packages/search'
import UsageDetails from '../swingset-extensions/usage-details'

const components = { Head, Link, SearchProvider, UsageDetails }

// for search component
process.env.NEXT_PUBLIC_ALGOLIA_APP_ID = 'YY0FFNI7MF'
process.env.NEXT_PUBLIC_ALGOLIA_INDEX = 'product_NOMAD'
process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY =
  '5037da4824714676226913c65e961ca0'

export default createPage({ components })
export const getStaticProps = createStaticProps({ components })
