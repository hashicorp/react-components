import { useEffect, FunctionComponent, ReactElement } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Content from '@hashicorp/react-content'
import DocsSidenav from '@hashicorp/react-docs-sidenav'
import { NavData } from '@hashicorp/react-docs-sidenav/types'
import HashiHead from '@hashicorp/react-head'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { SearchProvider } from '@hashicorp/react-search'
import { AlgoliaConfigObject } from '@hashicorp/react-search/types'
import type { Products } from '@hashicorp/platform-product-meta'

import VersionSelect from '@hashicorp/react-version-select'
import { getVersionFromPath } from '@hashicorp/react-version-select/util'
import CodeTabsProvider from '@hashicorp/react-code-block/provider'
import { MDXProviderComponentsProp } from '@mdx-js/react'

import SearchBar from './components/search-bar'
import VersionAlert from './components/version-alert'
import generateComponents from './components'
import temporary_injectJumpToSection from './temporary_jump-to-section'
import LoadingSkeleton from './components/loading-skeleton'
import useIsMobile from './use-is-mobile'
import s from './style.module.css'
import type { VersionSelectItem } from './server/loaders/remote-content'

interface DocsPageInnerProps {
  canonicalUrl: string | null
  description: string
  navData: NavData
  currentPath: string
  pageTitle: string
  baseRoute: string
  githubFileUrl: string
  product: { name: string; slug: Products }
  /** @deprecated */
  showEditPage: boolean
  showVersionSelect: boolean
  versions: VersionSelectItem[]
  algoliaConfig?: AlgoliaConfigObject
  optInBanner?: ReactElement
}

export const DocsPageInner: FunctionComponent<DocsPageInnerProps> = ({
  canonicalUrl,
  children,
  description,
  navData,
  currentPath,
  pageTitle,
  baseRoute,
  githubFileUrl,
  product: { name, slug },
  showEditPage = true,
  showVersionSelect,
  versions,
  algoliaConfig,
  optInBanner,
}) => {
  const isMobile = useIsMobile()
  const { asPath } = useRouter()
  const versionInPath = getVersionFromPath(asPath)

  // Future: Account for `tip` version
  const versionIsLatest =
    versionInPath &&
    versions?.find((v) => v.isLatest)?.version === versionInPath

  // TEMPORARY (https://app.asana.com/0/1100423001970639/1160656182754009)
  // activates the "jump to section" feature
  useEffect(() => {
    const node = document.querySelector('#inner')
    if (!node) return
    return temporary_injectJumpToSection(node)
  }, [children])

  const search = (
    <SearchProvider algoliaConfig={algoliaConfig}>
      <SearchBar
        product={name}
        className={classNames({ [s.mobileSearch]: isMobile })}
      />
    </SearchProvider>
  )

  const versionSelect = showVersionSelect ? (
    <div className={s.versionSelect}>
      <VersionSelect versions={versions} basePath={baseRoute} />
    </div>
  ) : null

  const versionAlert =
    !versionIsLatest && showVersionSelect ? (
      <VersionAlert product={name} />
    ) : null

  return (
    <div id="p-docs">
      {/* render the page's data to the document head */}
      <HashiHead
        canonicalUrl={canonicalUrl ?? undefined}
        description={description}
        siteName={`${name} by HashiCorp`}
        title={`${pageTitle} | ${name} by HashiCorp`}
      />
      {showVersionSelect && versionInPath ? (
        <Head>
          <meta name="robots" content="noindex" key="robots" />
        </Head>
      ) : null}
      {/* render the sidebar nav */}
      {/* TODO: we can probably remove several of these wrappers */}
      <div className={s.contentWrap}>
        {isMobile ? null : versionAlert}
        <div id="sidebar" role="complementary">
          <div className="nav docs-nav">
            <DocsSidenav
              product={slug}
              baseRoute={baseRoute}
              currentPath={currentPath}
              navData={navData}
              versionSelect={versionSelect}
              search={search}
            />
          </div>
        </div>
        {isMobile ? versionAlert : null}
        {/* render the markdown content */}
        <div
          id="inner"
          role="main"
          className={classNames(s.inner, s.tempJumpToSectionParent, {
            [s.versionedDocsOffset]:
              process.env.ENABLE_VERSIONED_DOCS === 'true',
          })}
        >
          <CodeTabsProvider>
            <Content
              className="g-content" // used in temporary_injectJumpToSection
              product={slug}
              content={
                <>
                  {optInBanner ? optInBanner : null}
                  {isMobile ? null : search}
                  {children}
                </>
              }
            />
          </CodeTabsProvider>
        </div>
      </div>
      {/* if desired, show an "edit this page" link on the bottom right, linking to github */}
      {showEditPage && githubFileUrl && (
        <div className={s.editThisPage}>
          <a href={githubFileUrl}>
            <img src={require('./img/github-logo.svg')} alt="github logo" />
            <span>Edit this page</span>
          </a>
        </div>
      )}
    </div>
  )
}

export interface DocsPageProps {
  product: { name: string; slug: Products }
  baseRoute: string
  showEditPage?: boolean
  showVersionSelect?: boolean
  additionalComponents?: MDXProviderComponentsProp
  algoliaConfig?: AlgoliaConfigObject
  staticProps: {
    mdxSource: MDXRemoteSerializeResult
    frontMatter: {
      canonical_url: string | null
      description: string
      page_title: string
    }
    currentPath: string
    navData: NavData
    githubFileUrl: string
    versions: VersionSelectItem[]
  }
  optInBanner?: ReactElement
}

export default function DocsPage({
  product,
  baseRoute,
  showEditPage = true,
  showVersionSelect = process.env.ENABLE_VERSIONED_DOCS?.toString() === 'true',
  additionalComponents,
  algoliaConfig,
  staticProps: {
    mdxSource,
    frontMatter,
    currentPath,
    navData,
    githubFileUrl,
    versions,
  },
  optInBanner,
}: DocsPageProps): ReactElement {
  const router = useRouter()

  // This component is written to work with next-mdx-remote -- here it hydrates the content
  const content = (
    <MDXRemote
      {...mdxSource}
      components={generateComponents(product.name, additionalComponents)}
    />
  )

  if (router.isFallback) return <LoadingSkeleton />

  return (
    <DocsPageInner
      canonicalUrl={frontMatter.canonical_url}
      description={frontMatter.description}
      githubFileUrl={githubFileUrl}
      navData={navData}
      currentPath={currentPath}
      pageTitle={frontMatter.page_title}
      product={product}
      showEditPage={showEditPage}
      showVersionSelect={showVersionSelect}
      baseRoute={baseRoute}
      versions={versions}
      algoliaConfig={algoliaConfig}
      optInBanner={optInBanner}
    >
      {content}
    </DocsPageInner>
  )
}
