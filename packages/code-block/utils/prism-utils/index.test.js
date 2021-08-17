const { syntaxes, getCanonicalSlug, getLanguageName } = require('./')
const refractor = require('refractor')
const refractorList = refractor.listLanguages()
// Flatten our syntaxes entries into a list of slugOrAlias strings,
// to facilitate comparison with refractor.listLanguages() list of the same
// ref: https://github.com/wooorm/refractor#refractorlistlanguages
const syntaxesList = Object.keys(syntaxes).reduce((acc, slug) => {
  const aliases = syntaxes[slug]
  return acc.concat(slug, aliases)
}, [])

// TODO: I'm not sure if we want to always run these tests, it seems like the list of syntaxes we provide should align with the needs of our
// content, not necessarily all of the possible syntaxes exposed by the library.
describe.skip('syntaxes', () => {
  it('includes entries for all refractor.listLanguages() syntaxes and aliases', () => {
    const missingEntries = refractorList
      .filter((slugOrAlias) => {
        return syntaxesList.indexOf(slugOrAlias) === -1
      })
      .sort()
    if (missingEntries.length > 0) {
      console.log(
        `Missing entries in code-block/utils/prism-utils/syntaxes: ${JSON.stringify(
          missingEntries
        )}`
      )
    }
    expect(missingEntries.length).toBe(0)
  })

  it('does not include any syntaxes unrecognized by refractor.listLanguages()', () => {
    const invalidEntries = syntaxesList
      .filter((slugOrAlias) => {
        return refractorList.indexOf(slugOrAlias) === -1
      })
      .sort()
    if (invalidEntries.length > 0) {
      console.log(
        `Invalid entries in code-block/utils/prism-utils/syntaxes: ${JSON.stringify(
          invalidEntries
        )}`
      )
    }
    expect(invalidEntries.length).toBe(0)
  })
})

describe('getCanonicalSlug', () => {
  it('returns a canonical slug unmodified', () => {
    expect(getCanonicalSlug('javascript')).toBe('javascript')
  })

  it('returns the canonical slug for an alias', () => {
    expect(getCanonicalSlug('js')).toBe('javascript')
  })

  it('returns null if input is not a valid slug or alias', () => {
    expect(getCanonicalSlug('asdfjkl;')).toBe(null)
  })
})

describe('getLanguageName', () => {
  it('returns the pretty name for a canonical slug', () => {
    expect(getLanguageName('javascript')).toBe('JavaScript')
    expect(getLanguageName('cpp')).toBe('C++')
  })

  it('returns the pretty name for an alias', () => {
    expect(getLanguageName('js')).toBe('JavaScript')
  })

  it.skip('includes pretty names for all refractor.listLanguages() syntaxes and aliases', () => {
    const missingEntries = refractorList
      .filter((slugOrAlias) => {
        return getLanguageName(slugOrAlias) === null
      })
      .sort()
    if (missingEntries.length > 0) {
      console.log(
        `Missing entries in code-block/utils/prism-utils/pretty-names: ${JSON.stringify(
          missingEntries
        )}`
      )
    }
    expect(missingEntries.length).toBe(0)
  })
})
