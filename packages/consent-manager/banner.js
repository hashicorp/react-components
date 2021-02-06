export default function ConsentBanner({
  privacyPolicyLink,
  onManagePreferences,
  onAccept,
}) {
  return (
    <div
      className="g-consent-manager-banner flex-centered-row"
      data-testid="consent-banner"
    >
      <span>
        We use cookies & other similar technology to collect data to improve
        your experience on our site, as described in our{' '}
        <a
          href={privacyPolicyLink}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="privacy-policy"
        >
          Privacy Policy
        </a>
        .
      </span>
      <div>
        {/* TODO: this should most likely be a button (https://app.asana.com/0/1100423001970639/1199667739287943/f) */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="manage-link"
          onClick={onManagePreferences}
          data-testid="manage-preferences"
        >
          Manage Preferences
        </a>
        <button onClick={onAccept} data-testid="accept">
          Accept
        </button>
      </div>
    </div>
  )
}
