/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

/*
  Cookies structure:
  {
    { segment: { Hotjar: true, Intercom: false, .. } },
    { custom: { OptinMonster: true } },
    { categories: { Functional: true } }
  }
*/

import cookies from 'js-cookie'
export const COOKIE_KEY = 'hashi-consent-preferences'
export const COOKIE_EXPIRES = 183

let preferences = undefined
let preferencesLoaded = false

export function getDomain() {
  const host = window.location.hostname
  const parts = host.split('.')
  let levels = []
  let result = ''

  // get all domain levels
  for (let i = parts.length - 2; i >= 0; i--) {
    levels.push(parts.slice(i).join('.'))
  }

  // find top level domain
  for (let i = 0; i < levels.length; i++) {
    const cname = '__tld__'
    const domain = levels[i]
    const opts = { domain: '.' + domain }

    cookies.set(cname, 1, opts)
    if (cookies.get(cname)) {
      cookies.set(cname, null, opts)
      result = domain
      break
    }
  }

  return result
}

export const loadPreferences = () => {
  if (!preferences) {
    preferences = cookies.getJSON(COOKIE_KEY)
    if (preferences) {
      preferencesLoaded = true
    }
  }

  return preferences
}

export function savePreferences(prefs, version) {
  const domain = getDomain()
  const prefsWithVersion = Object.assign(prefs, { version: version })
  cookies.set(COOKIE_KEY, prefsWithVersion, {
    expires: COOKIE_EXPIRES,
    domain,
  })
  preferences = prefsWithVersion
  preferencesLoaded = true
}

export const preferencesSavedAndLoaded = () => preferencesLoaded
