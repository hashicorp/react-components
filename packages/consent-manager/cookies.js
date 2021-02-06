/*
  Cookies structure:
  {
    { segment: { Hotjar: true, Intercom: false, .. } },
    { custom: { OptinMonster: true } },
    { categories: { Functional: true } }
  }
*/

import cookies from 'js-cookie'
import assign from 'object-assign'
export const COOKIE_KEY = 'hashi-consent-preferences'
export const COOKIE_EXPIRES = 365

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

export function loadPreferences() {
  return cookies.getJSON(COOKIE_KEY)
}

export function savePreferences(prefs, version) {
  const domain = getDomain()
  cookies.set(COOKIE_KEY, assign(prefs, { version: version }), {
    expires: COOKIE_EXPIRES,
    domain,
  })
}
