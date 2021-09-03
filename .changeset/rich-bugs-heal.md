---
'@hashicorp/react-consent-manager': major
---

- 💥✨ BREAKING CHANGE: Converts to CSS modules.
  - Consumers will need to remove any `@hashicorp/react-consent-manager/style.css` imports.
  - Note: we've added CSS to hide `consent-manager` from Percy by default
    - This is achieved by an `@media only percy` rule on the root element
    - We've added support for a `className` to allow this behavior to be overridden as needed
