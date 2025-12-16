/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Returns `true` if window.localStorage can be used,
 * or `false` otherwise.
 *
 * Based on:
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
 */
function isLocalStorageAvailable() {
  const test = 'test'
  try {
    window.localStorage.setItem(test, test)
    window.localStorage.getItem(test)
    window.localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Gets an item from local storage, if available.
 * Safely returns `null` if local storage is unavailable.
 */
function getItem(key: string) {
  if (!isLocalStorageAvailable()) return null
  return window.localStorage.getItem(key)
}

/**
 * Sets an item in local storage.
 * Safely returns `null` if local storage is unavailable.
 */
function setItem(key: string, value: string) {
  if (!isLocalStorageAvailable()) return null
  return window.localStorage.setItem(key, value)
}

const safeLocalStorage = { getItem, setItem }

export default safeLocalStorage
