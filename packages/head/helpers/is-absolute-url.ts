/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Given a string,
 * return true if the string is an absolute URL,
 * or false otherwise.
 *
 * Uses regex so may not be 100% accurate.
 * Based on https://github.com/sindresorhus/is-absolute-url
 *
 * @example
 * // returns true, this is an absolute URL
 * isAbsoluteUrl('https://www.hashicorp.com/foo/bar');
 * @example
 * // returns false, this is a relative path
 * isAbsoluteUrl('./foo/bar');
 * @example
 * // returns false, this is an absolute path, but not an absolute URL
 * isAbsoluteUrl('/foo/bar');
 * @param string The URL to test
 * @returns true if the URL is absolute, false otherwise
 */
function isAbsoluteUrl(string: string): boolean {
  const regex = /^[a-zA-Z][a-zA-Z\d+\-.]*:/
  return regex.test(string)
}

export default isAbsoluteUrl
