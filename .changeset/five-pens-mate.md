---
'@hashicorp/react-tabs': major
---

Converts Tabs to CSS modules.

- 💥✨ BREAKING CHANGE: Refactored to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-tabs/style.css` imports.
- 🔨 Refactors previous class component implementations to functional components with hooks
- 🔨 Converts to Typescript
- 🔨 Replaces Tippy with [reach/tooltip](https://reach.tech/tooltip) and [reach/portal](https://reach.tech/portal).
  - This change was necessary to fully transition the component to CSS modules.
  - reach/tooltip is also [smaller](https://bundlephobia.com/package/@reach/tooltip@0.16.0) than [Tippy.js](https://bundlephobia.com/package/@tippyjs/react@4.2.5)
- 🔧 move icons to SVG files to match other components
- 🔧 fix casing on some files and folders
- 🐛 minor fixes for visual bugs, including overflow issues on smaller viewports
