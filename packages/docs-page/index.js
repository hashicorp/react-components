import { useEffect } from 'react'
import Content from '@hashicorp/react-content'
import DocsSidenav from '@hashicorp/react-docs-sidenav'
import HashiHead from '@hashicorp/react-head'
import { MDXRemote } from 'next-mdx-remote'
import { SearchProvider } from '@hashicorp/react-search'
import SearchBar from './search-bar'
import generateComponents from './components'
import temporary_injectJumpToSection from './temporary_jump-to-section'

export function DocsPageWrapper({
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
}) {
  // TEMPORARY (https://app.asana.com/0/1100423001970639/1160656182754009)
  // activates the "jump to section" feature
  useEffect(() => {
    const node = document.querySelector('#inner')
    if (!node) return
    return temporary_injectJumpToSection(node)
  }, [children])

  return (
    <div id="p-docs">
      {/* render the page's data to the document head */}
      <HashiHead
        canonicalUrl={canonicalUrl}
        description={description}
        siteName={`${name} by HashiCorp`}
        title={`${pageTitle} | ${name} by HashiCorp`}
      />
      {/* render the sidebar nav */}
      {/* TODO: we can probably remove several of these wrappers */}
      <div className="content-wrap g-container">
        <div id="sidebar" role="complementary">
          <div className="nav docs-nav">
            <DocsSidenav
              product={slug}
              baseRoute={baseRoute}
              currentPath={currentPath}
              navData={navData}
            />
          </div>
        </div>
        {/* render the markdown content */}
        <div id="inner" role="main">
          <Content
            product={slug}
            content={
              <>
                <SearchProvider>
                  <SearchBar product={name} />
                </SearchProvider>
                {children}
              </>
            }
          />
        </div>
      </div>
      {/* if desired, show an "edit this page" link on the bottom right, linking to github */}
      {showEditPage && (
        <div id="edit-this-page" className="g-container">
          <a href={githubFileUrl}>
            <img src={require('./img/github-logo.svg')} alt="github logo" />
            <span>Edit this page</span>
          </a>
        </div>
      )}
    </div>
  )
}

export default function DocsPage({
  product,
  baseRoute,
  showEditPage = true,
  additionalComponents,
  staticProps: { mdxSource, frontMatter, currentPath, navData, githubFileUrl },
}) {
  // This component is written to work with next-mdx-remote -- here it hydrates the content
  const content = (
    <MDXRemote
      {...mdxSource}
      components={generateComponents(product.name, additionalComponents)}
    />
  )

  return (
    <DocsPageWrapper
      canonicalUrl={frontMatter.canonical_url}
      description={frontMatter.description}
      githubFileUrl={githubFileUrl}
      navData={navData}
      currentPath={currentPath}
      pageTitle={frontMatter.page_title}
      product={product}
      showEditPage={showEditPage}
      baseRoute={baseRoute}
    >
      {content}
    </DocsPageWrapper>
  )
}
