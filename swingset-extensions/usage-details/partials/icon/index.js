import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import s from './style.module.css'

function Icon({ icon, isHovered }) {
  if (icon == 'loading') {
    return (
      <InlineSvg
        className={s.loadingIcon}
        src={require('../../svg/loading-spinner.svg?include')}
      />
    )
  }
  if (icon == 'github') {
    return (
      <InlineSvg
        className={s.githubIcon}
        src={require('../../svg/github-icon.svg?include')}
        data-hovered={isHovered}
      />
    )
  }
  return (
    <InlineSvg
      className={s.xIcon}
      src={require('../../svg/x-icon.svg?include')}
      data-hovered={isHovered}
    />
  )
}

export default Icon
