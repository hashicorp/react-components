import fuzzysearch from 'fuzzysearch'

export default function filterOptions(term, options) {
  // if there's no search term we short-circuit and return everything
  if (!term) return options
  // Otherwise we reduce the options array to only matching options
  return options.reduce((acc, item) => {
    const isLabelMatch = fuzzysearch(
      term.toLowerCase(),
      item.label.toLowerCase()
    )
    if (isLabelMatch) return acc.concat(item)

    const isValueMatch = fuzzysearch(
      term.toLowerCase(),
      item.value.toLowerCase()
    )
    if (isValueMatch) return acc.concat(item)
    return acc
  }, [])
}
