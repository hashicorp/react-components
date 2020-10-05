export default function InlineSvg({ src, ...props }) {
  // match the attributes and content from the serialized svg
  const [, attrs, __html] = src?.match(svgMatch) || []

  // combine the attributes and props into new spreadable props
  const svgProps = attrs
    ? {
        ...[...attrs.matchAll(attrMatch)].reduce(
          (svgProps, [, name, value]) => ({
            ...svgProps,
            [name]: value,
          }),
          {}
        ),
        ...props,
      }
    : props

  return <svg {...svgProps} dangerouslySetInnerHTML={{ __html }} />
}

const svgMatch = /^[\W\w]*<svg([^>]+)>([\W\w]*)(<\/svg>[\W\w]*?)?$/
const attrMatch = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g
