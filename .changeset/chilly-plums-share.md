---
'@hashicorp/react-marketo-form': patch
---

- `MarketoForm` will now treat skipped records as errors, and correctly invoke any `onSubmitError` handlers.
- Added a new `onSubmitStart` handler that's called as soon as the submission process begins.
