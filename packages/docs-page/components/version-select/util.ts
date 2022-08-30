const VERSION_REGEXP = /v\d+\.\d+\.(\d+|\w+)/i
const TFE_VERSION_REGEXP = /v[0-9]{6}-\d+/i

/**
 * Extract the version from a path string, or an array of path segments
 */
export function getVersionFromPath(path: string): string | undefined {
  const pathSegments = path
    // `path` should never contain the scheme/domain/port, but just in case...
    .replace(/^https?:\/\/[a-z-:0-9.]+/i, '')
    // Strip leading slash
    .replace(/^\//i, '')
    .split('/')

  // version is only expected to be at index 1, or 2 in the case of TF-Plugins
  const version = pathSegments.find((el, i) => {
    if (i === 1 && TFE_VERSION_REGEXP.test(el)) {
      return true
    }
    if ((i === 1 || i === 2) && VERSION_REGEXP.test(el)) {
      return true
    }
    return false
  })

  return version
}

/**
 * Removes a version string from a path, and returns the new path.
 * Returns the original string if no version is present.
 */
export function removeVersionFromPath(path: string): string {
  const pathSegments = path.split('/')

  const i = pathSegments.findIndex(
    (el) => VERSION_REGEXP.test(el) || TFE_VERSION_REGEXP.test(el)
  )

  if (i > -1) {
    return [...pathSegments.slice(0, i), ...pathSegments.slice(i + 1)].join('/')
  } else {
    return path
  }
}

const LEADING_TRAILING_SLASHES_REGEXP = /^\/+|\/+$/g

interface GetTargetPathArgs {
  basePath: string
  asPath: string
  version: string
}
// Get a target path for router navigation; Handles dynamic basePath
export function getTargetPath({
  basePath,
  asPath,
  version,
}: GetTargetPathArgs): string {
  const rest = asPath
    .replace(basePath, '') // strip basePath
    .replace(VERSION_REGEXP, '') // strip version
    .replace(TFE_VERSION_REGEXP, '') // strip TFE
    .replace(LEADING_TRAILING_SLASHES_REGEXP, '') // strip leading and trailing slashes

  return '/' + basePath + '/' + version + (rest ? `/${rest}` : '')
}
