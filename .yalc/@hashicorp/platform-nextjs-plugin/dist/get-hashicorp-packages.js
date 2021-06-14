'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getHashicorpPackages = void 0
const path_1 = __importDefault(require('path'))
const fs_1 = __importDefault(require('fs'))
/**
 * Recursively finds all hashicorp packages that are installed in the current directory.
 *
 * @param directory the directory to search
 * @param isRecursive whether or not the function is recursing
 */
function getHashicorpPackages(directory, isRecursive = false) {
  let results = []
  const dirToSearch = path_1.default.join(
    directory,
    'node_modules',
    '@hashicorp'
  )
  if (!fs_1.default.existsSync(dirToSearch)) {
    return []
  }
  // grab all packages in the nested node_modules/@hashicorp directory
  fs_1.default.readdirSync(dirToSearch).forEach((dir) => {
    if (
      (dir !== 'react-global-styles' && dir.startsWith('react-')) ||
      dir.startsWith('platform-') ||
      dir === 'nextjs-scripts' ||
      dir === 'versioned-docs'
    )
      results.push(path_1.default.join(dirToSearch, dir))
    // call the function again to get nested deps
    results = results.concat(
      getHashicorpPackages(path_1.default.join(dirToSearch, dir), true)
    )
  })
  if (isRecursive) return results
  // if we're not a recursive call, resolve all of the paths relative to the first directory searched
  return results.map((dir) =>
    path_1.default.isAbsolute(dir)
      ? path_1.default.relative(
          path_1.default.join(directory, 'node_modules'),
          dir
        )
      : dir
  )
}
exports.getHashicorpPackages = getHashicorpPackages
