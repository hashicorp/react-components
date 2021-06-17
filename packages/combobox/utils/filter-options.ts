import fuzzysearch from 'fuzzysearch'

export default function filterOptions(term, options) {
  // if there's no search term we short-circuit and return everything
  if (!term) return options
  // Otherwise we reduce the options array to only matching options
  return options.reduce((acc, item) => {
    const isValueMatch = fuzzysearch(term.toLowerCase(), item.toLowerCase())
    if (isValueMatch) return acc.concat(item)
    return acc
  }, [])
}
