This component allows folks using assistive technology to skip to the main content on the page, past navigation and other alert UI.

**_Note_: this component remains hidden until focused.** Upon being clicked, focus will shift to the specified anchor element (main content).

[See the component live here](https://react-components.vercel.app/?component=SkipLink)

### Props

```ts
interface SkipLinkProps {
  anchorId?: string
}
```

This component can accept an anchor id as a string or can pull the id from context. This can be helpful if the main content is buried deep within the page.

In general, `<SkipLink />` should be rendered in the beginning of the `body`, it's best to be the first thing folks can tab to.

### Passing an id directly

```jsx
<body>
  <SkipLink anchorId="main-content" />
  <nav>{/*...*/}</nav>
  <main id="main-content">{/*...*/}</main>
  <footer>{/*...*/}</footer>
</body>
```

### Using the provider

In many cases, you'll want to set the `SkipLink` component at the root level of your application and dynamically set `main` anchor IDs on a per-page basis. With this in mind, you'll need to use the `SkipLinkProvider` and `useSkipLinkContext` hook to set the anchor id via context at the page level. The configuration for that could look like this:

**\__app.js_**

```js
//... other imports
import SkipLink, { SkipLinkProvider } from 'components/skip-link'

export default function App({ Component, pageProps }) {
  // ...

  return (
    <SkipLinkProvider>
      <SkipLink />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <ConsentManager />
    </SkipLinkProvider>
  )
}
```

#### _useSkipLinkContext_

After the provider and `SkipLink` component is set up at the `_app` level, we can use `useSkipLinkContext` to set the current `anchorId` at the page level.

```ts
const { anchorId, setAnchorId } = useSkipLinkContext()
```

This hook returns the current `anchorId` value and a `setState` function to update that value. And here is an example of setting the current `anchorId` via context on the page level:

```jsx
export default function BlogContentWrapper({ children }) {
  const { anchorId, setAnchorId } = useSkipLinkContext()
  useEffect(() => {
    setAnchorId('main-content')
  }, [])

  return (
    <div className={styles.blogContentWrapper} id={anchorId}>
      {children}
    </div>
  )
}
```
