const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN

async function handler(req, res) {
  const { packageName, repo, dir } = JSON.parse(req.query.json)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = await getProjectUse(packageName, repo, dir)
  res.json(data)
}

async function getProjectUse(packageName, repo, dir = '') {
  const { data, error } = await getPackageJson(repo, dir)
  if (error) return { error }
  return { versionUsed: data.dependencies[packageName] }
}

async function getPackageJson(repo, projectDir = '') {
  const filepath = `${projectDir}/package.json`
  const url = `https://api.github.com/repos/${repo}/contents${filepath}`
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
    return { data: JSON.parse(fileString) }
  } catch (error) {
    return { error }
  }
}

function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('utf8')
}

export default handler
