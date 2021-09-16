const REGEX = /^v([0-9]+)\.([0-9]+)\.(x|[0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/i

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
