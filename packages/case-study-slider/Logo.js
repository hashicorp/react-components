import React from 'react'
import Image from '@hashicorp/react-image'

export default function Logo({ dark, image }) {
  let logoType = dark ? 'whiteLogo' : 'monochromeLogo'
  return <Image {...image[logoType]} />
}
