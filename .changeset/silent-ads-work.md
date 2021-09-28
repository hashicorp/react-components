---
'@hashicorp/react-version-select': patch
---

Fixed a bug with `version-select` where navigating to a latest version, while on the latest version caused the site to be pushed to "/latest", which is unintended.

Also added minor improvements to not call Next.js router `push` when selecting a version that is the same as the current version.

Added test coverage.
