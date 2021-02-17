require('dotenv').config()

const algoliasearch = require('algoliasearch')
const glob = require('glob')
const matter = require('gray-matter')
const path = require('path')
const remark = require('remark')
const visit = require('unist-util-visit')

const projectRoot = process.cwd()

async function indexDocsContent({
  algoliaConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
    apiKey: process.env.ALGOLIA_API_KEY,
  },
  contentDir = path.join(projectRoot, 'content'),
  filesPattern = '**/*.mdx',
  globOptions = { ignore: path.join(projectRoot, 'content', 'partials/**/*') },
  frontmatterKeys = ['page_title', 'description'],
} = {}) {
  const searchObjects = await getDocsSearchObjects({
    contentDir,
    filesPattern,
    globOptions,
    frontmatterKeys,
  })
  try {
    await indexSearchContent({ algoliaConfig, searchObjects })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

/**
 * @typedef {Object} AlgoliaConfig - Algolia config object
 * @property {String} [AlgoliaConfig.apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY] - Algolia API key
 * @property {String} [AlgoliaConfig.appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID] - Algolia app id
 * @property {String} [AlgoliaConfig.index = process.env.NEXT_PUBLIC_ALGOLIA_INDEX] - Algolia index
 * @typedef {{ objectID: String }} SearchObject - Algolia index item
 * @param {Object} indexContentOptions
 * @param {AlgoliaConfig} indexContentOptions.algoliaConfig - Algolia config
 * @param {() => Promise<SearchObject[]>} indexContentOptions.getSearchObjects - function that returns objects to index
 * @param {Object} [indexContentOptions.settings] - configurable search settings https://www.algolia.com/doc/api-reference/settings-api-parameters/
 */
async function indexContent({
  algoliaConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    index: process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
    apiKey: process.env.ALGOLIA_API_KEY,
  },
  getSearchObjects,
  settings,
}) {
  if (!getSearchObjects || typeof getSearchObjects !== 'function') {
    throw new Error(
      "Please provide a `getSearchObjects` property and ensure it's a function"
    )
  }
  const searchObjects = await getSearchObjects()
  try {
    await indexSearchContent({ algoliaConfig, searchObjects, settings })
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function getDocsSearchObjects({
  contentDir,
  filesPattern,
  globOptions,
  frontmatterKeys,
}) {
  const globPattern = path.join(contentDir, filesPattern)
  const files = await glob.sync(globPattern, globOptions)

  return await Promise.all(
    files.map(async (fullPath) => {
      const { content, data } = matter.read(fullPath)

      const searchableDimensions = frontmatterKeys.reduce((acc, key) => {
        return { ...acc, [key]: data[key] }
      }, {})

      const headings = await collectHeadings(content)

      // Get path relative to `contentDir`
      const __resourcePath = fullPath.replace(`${contentDir}/`, '')
      // Use clean URL for Algolia id
      const objectID = __resourcePath.replace('.mdx', '')

      return {
        ...searchableDimensions,
        headings,
        objectID,
      }
    })
  )
}

/**
 * Uploads objects to index and removes stale objects not present in `searchObjects`
 * @param {Object} indexSearchContentOptions
 * @param {AlgoliaConfig} indexSearchContentOptions.algoliaConfig - Algolia config
 * @param {SearchObject[]} indexSearchContentOptions.searchObjects - array of objects to index
 * @param {Object} [indexSearchContentOptions.settings] - configurable search settings https://www.algolia.com/doc/api-reference/settings-api-parameters/
 * @return {Promise<void>}
 */
async function indexSearchContent({ algoliaConfig, searchObjects, settings }) {
  const { apiKey, appId, index } = algoliaConfig

  if (!apiKey || !appId || !index) {
    throw new Error(
      `[*** Algolia Search Indexing Error ***] Received: apiKey=${apiKey} appId=${appId} index=${index} \n Please ensure all Algolia Search-related vars are set in CI settings.`
    )
  }

  console.log(`Updating ${searchObjects.length} objects...`)

  const searchClient = algoliasearch(appId, apiKey)
  const searchIndex = searchClient.initIndex(index)

  const { objectIDs } = await searchIndex.saveObjects(searchObjects)

  if (settings) {
    console.log(`Updating settings: ${Object.keys(settings)} `)

    await searchIndex.setSettings(settings)
  }

  let staleIds = []

  await searchIndex.browseObjects({
    query: '',
    batch: (batch) => {
      staleIds = staleIds.concat(
        batch
          .filter(({ objectID }) => !objectIDs.includes(objectID))
          .map(({ objectID }) => objectID)
      )
    },
  })

  if (staleIds.length > 0) {
    console.log(`Deleting ${staleIds.length} stale objects:`)
    console.log(staleIds)

    await searchIndex.deleteObjects(staleIds)
  }

  console.log('Done!')
}

async function collectHeadings(mdxContent) {
  const headings = []

  const headingMapper = () => (tree) => {
    visit(tree, 'heading', (node) => {
      const title = node.children.reduce((m, n) => {
        if (n.value) m += n.value
        return m
      }, '')
      // Only include level 1 or level 2 headings
      if (node.depth < 3) {
        headings.push(title)
      }
    })
  }

  return remark()
    .use(headingMapper)
    .process(mdxContent)
    .then(() => headings)
}

module.exports = {
  indexDocsContent,
  indexContent,
}
