const syntaxes = require('./syntaxes')

/*
Pretty names allow us to keep
a single source of truth on what language name
each syntax slug corresponds to.
@TODO take a more informed guess at which names
we should set. Eg look through Learn and Dato,
and determine which language slugs are in use there.
Dato in particular should provide a good list.
*/
const languageNames = {
  bash: 'Shell',
  cpp: 'C++',
  csharp: 'C#',
  go: 'Go',
  hcl: 'HCL',
  html: 'HTML',
  javascript: 'JavaScript',
  json: 'JSON',
  ruby: 'Ruby',
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
