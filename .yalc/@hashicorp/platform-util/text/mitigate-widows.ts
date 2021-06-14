/**
 * Avoids leaving words "alone at the end" by replacing spaces with `&nbsp;`
 * @param {string} string - String to modify
 * @param {number} [unbreakLimit=12] - Unbreakable end part won't exceed this length
 * @returns {string} - Modified string with unbreakable end part
 */
export default function mitigateWidows(
  string: string,
  unbreakLimit = 12
): string {
  const words = string.split(' ')
  //  Set up an array for unbreakable words
  const unbreakableWords = []
  //  Starting from the end of our words array, begin adding
  //  to unbreakableWords, but avoid exceeding our unbreakLimit
  for (let i = words.length - 1; i >= 0; i--) {
    //  nextLength is how long the unbreakable end part would be if we add this word
    const nextLength = [words[i]].concat(unbreakableWords).join(' ').length
    //  if we would exceed the unbreakLimit, then break out of the for loop
    if (nextLength > unbreakLimit) break
    //  Otherwise, add this word to the unbreakable words array
    //  using unshift() to restore the original word order
    unbreakableWords.unshift(words[i])
  }
  //  We now have some set of unbreakableWords from the end of the words array.
  //  We need to prefix this set with the remaining words from the start of the words array.
  const breakableWords = words.slice(0, words.length - unbreakableWords.length)
  //  Assemble the breakable and unbreakable words into strings
  const breakString = breakableWords.join(' ')
  const unbreakString = unbreakableWords.join('&nbsp;')
  //  It's possible that either breakString and unbreakString are empty;
  //  we need to filter out empty strings before joining to avoid extra spaces
  return [breakString, unbreakString].filter((s) => s !== '').join(' ')
}
