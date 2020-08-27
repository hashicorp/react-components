import fs from 'fs'
import path from 'path'
import json5 from 'json5'

export default function transformProps(dir) {
  const propsSpec = json5.parse(
    fs.readFileSync(path.join(dir, 'props.json5'), 'utf8')
  )
  return Object.keys(propsSpec).reduce((memo, name) => {
    memo[name] = propsSpec[name].defaultValue
    return memo
  }, {})
}
