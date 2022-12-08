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

/**
 * Returns a string representing a hyphenated version of the property and name
 * attributes. For example:
 * {
 *   name: 'tag:name',
 *   property: 'tag:property'
 * }
 * will return `tag:property-tag:name`. Additionally, something like
 * {
 *   name: 'tag:name'
 * }
 * will return `tag:name`, making this safe to use even if both property and
 * name aren't present.
 *
 * This function is primarily used to handle instances where Dato provides us
 * with an SEO attribute with a property and/or name value we're not doing any
 * special handling for.
 */
function getMergedAttributeKey(attrs: Attributes): string {
  return [attrs.property, attrs.name].filter(Boolean).join('-')
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
/**
 * Given an attribute with both property and name values, this function returns
 * a single value that can be used as a `key` for React reconciliation. If
 * neither the property nor the name exists as a known value, it returns a
 * merged version of the values.
 */
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

  return getMergedAttributeKey(attrs)
}

const SIMILAR_PROPERTIES = {
  'twitter:description': 'og:description',
  'twitter:title': 'og:title',
  'twitter:image': 'og:image',
}
/**
 * Maps known name values to preferred property values. Used primarily to
 * merge twitter:* attributes into their equivalent og:* attribute.
 */
function getSimilarAttributeKey(attrs: Attributes): string {
  if (attrs.name && attrs.name in SIMILAR_PROPERTIES) {
    return SIMILAR_PROPERTIES[attrs.name]
  }
  return getMergedAttributeKey(attrs)
}

/**
 * Given a metatag object from Dato, returns the props that will be passed to
 * the element when rendered by React.
 */
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

/**
 * Merges tags that are returned separately by Dato, but can exist together in
 * the same tag due to their usage of different property/name values. Primarily
 * used to merge twitter:* and og:* tags.
 */
function mergeSimilarTags(seo: SeoMetatag[]): SeoMetatag[] {
  const tags: Record<string, SeoMetatag> = {}
  const tagsWithoutAttributes: SeoMetatag[] = []

  for (const tag of seo) {
    // If the tag doesn't have any attributes (such as title), we don't need to
    // perform any attribute merging.
    if (tag.attributes) {
      // Get a stable key that's the same value for similar attributes
      const key = getSimilarAttributeKey(tag.attributes)
      if (key in tags) {
        // Our stable key has already been used by another tag
        if (tags[key].attributes?.content === tag.attributes.content) {
          // The content values are equal, and we can safely reuse the existing
          // object.
          tags[key].attributes = {
            ...tags[key].attributes,
            ...tag.attributes,
          }
        } else {
          // The content values are different, so we need to store this tag
          // using a unique key
          tags[getMergedAttributeKey(tag.attributes)] = tag
        }
      } else {
        // key hasn't been used, so we go ahead and store the tag as-is
        tags[key] = tag
      }
    } else {
      tagsWithoutAttributes.push(tag)
    }
  }

  // merge our attribute-less tags with our merged tags
  return [...tagsWithoutAttributes, ...Object.values(tags)]
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
