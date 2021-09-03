---
'@hashicorp/react-consent-manager': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-consent-manager/style.css` imports.
  - We've retained a `id="g-consent-manager` on the root element.
    - This is targeted by Percy and will likely be removed in a future version.
