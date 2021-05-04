const NodeCache = require('node-cache')

//  Cache package.json requests for 5 minutes
const PKG_JSON_CACHE = new NodeCache({ stdTTL: 300 })

async function handler(req, res) {
  const packageName = req.query.name.join('/')
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const [error, data] = await fetchRegistryData(packageName)
  res.json([error, data])
}

async function fetchRegistryData(packageName) {
  const registryUrl = `http://registry.npmjs.org/${packageName}`
  //  Return cached data if we have it
  const cachedData = PKG_JSON_CACHE.get(registryUrl)
  if (cachedData) return [null, cachedData]
  // Otherwise, refetch
  try {
    const response = await fetch(registryUrl)
    const responseData = await response.json()
    //  Update our cache
    PKG_JSON_CACHE.set(registryUrl, responseData)
    return [null, responseData]
  } catch (error) {
    console.error(error)
    return [error, null]
  }
}

export default handler
