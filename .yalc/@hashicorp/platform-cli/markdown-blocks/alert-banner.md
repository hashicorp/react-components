## Editing/Enabling the Alert Banner

This website has an optional "alert banner" that displays a bright, prominent notice across the top of the window. It is intended to be sparingly used to call attention to a major change, improvement, or update, such as a new version release.

The data and visibility of the alert banner are controlled by [`data/alert-banner.js`](/website/data/alert-banner.js). The following data can be edited in this file:

- `ALERT_BANNER_ACTIVE` - determined whether the banner is displayed or not. If `true`, it does appear, and if `false` it does not.
- `tag` - copy for the bordered text on the left side of the alert. Intended to be something short like "New" or "Updated", etc.
- `text` - copy for the center text of the alert
- `url` - where the alert links to when clicked
- `expirationDate` - an optional datetime string that, when set, controls if the alert banner should appear
