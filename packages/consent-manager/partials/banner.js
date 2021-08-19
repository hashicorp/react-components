export default function ConsentBanner({
  privacyPolicyLink,
  cookiePolicyLink,
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
        </a>{' '}
        and{' '}
        <a
          href={cookiePolicyLink}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cookie-policy"
        >
          Cookie Policy
        </a>
        .
      </span>
      <div>
        <button
          className="manage-link"
          onClick={onManagePreferences}
          data-testid="manage-preferences"
        >
          Manage Preferences
        </button>
        <button onClick={onAccept} data-testid="accept">
          Accept
        </button>
      </div>
    </div>
  )
}
