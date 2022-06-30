import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import type { TierCardProps } from './types'
import s from './style.module.css'

export default function TierCard({
  icon,
  title,
  label,
  price,
  consumption,
  description,
  cta,
  supplementaryInfo,
  size,
}: TierCardProps): React.ReactElement {
  return <div className={s.root} />
}
