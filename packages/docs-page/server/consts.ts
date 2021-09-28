export const ENABLE_VERSIONED_DOCS = process.env.ENABLE_VERSIONED_DOCS
export const VERCEL_ENV = process.env.VERCEL_ENV

/**
 * So far, we have a pattern of using a common value for
 * docs catchall route parameters: route/[[...page]].jsx.
 * This default parameter ID captures that pattern.
 * It can be overridden via options.
 */
export const DEFAULT_PARAM_ID = 'page'
