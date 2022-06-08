---
'@hashicorp/react-docs-page': major
---

BREAKING CHANGE: no longer provides default remark and rehype plugins.

Consumers should pass all `remarkPlugins` and `rehypePlugins` through loader options. To match previous behaviour, consumers should import our `@hashicorp/remark-plugins` as well as code highlighting plugins.

```ts
// Shared remark plugins
import {
  includeMarkdown,
  paragraphCustomAlerts,
  typography,
  anchorLinks,
} from '@hashicorp/remark-plugins'
// Code highlighting
import rehypePrism from '@mapbox/rehype-prism'
import rehypeSurfaceCodeNewlines from '@hashicorp/platform-code-highlighting/rehype-surface-code-newlines'
// To enable math features, add remarkMath & rehypeKatex
// import remarkMath from 'remark-math'
// import rehypeKatex from 'rehype-katex'

const remarkPlugins = [
  [
    includeMarkdown,
    {
      resolveMdx: true,
      resolveFrom: path.join(process.cwd(), localPartialsDir),
    },
  ],
  paragraphCustomAlerts,
  typography,
  anchorLinks,
  /* ... option to add more plugins here ... */
]

const rehypePlugins = [
  [rehypePrism, { ignoreMissing: true }],
  rehypeSurfaceCodeNewlines,
  /* ... option to add more plugins here ... */
]
```
