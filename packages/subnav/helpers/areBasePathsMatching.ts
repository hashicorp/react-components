/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export function areBasePathsMatching(pathA: string, pathB: string) {
  if (!pathA || !pathB) return false
  // use .filter(Boolean) to remove any falsy values, like ""
  const [pathABase] = pathA.split('/').filter(Boolean)
  const [pathBBase] = pathB.split('/').filter(Boolean)

  return pathABase === pathBBase
}
