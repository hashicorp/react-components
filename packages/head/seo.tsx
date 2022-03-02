import type { ReactElement } from 'react'

export interface Attributes {
  content: string
  property?: string
  name?: string
}

export interface SeoMetatag {
  attributes: Attributes | null
  content: string | null
  tag: 'meta' | 'title'
}

const KNOWN_PROPERTIES = [
  'og:title',
  'twitter:title',
  'description',
  'og:description',
  'twitter:description',
  'og:image',
  'og:image:width',
  'og:image:height',
  'twitter:image',
  'og:locale',
  'og:type',
  'article:modified_time',
  'twitter:card',
]

function getKeyForAttributes(attrs: Attributes): string {
  // Open Graph uses the `property` property, which we check first to ensure
  // that attributes with both `property` and `name` get keyed based on the
  // `property` value. This ensures that something like
  // <meta name="twitter:title" property="og:title" content="title" />
  // will overwrite
  // <meta property="og:title" content="title" />
  if (attrs.property && KNOWN_PROPERTIES.includes(attrs.property)) {
    return attrs.property
  } else if (attrs.name && KNOWN_PROPERTIES.includes(attrs.name)) {
    return attrs.name
  }

  return [attrs.property, attrs.name].filter(Boolean).join('-')
}

function getPropsForMetatag(metatag: SeoMetatag): Record<string, string> {
  const props: Record<string, string> = {}
  if (metatag.attributes === null) {
    return { key: [metatag.tag, metatag.content].join('-') }
  }

  const attrs = metatag.attributes

  props.key = getKeyForAttributes(attrs)
  // React generally makes it incredibly difficult to access the key prop, so
  // instead of doing a hacky workaround, explicitly set another property so
  // that we can assert the value of key.
  if (process.env.NODE_ENV === 'test') {
    props._testKey = getKeyForAttributes(attrs)
  }

  props.content = attrs.content

  if (attrs.property) {
    props.property = attrs.property
  }

  if (attrs.name) {
    props.name = attrs.name
  }

  return props
}

function mergeSimilarTags(seo: SeoMetatag[]): SeoMetatag[] {
  const tags: SeoMetatag[] = []

  // Returns a boolean indicating whether mergeProperties added the given tag
  // to the tags array
  function mergeProperties(
    tag: SeoMetatag,
    property: string,
    name: string
  ): boolean {
    if (
      tag.attributes &&
      (tag.attributes.property === property || tag.attributes.name === name)
    ) {
      const existingIndex = tags.findIndex(
        (t) =>
          t.attributes &&
          (t.attributes.property === property || t.attributes.name === name)
      )
      if (
        existingIndex > -1 &&
        tags[existingIndex].attributes?.content === tag.attributes.content
      ) {
        tags[existingIndex].attributes = {
          ...tags[existingIndex].attributes,
          ...tag.attributes,
        }

        return true
      } else {
        tags.push(tag)

        return true
      }
    } else {
      return false
    }
  }

  for (const tag of seo) {
    const wasReplaced = [
      mergeProperties(tag, 'og:description', 'twitter:description'),
      mergeProperties(tag, 'og:title', 'twitter:title'),
      mergeProperties(tag, 'og:image', 'twitter:image'),
    ]

    if (!wasReplaced.some((t) => t)) {
      tags.push(tag)
    }
  }

  return tags
}

/**
 * renderMetaTags renders `<meta />` tags based on SEO attributes from DatoCMS.
 */
export function renderMetaTags(seo: SeoMetatag[]): ReactElement[] {
  return mergeSimilarTags(seo).map((metatag) => {
    const Tag = metatag.tag
    // eslint-disable-next-line react/jsx-key
    return <Tag {...getPropsForMetatag(metatag)}>{metatag.content}</Tag>
  })
}
