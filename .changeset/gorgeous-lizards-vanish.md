---
'@hashicorp/react-docs-page': patch
---

Patches issue where DocsPageWrapper was not exported. Without this export, GlossaryPage can cause Vercel builds of react-components to fail.
