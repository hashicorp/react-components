import React, { useState, useMemo } from 'react'
import LinkWrap from '@hashicorp/react-link-wrap'
import MenuIcon from './menu-icon'
import ChevronIcon from './chevron-icon'
import fuzzysearch from 'fuzzysearch'

export default function DocsSidenav({
  data,
  order,
  currentPage,
  category,
  Link,
  product,
  disableFilter = false,
}) {
  const [open, setOpen] = useState(false)
  const [filterInput, setFilterInput] = useState('')

  // we memoize here as the page matching is a pure, expensive calculation that
  // does not need to re-run every render
  const allContent = useMemo(
    () => matchOrderToData(currentPage, order, calculatePath(data, category)),
    [order, data, category, currentPage]
  )
  const [content, setContent] = useState(allContent)

  // remove leading slash and base level "docs"/"api"/etc
  const currentPath = currentPage
    .split('/')
    .slice(1 + category.split('/').length)

  return (
    <div
      className={`g-docs-sidenav${open ? ' open' : ''}${
        product ? ` theme-${product}` : ''
      }`}
      data-testid="root"
    >
      <div
        className="toggle"
        onClick={() => setOpen(!open)}
        data-testid="mobile-menu"
      >
        <span>
          <MenuIcon /> Documentation Menu
        </span>
      </div>
      <ul className="nav docs-nav">
        <div className="mobile-close" onClick={() => setOpen(!open)}>
          &times;
        </div>
        {!disableFilter && (
          <input
            className="filter"
            placeholder="Filter..."
            onChange={filterInputChange.bind(
              null,
              setFilterInput,
              JSON.parse(JSON.stringify(allContent)), // deep clone
              setContent
            )}
            value={filterInput}
          />
        )}
        {renderNavTree({
          category,
          content,
          currentPath,
          currentPage,
          filterInput,
          Link,
        })}
      </ul>
    </div>
  )
}

// Filter nav items
function filterInputChange(setFilterInput, allContent, setContent, e) {
  setFilterInput(e.target.value)
  setContent(findContent(allContent, e.target.value.toLowerCase()))
}

function findContent(content, value) {
  // if there's no search value we short-circuit and return everything
  if (!value) return content

  return content.reduce((acc, item) => {
    // recurse on content, depth-first
    if (item.content) item.content = findContent(item.content, value)

    // here we check for conditions on a branch node
    // first, if a branch has children, that means at least one of the leaf nodes has
    // matched, so we push the branch so that the leaf is displayed
    const hasContent = item.content && item.content.length
    // second, we check to see if a branch's title matches against the query, if so we
    // push the branch because it matched directly
    const categoryTitleMatches =
      item.indexData &&
      fuzzysearch(value, item.indexData.page_title.toLowerCase())
    if (hasContent || categoryTitleMatches) {
      if (categoryTitleMatches) {
        item.matchedFilter = true
      }
      acc.push(item)
    }

    // now we check against content on leaf nodes
    if (item.page_title && fuzzysearch(value, item.page_title.toLowerCase())) {
      item.matchedFilter = true
      acc.push(item)
    }

    // and that's all!
    return acc
  }, [])
}

// Given a set of front matter data, adds a `path` variable formatted for correct links
function calculatePath(pageData, category) {
  return pageData.map((p) => ({
    ...p,
    path: p.__resourcePath
      .split('/')
      .slice(category.split('/').length)
      .join('/')
      .replace(/\.mdx$/, ''),
  }))
}

// Matches up user-defined navigation hierarcy with front matter from the correct pages.
//
// For context, the user-defined nav hierarchy is called "content" in this function, and
// the shape of its data is as such:
// [{
//   category: 'foo',
//   content: ['bar', 'baz']
// },
// '--------------',
// {
//   category: 'quux'
// }]
//
// The front matter data is structured as such:
// {
//   __resourcePath: '/docs/foo/bar.mdx',
//   path: 'foo/bar',
//   ...frontMatterObject
// }
function matchOrderToData(currentPage, order, pageData, stack = []) {
  // go through each item in the user-established order
  return order.map((item) => {
    if (typeof item === 'string') {
      // if a string like '-----' is given, we render a divider
      if (item.match(/^-+$/)) return item

      // if we have a string, that's a terminal page. we match it with
      // the provided page data and return the enhanced object
      const itemData = pageData.filter((page) => {
        // break down the full path and strip the html extension
        const pageDataPath = page.path.split('/')
        // copy the stack and push the item as the file path
        const contentPath = [...stack, item]
        // match them up!
        return pageDataPath.join('/') === contentPath.join('/')
      })[0]

      // If we don't have a match here, the user has defined a page that doesn't exist, so let's give them
      // a very clear error message on how to resolve this situation.
      if (!itemData) {
        const pageCategory = currentPage.split('/')[1]
        const missingPath = `${pageCategory}/${stack.join('/')}/${item}.mdx`
        const cat = `${stack.join('/')}`
        throw new Error(
          `The page "${item}" was not found within the category "${cat}". Please double-check to ensure that "${missingPath}" exists. If this page was never intended to exist, remove the key "${item}" from the category "${cat}" in "data/${pageCategory}-navigation.js"`
        )
      }

      return itemData
    } else if (item.title && item.href) {
      // this is the syntax for direct links, we can return them directly
      return item
    } else {
      // catch errors where direct links are formatted incorrectly
      if (item.title || item.href) {
        throw new Error(
          `Malformed direct sidebar link:\n\n ${JSON.stringify(
            item
          )}\n\nDirect links must have a "href" and a "title" property.`
        )
      }

      // this method mutates the object, which causes an error on subsequent renders,
      // so we clone it first.
      const _item = Object.assign({}, item)

      // keep track of all parent categories
      _item.stack = stack.concat(_item.category)

      // using a category without content is not allowed
      if (_item.category && !_item.content) {
        const topLevelCategory = currentPage.split('/')[1]
        throw new Error(
          `The item "${_item.stack.join(
            '/'
          )}" within "data/${topLevelCategory}-navigation.js" has a category but no content, indicating that there is a folder that contains only an "index.mdx" file, which is not allowed. To fix this, move and rename "pages/${topLevelCategory}/${
            _item.stack.join('/') + '/index.mdx'
          }" to "pages/${topLevelCategory}/${
            _item.stack.join('/') + '.mdx'
          }", then change the value from "{ category: '${
            _item.category
          }' }" to just "${item.category}"`
        )
      }

      // grab the index page, as it can contain data about the top level link
      pageData.some((page) => {
        const pageDataPath = page.path.split('/')

        const depthLevelsMatch = _item.stack.length === pageDataPath.length - 1
        const pathItemsMatch = _item.stack.every(
          (s, i) => s === pageDataPath[i]
        )
        const isIndexFile = pageDataPath[pageDataPath.length - 1] === 'index'

        if (depthLevelsMatch && pathItemsMatch && isIndexFile) {
          _item.indexData = page
          // now that we know its an index page, we can remove it from the path, as
          // its not necessary for links
          _item.indexData.path = _item.indexData.path.replace(/\/index$/, '')
          return true
        }
      })

      // error handling for nav nesting mistakes
      if (!_item.indexData && !_item.name) {
        throw new Error(
          `An index page or "name" property is required for all categories.\nIf you would like an index page for this category, please add an index file at the path "${_item.stack.join(
            '/'
          )}/index.mdx".\nIf you do not want an index page for this category, please add a "name" property to the category object to specify the category's human-readable title.\n\nItem:\n${JSON.stringify(
            _item,
            null,
            2
          )}`
        )
      }

      // using "name" and manually adding an "overview" page is silly. let's prevent that.
      if (_item.name && _item.content.includes('overview')) {
        throw new Error(`The category "${_item.stack.join(
          '/'
        )}" is using a "name" property to indicate that it has no index, but also has a manually added "overview" page. This can be fixed with the following steps:

- Change the "overview.mdx" page to be "index.mdx"
- Remove the "name" property from the "${
          _item.category
        }" data, instead indicate the category's name using the frontmatter on the new "index.mdx" page`)
      }

      // otherwise, it's a nested category. if the category has content, we
      // recurse, passing in that category's content, and the matching
      // subsection of page data from middleman
      if (_item.content) {
        _item.content = matchOrderToData(
          currentPage,
          _item.content,
          filterData(pageData, _item.category),
          _item.stack
        )
      }

      return _item
    }
  })
}

// Recursively renders the markup for the nested navigation
function renderNavTree({
  category,
  content,
  currentPath,
  currentPage,
  filterInput,
  Link,
}) {
  return content.map((item, idx) => {
    // dividers are the only items left as strings
    // This array is stable, so we can use index as key
    // eslint-disable-next-line react/no-array-index-key
    if (typeof item === 'string') return <hr key={idx} />

    // if the link property has been set to true, we're rendering a direct link
    // rather than a link to a docs page
    if (item.title && item.href) {
      let className = item.href.match(/^http[s]*:\/\//) ? 'external ' : ''
      // allow direct links to be highlighted if they happen to live in the docs hierarchy
      if (item.href === currentPage) className += 'active'

      return (
        <li
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          data-testid={item.href}
          className={className}
        >
          <LinkWrap
            Link={Link}
            href={item.href}
            dangerouslySetInnerHTML={{ __html: item.title }}
          />
        </li>
      )
    }

    if (item.path) {
      // if the item has a path, it's a leaf node so we render a link to the page
      let className = ''
      if (
        fileMatch(
          item.path.split('/').filter((x) => x),
          currentPath.filter((x) => x)
        )
      )
        className += 'active '
      if (item.matchedFilter) className += 'matched'

      return (
        <li
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={className}
          data-testid={`/${category}/${item.path}`}
        >
          <LinkWrap
            Link={Link}
            href={`/${category}/${item.path}`}
            dangerouslySetInnerHTML={{
              __html: item.sidebar_title || item.page_title,
            }}
          />
        </li>
      )
    } else {
      // if not, its an index page in a folder, so we render it as an expandable category
      // alternately its a folder with no index page, in which case we skip the "overview" link

      // here we search for the sidebar title. if the category has an index page, we look on this
      // first, preferring sidebar_title and falling back to page_title. next we look for name, which
      // is the standard for categories without index files, and all else failing, we use the raw
      // folder name itself
      const title = item.indexData
        ? item.indexData.sidebar_title || item.indexData.page_title
        : item.name || item.category

      // we need to know the path of the category/folder itself, which we can get from the stack
      const folderPath = item.stack.join('/')

      // now we test whether the current url is a match for the category and the page
      const categoryMatches = categoryMatch(folderPath.split('/'), currentPath)
      const fileMatches = fileMatch(
        folderPath.split('/').filter((x) => x),
        currentPath.filter((x) => x)
      )
        ? 'active'
        : ''
      const containsFilterMatches = findFilterMatches(item)

      let className = ''
      if (item.content) className += 'dir '
      if (categoryMatches) className += 'open active '
      if (containsFilterMatches) className += 'open '
      if (item.matchedFilter && !item.content) className += 'matched'

      // and finally, we can render the folder
      return (
        <li
          className={className}
          data-testid={`/${category}/${folderPath}`}
          // This array is stable, so we can use index as key
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
        >
          <span>
            {/* Note: this is rendered as a link, but with no href. We should test to see if */}
            {/* a button element would be more semantically appropriate for a11y. */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={item.content && toggleNav}
              data-testid={`/${category}/${folderPath} - link`}
            >
              {item.content ? (
                <>
                  <ChevronIcon />{' '}
                  {
                    <span
                      dangerouslySetInnerHTML={{
                        __html: title,
                      }}
                    ></span>
                  }
                </>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                ></span>
              )}
            </a>
          </span>

          {/* if the item has content, we need to recurse */}
          {item.content && (
            <ul className="nav" key={folderPath}>
              {!item.name && (!filterInput || item.matchedFilter) && (
                <li
                  className={`${fileMatches ? 'active ' : ''}${
                    item.matchedFilter ? 'matched' : ''
                  }`}
                  data-testid={`/${category}/${folderPath}/index`}
                >
                  {/* hide "overview" links if there's no overview (aka there is a name), or while searching */}

                  <LinkWrap Link={Link} href={`/${category}/${folderPath}`}>
                    Overview
                  </LinkWrap>
                </li>
              )}
              {renderNavTree({
                category,
                content: item.content,
                currentPath,
                filterInput,
                Link,
              })}
            </ul>
          )}
        </li>
      )
    }
  })
}

// Given a single item, returns whether it or any of its children have the
// `matchedFilter` property.
function findFilterMatches(item) {
  if (item.matchedFilter) return true
  return (
    item.content &&
    item.content.map((child) => findFilterMatches(child)).some((x) => x)
  )
}

// Given an array of pages, returns only pages whose paths contain the given category.
function filterData(data, category) {
  return data.filter((d) => d.path.split('/').indexOf(category) > -1)
}

// If the nav item category is entirely contained by the current page's path,
// this means we're inside that category and should mark it as open.
function categoryMatch(navItemPath, currentPath) {
  return navItemPath.every((item, i) => item === currentPath[i])
}

// If the current page's path exactly matches the passed in nav item's path,
// we have a match and can highlight the currently active page.
function fileMatch(navItemPath, currentPath) {
  if (currentPath.length !== navItemPath.length) return false
  return currentPath.every((item, i) => item === navItemPath[i])
}

// Opens and closes a given nav category, the easy way
function toggleNav(e) {
  e.preventDefault()
  e.currentTarget.parentElement.parentElement.classList.toggle('open')
}
