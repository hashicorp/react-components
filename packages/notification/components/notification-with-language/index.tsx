/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Image from 'next/legacy/image'
import type {
  NotificationWithLanguageProps,
  NotificationLanguages,
} from '../../types'
import Notification from '../notification'
import DeFlag from './flags/de.svg'
import EnFlag from './flags/en.svg'
import FrFlag from './flags/fr.svg'
import JpFlag from './flags/jp.svg'
import KrFlag from './flags/kr.svg'
import PtFlag from './flags/pt.svg'
import EsFlag from './flags/es.svg'
import s from '../style.module.css'

const LANGUAGE_MAP: { [key in NotificationLanguages]: string } = {
  de: DeFlag,
  en: EnFlag,
  fr: FrFlag,
  jp: JpFlag,
  kr: KrFlag,
  pt: PtFlag,
  es: EsFlag,
}

export default function NotificationWithLanguage(
  props: NotificationWithLanguageProps
) {
  const { language, ...rest } = props
  return (
    <Notification {...rest}>
      <div className={s.language}>
        <Image
          src={LANGUAGE_MAP[language]}
          width="24"
          height="18"
          alt={language}
        />
      </div>
    </Notification>
  )
}
