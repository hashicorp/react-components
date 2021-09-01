export default function InlineSvg({ spanWrapper, src, ...props }) {
  const Component = spanWrapper ? 'span' : 'div'
  return <Component dangerouslySetInnerHTML={{ __html: src }} {...props} />
}
