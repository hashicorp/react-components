---
'@hashicorp/react-docs-page': patch
---

This updates logic to check `process.env.ENABLE_VERSIONED_DOCS === 'true'` since environment variables are _always strings_.

This should prevent some unintended behavior if ENABLE_VERSIONED_DOCS is parsed as a string `"false"`, but unintentionally evaluating to `truthy`
