/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import Image from 'next/image'
import LoadingSpinner from '../../svg/loading-spinner.svg'
import GithubIcon from '../../svg/github-icon.svg'
import XIcon from '../../svg/x-icon.svg'
import s from './style.module.css'

function Icon({ icon, isHovered }) {
  if (icon == 'loading') {
    return <Image className={s.loadingIcon} {...LoadingSpinner} />
  }
  if (icon == 'github') {
    return (
      <Image
        className={s.githubIcon}
        {...GithubIcon}
        data-hovered={isHovered}
      />
    )
  }
  return <Image className={s.xIcon} {...XIcon} data-hovered={isHovered} />
}

export default Icon
