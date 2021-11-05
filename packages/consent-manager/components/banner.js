import s from './banner.module.css'

export default function ConsentBanner({
  privacyPolicyLink,
  cookiePolicyLink,
  onManagePreferences,
  onAccept,
}) {
  return (
    <div className={s.root} data-testid="consent-banner">
      <div className={s.innerContainer}>
        <span>
          We use cookies & other similar technology to collect data to improve
          your experience on our site, as described in our{' '}
          <a
            href={privacyPolicyLink}
            className={s.link}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="privacy-policy"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href={cookiePolicyLink}
            className={s.link}
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
            className={s.manageButton}
            onClick={onManagePreferences}
            data-testid="manage-preferences"
          >
            Manage Preferences
          </button>
          <button
            className={s.acceptButton}
            onClick={onAccept}
            data-testid="accept"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
