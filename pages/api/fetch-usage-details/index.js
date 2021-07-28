const NodeCache = require('node-cache')
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN

//  Cache package.json requests for 5 minutes
const PKG_JSON_CACHE = new NodeCache({ stdTTL: 300 })

async function handler(req, res) {
  const { packageName, repo, dir } = req.body
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = await getProjectUse(packageName, repo, dir)
  res.json(data)
}

async function getProjectUse(packageName, repo, dir = '') {
  const { data, error } = await getPackageJson(repo, dir)
  if (error) return { error }
  if (!data.dependencies) {
    const err = `Repo ${repo} seems to have a valid package.json${
      dir ? `(in ${dir})` : ''
    }, but does not seem to have an dependencies listed.`
    console.error(err)
    return { error: err }
  }
  return { versionUsed: data.dependencies[packageName] }
}

async function getPackageJson(repo, projectDir = '') {
  const filepath = `${projectDir}/package.json`
  const url = `https://api.github.com/repos/${repo}/contents${filepath}`
  //  Return cached data if we have it
  const cachedData = PKG_JSON_CACHE.get(url)
  if (cachedData) return { data: cachedData }
  //  Otherwise, re-fetch the data...
  const headers = { Authorization: `token ${GITHUB_API_TOKEN}` }
  try {
    const response = await fetch(url, { headers })
    const data = await response.json()
    // GitHub sends back a 200, but with { message }
    // for things like "Bad credentials". We want to
    // catch that so that we don't always get the
    // same decodeBase64() error from undefined content
    if (!data.content) return { error: data }
    const fileString = decodeBase64(data.content)
    const packageJson = JSON.parse(fileString)
    //  Update our cache
    PKG_JSON_CACHE.set(url, packageJson)
    return { data: packageJson }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('utf8')
}

export default handler
