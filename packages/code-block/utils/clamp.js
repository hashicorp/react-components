/**
 * Ensures a number is limited to a given range.
 *
 * @param {Number} num The number
 * @param {Number} min The smallest possible value
 * @param {Number} max The largest possible value
 * @returns min if num < min, max if num > max, or num otherwise
 */
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

export default clamp
