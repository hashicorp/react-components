import createPage from '@hashicorp/octavo/page'
import createStaticProps from '@hashicorp/octavo/getStaticProps'
import Head from 'next/head'
import Link from 'next/head'

const components = { Head, Link }

export default createPage({ components })
export const getStaticProps = createStaticProps({ components })
