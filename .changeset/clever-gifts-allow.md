---
'@hashicorp/react-call-to-action': major
'@hashicorp/react-callouts': major
'@hashicorp/react-content-cta': major
'@hashicorp/react-featured-slider': major
'@hashicorp/react-hero': major
'@hashicorp/react-logo-grid': major
'@hashicorp/react-product-features-list': major
'@hashicorp/react-subnav': major
'@hashicorp/react-text-split': major
'@hashicorp/react-case-study-slider': major
'@hashicorp/react-text-split-with-code': major
'@hashicorp/react-text-split-with-image': major
'@hashicorp/react-text-split-with-logo-grid': major
'@hashicorp/react-text-splits': major
---

Update @hashicorp/react-button to v7. With this upgrade, links without protocols (such as `/pagename`) will be navigated using a client-side navigation, and as such will not be checked against any redirects. Please ensure that all passed in internal links do not rely on redirects in order to function.
