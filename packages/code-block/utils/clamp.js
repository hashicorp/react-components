/**
 * Ensures a number is limited to a given range.
 *
 * @private
 * @param {number} number The number to clamp.
 * @param {number} min The smallest possible value
 * @param {number} max The largest possible value
 * @returns {number} min if num <= min, max if num >= max, or num otherwise
 */
function clamp(number, min, max) {
  const isNaN = number !== number
  if (isNaN) return number
  return number <= min ? min : number >= max ? max : number
}

export default clamp
