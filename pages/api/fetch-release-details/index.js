const NodeCache = require('node-cache')

//  Cache package.json requests for 5 minutes
const PKG_JSON_CACHE = new NodeCache({ stdTTL: 300 })

async function handler(req, res) {
  const { packageName } = req.body
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = await getReleaseUrls(packageName)
  res.json(data)
}

async function getReleaseUrls(packageName) {
  const { data, error } = await getRegistryData(packageName)
  if (error) return { error }
  // Sort stable versions in descending order
  const sortedVersions = Object.keys(data.versions)
    .sort(semverSort)
    .filter((v) => {
      const z = v.match(/(\d+)\.(\d+)\.(.+)$/)[3]
      const isStable = parseInt(z).toString() === z
      return isStable
    })
  // Group releases by major and minor versions
  const groupedReleases = sortedVersions.reduce((acc, version) => {
    const [x, y] = version.split('.')
    if (!acc[x]) acc[x] = { versionLabel: `${x}.0.0`, minorVersions: {} }
    if (!acc[x].minorVersions[y])
      acc[x].minorVersions[y] = {
        versionLabel: `${x}.${y}.0`,
        patchVersions: [],
      }
    acc[x].minorVersions[y].patchVersions.push(version)
    return acc
  }, {})
  return { sortedVersions, groupedReleases }
}

async function getRegistryData(packageName) {
  const registryUrl = `http://registry.npmjs.org/${packageName}`
  //  Return cached data if we have it
  const cachedData = PKG_JSON_CACHE.get(registryUrl)
  if (cachedData) return { data: cachedData }
  // Otherwise, refetch...
  try {
    const response = await fetch(registryUrl)
    const responseData = await response.json()
    //  Update our cache
    PKG_JSON_CACHE.set(registryUrl, responseData)
    return { data: responseData }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

function semverSort(a, b, descending = false) {
  const aBeforeB = -1
  const bBeforeA = 1
  const whenAIsLatest = descending ? aBeforeB : bBeforeA
  const whenBIsLatest = descending ? bBeforeA : aBeforeB
  const [ax, ay, az] = a.match(/(\d+)\.(\d+)\.(.+)$/).slice(1)
  const [bx, by, bz] = b.match(/(\d+)\.(\d+)\.(.+)$/).slice(1)
  return ax > bx
    ? whenAIsLatest
    : ax < bx
    ? whenBIsLatest
    : ay > by
    ? whenAIsLatest
    : ay < by
    ? whenBIsLatest
    : az > bz
    ? whenAIsLatest
    : az < bz
    ? whenBIsLatest
    : 0
}

export default handler
