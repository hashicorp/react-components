import Head from 'next/head'
import isAbsoluteUrl from './helpers/is-absolute-url'
import { renderMetaTags } from './seo'

export { renderMetaTags }

const IS_DEV = process.env.NODE_ENV !== 'production'

export default function HashiHead(props: HashiHeadProps): React.ReactElement {
  /**
   * Throw an error if props.image is a relative URL.
   * It must be an absolute URL in order to work as expected as og:image.
   * Reference: https://ogp.me/#url
   */
  if (typeof props.image !== 'undefined' && !isAbsoluteUrl(props.image)) {
    /**
     * TODO: should we consider alternatives to throwing an error here?
     * - throw error in effect, i think this would show up in dev,
     *   but would log in prod rather than prevent rendering
     * - log to Datadog or something rather than throw. However,
     *   Datadog only in hashicorp/dev-portal... but maybe okay, given
     *   so many sites are now served from that repo?
     */
    const errorMessage = `Error: HashiHead "props.image" must be an absolute URL. Non-absolute URL detected: "${props.image}". Please provide a fully qualified absolute URL or "props.image".`
    if (IS_DEV) {
      throw new Error(errorMessage)
    } else {
      console.error(errorMessage)
    }
  }

  return (
    <Head>
      {whenString(props.title, <title>{props.title}</title>)}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta property="og:locale" content="en_US" key="og:locale" />
      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/HashiCorp/"
        key="article:publisher"
      />
      <meta name="twitter:site" content="@HashiCorp" key="twitter:site" />
      <meta
        name="twitter:card"
        content={props.twitterCard || 'summary_large_image'}
        key="twitter:card"
      />
      <meta name="theme-color" content="#000" key="themeColor" />
      {whenString(
        props.description,
        <>
          <meta
            name="description"
            property="og:description"
            content={props.description}
            key="description"
          />
          <meta
            // TODO: are we sure we need this? Seems like will fall back to OG
            name="twitter:description"
            content={props.description}
            key="twitterDescription"
          />
        </>
      )}
      {whenString(
        props.siteName,
        <meta
          property="og:site_name"
          content={props.siteName}
          key="og:site_name"
        />
      )}
      {whenString(
        props.pageName,
        <meta property="og:title" content={props.pageName} key="og:title" />
      )}
      {whenString(
        props.image,
        <meta property="og:image" content={props.image} key="og:image" />
      )}
      {whenString(
        props.canonicalUrl,
        <link rel="canonical" key="canonical" href={props.canonicalUrl} />
      )}
      {whenArray(props.preload, ({ href, ...linkProps }) => (
        <link href={href} {...linkProps} rel="preload" key={href} />
      ))}
      {whenArray(props.icon, ({ href, ...linkProps }) => (
        <link href={href} {...linkProps} rel="icon" key={href} />
      ))}
      {whenArray(props.stylesheet, ({ href, ...linkProps }) => (
        <link href={href} {...linkProps} rel="stylesheet" key={href} />
      ))}
      {props.children}
    </Head>
  )
}

/** Return a map of the value using the callback if it is an Array. */
const whenArray = (value, mapFn) =>
  Array.isArray(value) ? value.map(mapFn) : null

/** Return the value if it is a String */
const whenString = (value, returnValue) =>
  typeof value === 'string' ? returnValue : null

// -----
// Types
// -----

interface HashiHeadProps {
  canonicalUrl?: string
  children?: React.ReactNode
  description?: string
  icon?: {
    [key: string]: unknown
    href: string
    sizes?: string
    type?: string
  }[]
  image?: string
  pageName?: string
  preload?: {
    [key: string]: unknown
    as: asProp
    href: string
    type?: string
  }[]
  siteName?: string
  stylesheet?: {
    [key: string]: unknown
    href: string
    media?: string
  }[]
  title?: string
  twitterCard?: TwitterCardProp
}

type TwitterCardProp = 'summary' | 'summary_large_image'

type asProp =
  | 'audio'
  | 'document'
  | 'embed'
  | 'fetch'
  | 'font'
  | 'image'
  | 'object'
  | 'script'
  | 'style'
  | 'track'
  | 'video'
  | 'worker'
