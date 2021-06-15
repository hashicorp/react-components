/// <reference types="@types/segment-analytics" />

declare module '@next/bundle-analyzer'
declare module 'next-optimized-images'
declare module 'next-transpile-modules'

declare module '@hashicorp/remark-plugins'
declare module '@hashicorp/react-consent-manager'

declare module 'rivet-graphql'

declare module '@mapbox/rehype-prism'

declare module '*.css'

declare module '*.svg'
declare module '*.svg?include'

/**
 * Alias any so we can assess and track usage of any
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type $TSFixMe = any

/**
 * Infer the promise value type from a PromiseLike object
 */
type ThenType<T> = T extends PromiseLike<infer U> ? U : T

/**
 * Declare types for window.analytics from segment
 */
interface Window {
  analytics: SegmentAnalytics.AnalyticsJS
}
