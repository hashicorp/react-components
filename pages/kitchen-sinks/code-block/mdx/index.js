import React from 'react'
import MarkdownPage from '../../../../packages/markdown-page'
import CodeTabsProvider from '../../../../packages/code-block/provider'
import CodeBlock from '../../../../packages/code-block'
import codeBlockPrimitives from '../../../../packages/code-block/mdx'
import Head from '../../../../packages/head'
import Link from 'next/link'
import s from './style.module.css'
// Imports below are used server-side only
import generateGetStaticProps from '../../../../__temp-code-block/markdown-page-server'
import rehypeFixCodeTokenNewlines from '@hashicorp/nextjs-scripts/prism/rehype-surface-code-newlines'

const { code, CodeBlockConfig, CodeTabs, pre } = codeBlockPrimitives({
  theme: 'dark',
})

// Set content
const CONTENT_PATH = 'pages/kitchen-sinks/code-block/mdx/content.mdx'

const components = {
  code,
  CodeBlock,
  CodeBlockConfig,
  CodeTabs,
  Head,
  Link,
  pre,
}

function MdxPage({ staticProps }) {
  return (
    <CodeTabsProvider>
      <div className={s.root}>
        <MarkdownPage staticProps={staticProps} components={components} />
      </div>
    </CodeTabsProvider>
  )
}

export async function getStaticProps() {
  const generatedFunction = generateGetStaticProps({
    pagePath: CONTENT_PATH,
    components,
    addRehypePlugins: [rehypeFixCodeTokenNewlines],
  })
  return await generatedFunction()
}

export default MdxPage
