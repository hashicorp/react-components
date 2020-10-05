test.todo(
  '`segmentServices`, `additionalServices`, `segmentWriteKey`, and `utilServerRoot` props are passed to getIntegration function'
)

test.todo('custom `privacyPolicyLink` renders in the right place')

test.todo('Displays the correct categories with their descriptions')

test.todo(
  'Toggles are populated correctly according to the `preferences` props'
)

test.todo(
  'When "see more" within a category is clicked, it will toggle and expand/contract it\'s items'
)

test.todo(
  'Displays the correct items within each category with their descriptions'
)

test.todo(
  'When the toggle for a category is clicked, all items in that category are turned on or off'
)

test.todo(
  'When the toggle for a item within a category is clicked, that item is turned on or off'
)

test.todo(
  'Category toggle displays as active if one of its items are active, inactive only if all items are inactive'
)

test.todo(
  'dialog hides and `saveAndLoadAnalytics` is called when the "Save Preferences" button is clicked'
)

test.todo(
  'clicking "X" in top right corner displays the cancellation confirmation dialog and hides the main dialog'
)

test.todo(
  'clicking "Cancel" at the bottom displays the cancellation confirmation dialog and hides the manage preferences dialog'
)

test.todo(
  'within the cancellation confirmation dialog, clicking "Back to Preferences" hides the cancellation confirmation dialog and brings back the manage preferences dialog'
)

test.todo(
  'within the cancellation confirmation dialog, clicking "Agree and Close" calls `saveAndLoadAnalytics` and closes the dialog'
)

test.todo(
  'when the "Agree and Close" button is clicked, `saveAndLoadAnalytics` runs and the dialog is closed'
)
