import Alert from '@hashicorp/react-alert'
import { useRouter } from 'next/router'
import { getVersionFromPath } from '@hashicorp/versioned-docs/client'
import s from './style.module.css'

export default function VersionAlert({ product }) {
  const router = useRouter()
  const versionInPath = getVersionFromPath(router.asPath)

  if (!versionInPath) return null

  const currentUrl = `/${router.asPath.split('/')[1]}`

  return (
    <div className={s.wrapper}>
      <Alert
        url={currentUrl}
        tag="old version"
        text={`You're looking at documentation for ${product} ${versionInPath}. Click here to view the latest content.`}
        state="warning"
        textColor="dark"
      />
    </div>
  )
}
