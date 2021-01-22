import React from 'react'
import queryString from 'query-string'
import assign from 'object-assign'
import fragment from './fragment.graphql'

function Image({
  url,
  alt,
  format,
  steps = [250, 500, 750, 1000, 1500, 2000, 2500],
  sizes = '100vw',
  aspectRatio,
  imgixOptions = {},
  ...props
}) {
  const parsedFormat = parseFormat(format, url)
  const formatOption = parsedFormat ? { fm: parsedFormat } : {}
  // set default imgix options, merge user preferences with priority
  const opts = assign(
    { fit: aspectRatio ? 'crop' : 'max', q: 80 },
    formatOption,
    imgixOptions
  )

  // if it's an SVG, we don't need the picture element, so return
  if (parsedFormat === 'svg')
    return <img data-testid="image-root" src={url} alt={alt} {...props} />

  // otherwise, we return a picture element with multiple sizes and a webp
  // optimized version for performance
  const srcSetDefault = formatSteps(steps, opts, aspectRatio, url)
  const srcSetWebp = formatSteps(
    steps,
    assign({}, opts, { fm: 'webp' }),
    aspectRatio,
    url
  )

  return (
    <picture data-testid="image-root">
      <source
        type="image/webp"
        srcSet={srcSetWebp}
        sizes={sizes}
        data-testid="webp-source"
      />
      <img
        src={formatSrc(url, opts, aspectRatio && aspectRatio[2], aspectRatio)}
        srcSet={srcSetDefault}
        sizes={sizes}
        alt={alt}
        data-testid="img"
        {...props}
      />
    </picture>
  )
}

Image.fragmentSpec = { fragment }

export default Image

function parseFormat(format, url) {
  //  Use the format prop if it was provided
  if (format) return format
  //  Fallback to parsing it from the extension
  const extensionMatch = url.match(/\.(\w+)$/)
  const hasExtension = !!extensionMatch && !!extensionMatch[1]
  return hasExtension ? extensionMatch[1] : false
}

function formatSteps(steps, opts, aspectRatio, src) {
  return steps.map((s) => `${formatSrc(src, opts, s, aspectRatio)} ${s}w`)
}

function formatSrc(src, opts, width, aspectRatio) {
  const opt = assign({}, opts)
  if (width) opt.w = width
  if (width && aspectRatio) opt.h = (aspectRatio[1] / aspectRatio[0]) * width
  return `${src}?${queryString.stringify(opt)}`
}
