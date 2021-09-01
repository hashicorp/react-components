const supportedElements = {
  div: 'div',
  span: 'span',
}

export default function InlineSvg({ wrapper, src, ...props }) {
  const Component = supportedElements[wrapper] || supportedElements['div']
  return <Component dangerouslySetInnerHTML={{ __html: src }} {...props} />
}
