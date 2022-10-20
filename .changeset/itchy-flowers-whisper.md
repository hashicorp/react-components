---
'@hashicorp/react-code-block': patch
---

Fixes issue where code-tabs in MDX would render blocks with a language-undefined className, even if the className was in fact defined.
