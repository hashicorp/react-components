/**
 * Copies a string of text to the clipboard
 * @param {string} string - string of text to copy
 * @returns {boolean} - `true` if successful, or `false` otherwise
 */
function copyToClipboard(string) {
  //  We can't do this if there's no `document`, so don't try
  if (typeof document === 'undefined') {
    console.error('copyToClipboard failed, as document is undefined')
    return false
  }
  //  We also can't do this if the argument is not a string
  if (typeof string !== 'string') {
    console.error('copyToClipboard received non-string argument: ' + string)
    return false
  }

  let copyElem

  try {
    //  Create a temporary `textarea` from which to select & copy
    let copyElem = document.createElement('textarea')
    copyElem.style.fontSize = '12pt' // Prevent zooming on iOS
    copyElem.value = string
    document.body.appendChild(copyElem)
    copyElem.select()
    document.execCommand('copy')
    document.body.removeChild(copyElem)
    return true
  } catch (err) {
    //  We should try to clean up the tempElem
    //  just in case it did get created
    console.error(err)
    document.body.removeChild(copyElem)
    return false
  }
}

export default copyToClipboard
