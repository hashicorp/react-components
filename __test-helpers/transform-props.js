import path from 'path'

export default function transformProps(dir) {
  return import(path.join(dir, 'props.js')).then((propsSpec) => {
    return Object.keys(propsSpec).reduce((memo, name) => {
      memo[name] = propsSpec[name].testValue
      return memo
    }, {})
  })
}
