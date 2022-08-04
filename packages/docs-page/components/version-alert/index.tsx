import Alert from '@hashicorp/react-alert'
import { useRouter } from 'next/router'
import {
  getVersionFromPath,
  removeVersionFromPath,
} from '../version-select/util'
import s from './style.module.css'

export interface VersionAlertProps {
  tag: string
  text: string
}
export default function VersionAlert({ tag, text }: VersionAlertProps) {
  const router = useRouter()
  const versionInPath = getVersionFromPath(router.asPath)

  if (!versionInPath) return null

  return (
    <div className={s.wrapper}>
      {/* @ts-expect-error: explicitly not passing `product` */}
      <Alert
        url={removeVersionFromPath(router.asPath)}
        tag={tag}
        text={text}
        state="warning"
        textColor="dark"
      />
    </div>
  )
}
