import Cookies from 'js-cookie'
import { IconAlertCircleFill16 } from '@hashicorp/flight-icons/svg-react/alert-circle-fill-16'
import useProductMeta from '@hashicorp/platform-product-meta'
import s from './dev-dot-opt-in.module.css'

const DAYS_UNTIL_EXPIRE = 180

/**
 * Largely copied from: https://github.com/hashicorp/learn/pull/4480
 */
export default function DevDotOptIn({
  shouldRender,
  redirectLink,
}: {
  shouldRender: boolean
  redirectLink: string
}) {
  const { name, slug } = useProductMeta()

  if (!shouldRender) return null

  function handleOptIn() {
    // Set a cookie to ensure any future navigation will send them to dev dot
    Cookies.set(`${slug}-io-beta-opt-in`, true, {
      expires: DAYS_UNTIL_EXPIRE,
    })
  }

  return (
    <div className={s.container}>
      <IconAlertCircleFill16 className={s.icon} />
      <p className={s.alert}>
        The {name} website is being redesigned to help you find what you are
        looking for more effectively.
        <a className={s.optInLink} href={redirectLink} onClick={handleOptIn}>
          Join the Beta
        </a>
      </p>
    </div>
  )
}
