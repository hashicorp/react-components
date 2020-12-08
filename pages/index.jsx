import createPage from 'swingset/page'
import createStaticProps from 'swingset/getStaticProps'
import Head from 'next/head'
import Link from 'next/head'
import { SearchProvider } from '../packages/search'
import UsageDetails from '../swingset-extensions/usage-details'

const components = { Head, Link, SearchProvider, UsageDetails }

export default createPage({ components })
export const getStaticProps = createStaticProps({ components })
