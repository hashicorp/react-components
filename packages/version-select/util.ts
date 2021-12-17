const REGEX = /^v\d+\.\d+\.(\d+|\w+)$/i

/**
 * Extract the version from a path string, or an array of path segments
 */
export function getVersionFromPath(path: string): string | undefined {
  const pathSegments = path.split('/')

  const version = pathSegments.find((el) => REGEX.test(el))

  return version
}

/**
 * Removes a version string from a path, and returns the new path.
 * Returns the original string if no version is present.
 */
export function removeVersionFromPath(path: string): string {
  const pathSegments = path.split('/')

  const i = pathSegments.findIndex((el) => REGEX.test(el))

  if (i > -1) {
    return [...pathSegments.slice(0, i), ...pathSegments.slice(i + 1)].join('/')
  } else {
    return path
  }
}

const VERSION_REGEXP = /v\d+\.\d+\.(\d+|\w+)/g
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
    .replace(LEADING_TRAILING_SLASHES_REGEXP, '') // strip leading and trailing slashes

  return '/' + basePath + '/' + version + (rest ? `/${rest}` : '')
}
