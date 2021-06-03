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

describe('syntaxes', () => {
  it('includes entries for all refractor.listLanguages() syntaxes and aliases', () => {
    const missingEntries = refractorList
      .filter((slugOrAlias) => {
        return syntaxesList.indexOf(slugOrAlias) === -1
      })
      .sort()
    if (missingEntries.length > 0) {
      console.log(
        `Missing entries in prism/language-utils "syntaxes": ${JSON.stringify(
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
        `Invalid entries in prism/language-utils "syntaxes": ${JSON.stringify(
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
    expect(getLanguageName('dotnet')).toBe('C#')
  })

  it('returns null if no language name is set for a valid slug', () => {
    expect(getLanguageName('brainfuck')).toBe(null)
  })
})
