import * as React from 'react'

export {
  Head as default,
  Head,
  HeadProps,
  asProp,
  IconProp,
  PreloadProp,
  StyleSheetProp,
  TwitterCardProp,
}

declare function Head<C = React.ReactElement>(
  props: HeadProps<C>
): HeadProps['is']

interface HeadProps<C = React.ReactElement> {
  /** Canonical URL for the page. */
  canonicalUrl?: string

  /** Children appended directly to the head tag. */
  children?: React.ReactNode

  /* Page description used externally. */
  description?: string

  /** Page icons. */
  icon?: IconProp[]

  /** Page image used externally. */
  image?: string

  /** Head tag or component being used, which might be `next/head` or the `head` export of a custom document. */
  is: C

  /** Page name used externally without any branding such as the site name. */
  pageName?: string

  /** Preload URLs. */
  preload?: PreloadProp[]

  /** Site title used externally. */
  siteName?: string

  /** Stylesheet URLs. */
  stylesheet?: StyleSheetProp[]

  /** Page name used by the browser. It may include branding such as the site name. For the external, "sharable" page name, use `pageName`. */
  title?: string

  /** Twitter card style used externally. */
  twitterCard?: TwitterCardProp
}

declare type IconProp = {
  [key: string]: unknown

  /** URL of the icon. */
  href: string

  /** Sizes of the icon. */
  sizes?: string

  /** Mime type of the resource. */
  type?: string
}

declare type PreloadProp = {
  [key: string]: unknown

  /** Type of content being loaded. */
  as: asProp

  /** URL of the resource. */
  href: string

  /** Mime type of the resource. */
  type?: string
}

declare type StyleSheetProp = {
  [key: string]: unknown

  /** URL of the stylesheet. */
  href: string

  /** Media the stylesheet applies to. */
  media?: string
}

declare enum TwitterCardProp {
  SummaryCard = 'summary',
  SummaryCardWithLargeImage = 'summary_large_image',
}

declare enum asProp {
  Audio = 'audio',
  Document = 'document',
  Embed = 'embed',
  Fetch = 'fetch',
  Font = 'font',
  Image = 'image',
  Obejct = 'object',
  Script = 'script',
  Style = 'style',
  Track = 'track',
  Video = 'video',
  Worker = 'worker',
}
