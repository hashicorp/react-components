function parseHighlightedLines(string) {
  if (typeof string == 'undefined' || string == false) return []
  if (typeof string !== 'string') {
    throw new Error(
      `parseHighlighted lines received an argument of type ${typeof string}: "${string}". Please pass a string instead.`
    )
  }
  /* @TODO validate that the input string only includes
  integers, dashes, commas, and whitespace */
  const parts = string.split(',')
  return parts.reduce((acc, part) => {
    return acc.concat(parsePart(part))
  }, [])
}

function parsePart(string) {
  const dashParts = string.split('-')
  if (dashParts.length > 2) {
    throw new Error(
      'Each comma-separated value in the highlight prop must be either a single integer, or a range with a single dash between two integers. Found a value with multiple dashes: ' +
        string
    )
  }
  // Single integers are easy, just parse and return
  const isSingle = dashParts.length == 1
  if (isSingle) {
    const parsedInt = parseInt(string)
    // @TODO throw error if parsedInt is NaN
    return [parsedInt]
  }
  // Ranges require a little more logic
  const [startVal, endVal] = dashParts.map((v) => parseInt(v))
  // @TODO throw error if start or end is NaN
  const length = endVal - startVal + 1
  const values = [...Array(length).keys()].map((int) => int + startVal)
  return values
}

export default parseHighlightedLines
