export default function InlineSvg({ src, ...props }) {
  return <div dangerouslySetInnerHTML={{ __html: src }} {...props}></div>
}
