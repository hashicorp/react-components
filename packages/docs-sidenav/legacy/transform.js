// Transform the legacy data structure provided to this component into the
// updated format that is used throughout the implementation.
// The majority of this code was previously contained within the component
// itself.
export function transformLegacyDataToRoutes(
  category,
  currentPage,
  order,
  data
) {
  const legacyContent = matchOrderToData(
    currentPage,
    order,
    calculatePath(data, category)
  )
  return legacyContentToRoutes(legacyContent, category)
}

// Given a set of front matter data, adds a `path` variable formatted for correct links
function calculatePath(pageData, category) {
  return pageData.map((p) => {
    p.path = p.__resourcePath
      .split('/')
      .slice(category.split('/').length)
      .join('/')
      .replace(/\.mdx$/, '')
    return p
  })
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

// Given an array of pages, returns only pages whose paths contain the given category.
function filterData(data, category) {
  return data.filter((d) => d.path.split('/').indexOf(category) > -1)
}

function legacyContentToRoutes(legacyContent, category) {
  return legacyContent.map((contentBlock) => {
    if (typeof contentBlock === 'string') {
      return {
        divider: true,
      }
    }

    if (contentBlock.content) {
      if (!contentBlock.indexData) {
        return {
          title: contentBlock.name,
          routes: legacyContentToRoutes(contentBlock.content, category),
        }
      }
      return {
        title:
          contentBlock.indexData.sidebar_title ||
          contentBlock.indexData.page_title,
        routes: [
          {
            //TODO: might need to check if a name is used, and use that instead of Overview
            title: 'Overview',
            path: resourcePathToContentPath(
              contentBlock.indexData.__resourcePath,
              category
            ),
          },
          ...legacyContentToRoutes(contentBlock.content, category),
        ],
      }
    }

    if (contentBlock.href) {
      if (contentBlock.href.startsWith(`/${category}/`)) {
        // This is actually a link to a versioned page, but it is not the
        // canonical page, and should not ever be active in the sidenav
        return {
          title: contentBlock.title,
          path: contentBlock.href.replace(`/${category}/`, ''),
          canonical: false,
        }
      }

      return {
        title: contentBlock.title,
        href: contentBlock.href,
      }
    }

    return {
      title: contentBlock.sidebar_title || contentBlock.page_title,
      path: resourcePathToContentPath(contentBlock.__resourcePath, category),
    }
  })
}

function resourcePathToContentPath(resourcePath, category) {
  return resourcePath
    .replace(`${category}/`, '')
    .replace(/\/index\.mdx$/, '')
    .replace(/\.mdx$/, '')
}
