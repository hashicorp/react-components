const fs = require('fs')
const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

/*

This script refreshes the list of supported syntaxes from refractor.
Knowing which syntax slugs have which aliases helps us improve CodeTabs
preference functionality.
*/

const README_URL =
  'https://raw.githubusercontent.com/wooorm/refractor/main/readme.md'
const OUT_FILE = path.join(
  process.cwd(),
  'packages/code-block/utils/prism-utils/syntaxes.json'
)
main(README_URL, OUT_FILE)

async function main(readmeUrl, outFile) {
  console.log(readmeUrl)
  const { stdout: readmeString, stderr } = await exec(`curl -s ${readmeUrl}`)
  if (stderr) throw new Error(stderr)
  // Pull out the "supported syntaxes" part of the readme
  const syntaxSupportLines = readmeString
    .match(/<!--support start-->([\s\S]*)<!--support end-->/)[1]
    .trim()
    .split('\n')
  // Parse into an array of { slug, aliases } entries
  const syntaxes = syntaxSupportLines
    .map((line) => {
      const slug = line.match(/\[`(.*)`\]/)[1]
      const aliasesMatch = line.match(/alias: (.*)$/)
      const aliases =
        aliasesMatch == null
          ? []
          : aliasesMatch[1]
              .split(',')
              .map((str) => str.trim().replace(/`/g, ''))
      console.log({ aliases })
      return { slug, aliases }
    })
    .filter((entry) => {
      const futureSupported = [
        'css-extras',
        'js-extras',
        'js-templates',
        'php-extras',
        'xml-doc',
      ]
      return futureSupported.indexOf(entry.slug) == -1
    })
  // Filter out newer languages not supported in our current version of refractor

  // Sort by canonical syntax slug
  syntaxes.sort(function compare(a, b) {
    if (a.slug < b.slug) return -1
    if (a.slug > b.slug) return 1
    return 0
  })
  // Group syntaxes into an object
  const syntaxesObject = syntaxes.reduce((acc, entry) => {
    const { slug, aliases } = entry
    acc[slug] = aliases
    return acc
  }, {})
  // Write entries to syntaxes.json
  fs.writeFileSync(outFile, JSON.stringify(syntaxesObject, null, 2))
}
