# Providers Utility

Providers are intended to be a source for data that is available either globally, or across a wide range of nested components within an app.

## Docs

The `docs` provider provides a set of default components to be made available within `mdx` files. There are two methods for its use, depending on which markdown rendering strategy a website is using.

If your website is using `next-mdx-enhanced`, you can pull down a pre-configured `MDXProvider` to be used within mdx layouts, as such:

```js
// Note that this is a named export, not the default
import { createMdxProvider } from '@hashicorp/nextjs-scripts/lib/providers/docs'

const MDXProvider = createMdxProvider({
  product: 'vault',
  additionalComponents: {
    /* add your own components here if you want */
  },
})
```

If your website is using `next-mdx-remote`, you don't need a provider, and an object containing the components necessary is enough. To produce this, you can use the following example:

```js
import defaultMdxComponents from '@hashicorp/nextjs-scripts/lib/providers/docs'

const components = defaultMdxComponents({
  product: 'vault',
  additionalComponents: {
    /* add your own components here if you want */
  },
})
```

