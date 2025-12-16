/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
