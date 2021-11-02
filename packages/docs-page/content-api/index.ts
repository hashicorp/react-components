const MKTG_CONTENT_API = process.env.MKTG_CONTENT_API
const MKTG_CONTENT_API_TOKEN = process.env.MKTG_CONTENT_API_TOKEN

const DEFAULT_HEADERS = {
  headers: {
    Authorization: `Bearer ${MKTG_CONTENT_API_TOKEN}`,
  },
}

// Courtesy helper for warning about missing env vars during development
const checkEnvVarsInDev = () => {
  if (process.env.NODE_ENV === 'development') {
    if (!MKTG_CONTENT_API || !MKTG_CONTENT_API_TOKEN) {
      const message = [
        'You might be missing the following environment variables:',
        '`MKTG_CONTENT_API`, `MKTG_CONTENT_API_TOKEN`',
      ].join(' ')
      throw new Error(message)
    }
  }
}

export async function fetchNavData(
  product: string, //: string, // waypoint
  basePath: string, //: string, // commands | docs | plugins
  version: string //: string // v0.5.x
): Promise<any> {
  checkEnvVarsInDev()

  const fullPath = `nav-data/${version}/${basePath}`
  const url = `${MKTG_CONTENT_API}/api/content/${product}/${fullPath}`
  const response = await fetch(url, DEFAULT_HEADERS).then((res) => res.json())

  if (response.meta.status_code !== 200) {
    throw new Error(
      `Failed to fetch: ${url} | ${JSON.stringify(response, null, 2)}`
    )
  }
  return response.result
}

export async function fetchDocument(
  product: string,
  fullPath: string
): Promise<any> {
  checkEnvVarsInDev()

  const url = `${MKTG_CONTENT_API}/api/content/${product}/${fullPath}`
  const response = await fetch(url, DEFAULT_HEADERS).then((res) => res.json())

  if (response.meta.status_code !== 200) {
    throw new Error(
      `Failed to fetch: ${url} | ${JSON.stringify(response, null, 2)}`
    )
  }
  return response.result
}

export async function fetchVersionMetadataList(product: string) {
  checkEnvVarsInDev()

  const url = `${MKTG_CONTENT_API}/api/content/${product}/version-metadata?partial=true`
  const response = await fetch(url, DEFAULT_HEADERS).then((res) => res.json())

  if (response.meta.status_code !== 200) {
    throw new Error(
      `Failed to fetch: ${url} | ${JSON.stringify(response, null, 2)}`
    )
  }
  return response.result
}
