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

### Usage Notes

The `href` passed to this component expects relative urls to be used for internal routes, and absolute urls to be used for external routes.

If this condition is not true, the links may not behave properly. Specifically, in the context of NextJS, this can result in internal links not using client-side transitions, or external links being erroneously prefetched. More info in [this PR](https://github.com/zeit/next.js/pull/8231), and [this open issue](https://github.com/zeit/next.js/issues/8555) could result in changes to this behavior.

## Props

See the [props file](props.json5) for more details on props!

**Link Wrap** accepts the following props:

- `Link` - [NextJS `Link` Component](https://nextjs.org/docs/api-reference/next/link), only required for client-side routing.
- `href` - Path to an internal or external route.
- `as` - Path rendered in the browser URL bar, used for dynamic routes. Optional.
- `passHref` - Whether `Link` passes its `href` prop to the `a`. Defaults to `false`.
- `prefetch` - Whether to prefetch the page in the background. Defaults to `true`.
- `replace`- Whether to replace the current `history` state instead of adding a new URL into the stack. Defaults to `false`.
- `scroll` - Whether to force the window scroll and focus to reset after navigation. Defaults to `false`.
- `shallow` - Whether to change the URL without running `getInitialProps`. Defaults to `false`.

Additional props (like `id`, `className`, or `children`) are passed to the `a`.

---

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
