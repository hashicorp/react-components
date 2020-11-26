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
    const fileString = decodeBase64(data.content)
    return { data: JSON.parse(fileString) }
  } catch (error) {
    return { error }
  }
}

function decodeBase64(str) {
  return typeof window === 'undefined'
    ? Buffer.from(str, 'base64').toString('utf8')
    : window.atob(str)
}

export default handler
