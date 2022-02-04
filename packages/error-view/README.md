# Error View

A component used to display an error view. For further details on this component, see [docs.mdx](./docs.mdx). These docs can also be viewed through our [Swingset instance](https://react-components.vercel.app).

## `useErrorPageAnalytics`

The `useErrorPageAnalytics` hook is used within the `ErrorView` component, and is provided as a named export from `@hashicorp/react-error-view`. This hook is intended for use cases where the opinionated, `g-grid-container`-based styles of the default `ErrorView` component are not suited to a project.

## `use404Redirects`

The `use404Redirects` hook can be used on a `page/404.js` page to handle redirects that aren't triggered via client-side navigations. It determines if the current page results in a server-side redirect by performing a HEAD request against the current URL, and performing a client-side navigation to the resulting URL.

### Usage

```tsx
import ErrorPage, { use404Redirects } from '@hashicorp/react-error-view'

export default function NotFound() {
  use404Redirects()

  return <ErrorView statusCode={404} />
}
```
