import { useEffect } from 'react'
import Content from '@hashicorp/react-content'
import DocsSidenav from '@hashicorp/react-docs-sidenav'
import HashiHead from '@hashicorp/react-head'
import Head from 'next/head'
import Link from 'next/link'
import hydrate from 'next-mdx-remote/hydrate'
import { SearchProvider } from '@hashicorp/react-search'
import SearchBar from './search-bar'
import generateComponents from './components'
import temporary_injectJumpToSection from './temporary_jump-to-section'

export default function DocsPage({
  product: { name, slug },
  subpath,
  order,
  mainBranch = 'main',
  showEditPage = true,
  additionalComponents,
  staticProps: { mdxSource, data, frontMatter, pagePath, filePath },
}) {
  // This component is written to work with next-mdx-remote -- here is hydrates the content
  const content = hydrate(mdxSource, {
    components: generateComponents(name, additionalComponents),
  })

  // TEMPORARY (https://app.asana.com/0/1100423001970639/1160656182754009)
  // activates the "jump to section" feature
  useEffect(() => {
    const node = document.querySelector('#inner')
    if (!node) return
    return temporary_injectJumpToSection(node)
  }, [content])

  return (
    <div id="p-docs">
      {/* render the page's data to the document head */}
      <HashiHead
        is={Head}
        title={`${frontMatter.page_title} | ${name} by HashiCorp`}
        description={frontMatter.description}
        siteName={`${name} by HashiCorp`}
      />
      {/* render the sidebar nav */}
      {/* TODO: we can probably remove several of these wrappers */}
      <div className="content-wrap g-container">
        <div id="sidebar" role="complementary">
          <div className="nav docs-nav">
            <DocsSidenav
              product={slug}
              Link={Link}
              category={subpath}
              currentPage={pagePath}
              data={data}
              order={order}
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
                {content}
              </>
            }
          />
        </div>
      </div>
      {/* if desired, show an "edit this page" link on the bottom right, linking to github */}
      {showEditPage && (
        <div id="edit-this-page" className="g-container">
          <a
            href={`https://github.com/hashicorp/${slug}/blob/${mainBranch}/website/content/${filePath}`}
          >
            <img src={require('./img/github-logo.svg')} alt="github logo" />
            <span>Edit this page</span>
          </a>
        </div>
      )}
    </div>
  )
}
