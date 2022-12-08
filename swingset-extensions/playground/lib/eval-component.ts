import { ElementType } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { components } from 'swingset/__swingset_data'

/**
 * Use swingset's data to make an "export map" of all components
 */
const componentDeps = Object.fromEntries(
  Object.values(components).map((component) => {
    const lastPathPiece = component.path.split('/').slice(-1)
    return [lastPathPiece, component.exports]
  })
)

/**
 * Static dependencies available to all playground instances
 */
const dependencies = {
  'react/jsx-runtime': jsxRuntime,
  ...componentDeps,
}

/**
 *
 * @param source module source which we're evaluating
 * @param cssExports exports from our css module
 * @returns The default "export" of the playground module, expected to be a React component type
 */
export function evalComponent(source, cssExports): ElementType {
  const exports = { default: () => null }
  const require = (mod) => {
    if (dependencies[mod]) return dependencies[mod]
    if (mod == 'style.module.css') return cssExports
  }
  const fn = new Function('exports', 'require', source)
  fn(exports, require)
  return exports.default
}
