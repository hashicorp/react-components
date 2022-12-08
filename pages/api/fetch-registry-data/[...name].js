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
    // If status is not 200, throw an error
    if (response.status !== 200) {
      throw new Error(
        `registry.npmjs.org responded with a status code of "${response.status}". This package may not be published; or there may be some other issue with the npm registry; or this may be an issue with our fetchRegistryData API route.`
      )
    }
    const responseData = await response.json()
    //  Update our cache
    PKG_JSON_CACHE.set(registryUrl, responseData)
    return [null, responseData]
  } catch (error) {
    console.error(error)
    return [error.toString(), null]
  }
}

export default handler
