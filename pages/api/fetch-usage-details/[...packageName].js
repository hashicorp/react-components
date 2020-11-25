function decodeBase64(str) {
  return typeof window === 'undefined'
    ? Buffer.from(str, 'base64').toString('utf8')
    : window.atob(str)
}

const { GITHUB_API_TOKEN } = process.env
// const GITHUB_API_TOKEN = '4e876b9ea0551b8aa42d05a993e4e578bf913da1'

async function getPackageJson(filePathInRepo) {
  const url = `https://api.github.com/repos/${filePathInRepo}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `token ${GITHUB_API_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const data = await response.json()
  const fileString = decodeBase64(data.content)
  return JSON.parse(fileString)
}

async function getUsage(packageName, fileList) {
  const usage = []
  for (var i = 0; i < fileList.length; i++) {
    const { repo, path } = fileList[i]
    const packageJson = await getPackageJson(`${repo}/contents${path}`)
    const { dependencies } = packageJson
    const versionUsed = dependencies[packageName]
    if (versionUsed) {
      usage.push({
        repo,
        url: `https://www.github.com/${repo}`,
        versionUsed,
      })
    }
  }
  return usage
}

const packageJsonList = [
  {
    repo: 'hashicorp/terraform-website-next',
    path: '/package.json',
  },
  {
    repo: 'hashicorp/learn',
    path: '/package.json',
  },
  {
    repo: 'hashicorp/hashicorp-www-next',
    path: '/package.json',
  },
  {
    repo: 'hashicorp/hashiconf-next',
    path: '/package.json',
  },
  {
    repo: 'hashicorp/waypoint',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/boundary',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/nomad',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/consul',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/vault',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/vagrant',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/packer',
    path: '/website/package.json',
  },
  {
    repo: 'hashicorp/sentinel',
    path: '/website/package.json',
  },
]

async function fetchUsageDetails(packageName) {
  return await getUsage(packageName, packageJsonList)
}

export default async function handler(req, res) {
  const {
    query: { packageName },
  } = req
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const data = await fetchUsageDetails(packageName.join('/'))
  res.end(JSON.stringify(data))
}
