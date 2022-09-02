import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { IconAlertCircle16 } from '@hashicorp/flight-icons/svg-react/alert-circle-16'
import { IconArrowRight16 } from '@hashicorp/flight-icons/svg-react/arrow-right-16'
import { DevDotCutoverAlertProps } from './types'
import ButtonLink from './button-link'
import StandaloneLink from './standalone-link'
import s from './style.module.css'

// This component should be deleted after dev dot migration is complete.
const DAYS_UNTIL_EXPIRE = 180

const getDevDotLink = (product, path, baseUrl) => {
  const pathWithoutProxy = path.includes('_proxied-dot-io')
    ? path.split('/').slice(3).join('/') // remove proxy path segments, which are present during SSR
    : path.slice(1) // remove leading slash
  const url = new URL(
    `/${product}/${pathWithoutProxy}`,
    baseUrl || 'https://developer.hashicorp.com'
  )
  url.searchParams.set('optInFrom', `${product}-io`)

  return url.toString()
}

export default function DevDotCutoverAlert({
  product,
  devDotCutoverInfo: { cutoverDate, baseUrl },
}: DevDotCutoverAlertProps) {
  const { asPath } = useRouter()
  const { name, slug } = product

  function handleOptIn() {
    // Set a cookie to ensure any future navigation will send them to dev dot
    Cookies.set(`${slug}-io-beta-opt-in`, true, {
      expires: DAYS_UNTIL_EXPIRE,
    })
  }

  return (
    <div className={s.root}>
      <div className={s.alertContainer}>
        <div className={s.icon}>
          <IconAlertCircle16 />
        </div>
        <div className={s.contentContainer}>
          <p className={s.title}>
            HashiCorp Developer, a unified practitioner experience is launching
            soon!
          </p>
          <p
            className={s.description}
          >{`${name} Docs content is being improved and migrated into our new developer experience. The migration will take place on ${cutoverDate}`}</p>
          <div className={s.actions}>
            <ButtonLink
              text="Migrate Now"
              href={getDevDotLink(slug, asPath, baseUrl)}
              onClick={handleOptIn}
              color="secondary"
              size="small"
            />
            <StandaloneLink
              icon={<IconArrowRight16 />}
              iconPosition="trailing"
              text="Learn More"
              href=""
              color="secondary"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
