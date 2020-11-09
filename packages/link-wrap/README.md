# Link Wrap

In order to use client-side routing in NextJS, we need to pass a custom `Link` element. If provided, this component wraps links with the custom element properly and enables full client-side navigation. If not, it's transparent entirely and renders a normal link.

```shell
npm install @hashicorp/react-link-wrap
```

Use this tag as you would normally use an `a` tag, but with the additional `Link` prop. It will pass through all children and props and behave exactly as if you were using a normal `a` tag.

## Usage

```jsx
import Link from 'next/link'

export default () => {
  return (
    <LinkWrap Link={Link} href="/foo/bar" className="my-classname">
      My link text etc
    </LinkWrap>
  )
}
```

## Props

See the [props file](props.js) for more details on props!

## isAbsoluteURL

The `isAbsoluteURL` function returns whether a URL is absolute or relative.

An **absolute** URL includes a protocol, and a **relative** URL does not.

```js
import { isAbsoluteURL } from '@hashicorp/react-link-wrap'

isAbsoluteURL('https://hashicorp.com') // true
isAbsoluteURL('mailto:hashicorp@example.com') // true
isAbsoluteURL('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D') // true

isAbsoluteURL('/products/terraform') // false
isAbsoluteURL('//hashicorp.com') // false
```
