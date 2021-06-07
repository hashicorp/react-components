const syntaxes = require('./syntaxes')

/*
Pretty names allow us to keep
a single source of truth on what language name
each syntax slug corresponds to.

We've set this up to include all languages in 
Dato. We can update this list to improve automatic
"pretty" names, eg for CodeTabs. Note that if a "pretty"
name isn't present, consumers should have the option to 
use a custom "pretty" name. For example, in CodeTabs,
you can pass an array of labels using the "tabs" prop.
*/
const languageNames = {
  bash: 'Shell',
  cpp: 'C++',
  csharp: 'C#',
  go: 'Go',
  hcl: 'HCL',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  python: 'Python',
  ruby: 'Ruby',
  sentinel: 'Sentinel',
  shell: 'Shell',
  'shell-session': 'Shell',
  svg: 'SVG',
  typescript: 'TypeScript',
  yaml: 'YAML',
}

function getCanonicalSlug(slugOrAlias) {
  const syntaxSlugMatch = Object.keys(syntaxes).reduce((match, slug) => {
    // If we already have a match, stop looking
    if (match) return match
    // If the  canonical slug is a match, use that
    if (slug == slugOrAlias) return slug
    // If an alias is a match, use the canonical slug
    if (syntaxes[slug].indexOf(slugOrAlias) !== -1) return slug
    // Otherwise, keep looking
    return match
  }, null)
  return syntaxSlugMatch
}

function getLanguageName(slugOrAlias) {
  // If there's a direct custom name match, use that
  const customName = languageNames[slugOrAlias]
  if (customName) return customName
  // If there's a custom name for the canonical slug, use that
  const canonicalSlug = getCanonicalSlug(slugOrAlias)
  const canonicalName = languageNames[canonicalSlug]
  if (canonicalName) return canonicalName
  // Return null otherwise, consumer should use fallback
  // (eg, just display slugOrAlias as the language name)
  return null
}

module.exports = {
  syntaxes,
  getCanonicalSlug,
  getLanguageName,
}
