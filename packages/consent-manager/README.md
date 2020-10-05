# Consent Manager

A GDPR-compliant consent manager.

### Props

- `version` (integer) - version number, bump up to override previous consent preferences
- `container` (string) - id of container where the consent manager should live
- `companyName` (string) - your company name to be inserted in various copy
- `privacyPolicyLink` (string) - link to your company's privacy policy
- `segmentWriteKey` (string) - your production segment write key
- `segmentServices` (array of objects) - use this to override the category or description of a service provided by Segment
  - `name` - name of the Segment integration, must match the integration you are overriding
  - `utilServerRoot` - root path of the instance of HashiCorp's `web-utility-server` to use. This is used to fetch integrations based on segment write key.
  - `category` _[optional]_ - new category name
  - `description` _[optional]_ - new description
- `categories` (array) - State of toggle
  - `name` - name of category
  - `description` - description for the category
- `additionalServices` (array of objects) - additional integrations outside of Segment that you wish to include in the consent manager
  - `name` - name of service
  - `description` - description of service
  - `category` - category of service
  - `body` _[optional]_ - javascript body associated with service _If present, overrides `url` below_
  - `url` _[optional]_ - url of js file associated with service
  - `async` (bool) _[optional]_ - add `async` property to script element
  - `addToBody` (bool) _[optional]_ - inject script before closing `<body>` tag
  - `dataAttrs` (arr) _[optional]_ - array of `data-` attributes to add to script tag
    - `name` (str) - name of data attribute (`data-name`)
    - `value` (str) - value of `data` attribute to set
