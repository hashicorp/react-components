const MKTG_CONTENT_API = process.env.MKTG_CONTENT_API
const MKTG_CONTENT_API_TOKEN = process.env.MKTG_CONTENT_API_TOKEN

const DEFAULT_HEADERS = {
  headers: {
    Authorization: `Bearer ${MKTG_CONTENT_API_TOKEN}`,
  },
}

export async function fetchNavData(
  product: string, //: string, // waypoint
  basePath: string, //: string, // commands | docs | plugins
  version: string //: string // v0.5.x
): Promise<any> {
  const fullPath = `nav-data/${version}/${basePath}`
  const response = await fetch(
    `${MKTG_CONTENT_API}/api/content/${product}/${fullPath}`,
    DEFAULT_HEADERS
  ).then((res) => res.json())

  return response.result
}

export async function fetchDocument(
  product: string,
  fullPath: string
): Promise<any> {
  const response = await fetch(
    `${MKTG_CONTENT_API}/api/content/${product}/${fullPath}`,
    DEFAULT_HEADERS
  ).then((res) => res.json())

  return response.result
}

export async function fetchVersionMetadataList(product: string) {
  const response = await fetch(
    `${MKTG_CONTENT_API}/api/content/${product}/version-metadata?partial=true`,
    DEFAULT_HEADERS
  ).then((res) => res.json())

  return response.result
}
