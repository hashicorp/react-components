/**
 * Extract the version from a path string, or an array of path segments
 */
export function getVersionFromPath(path: string | string[] = []): string {
  let pathSegments = path
  if (!Array.isArray(pathSegments)) pathSegments = pathSegments.split('/')

  const version = pathSegments.find((el) => /^v\d+\.\d/.test(el))

  return version
}
