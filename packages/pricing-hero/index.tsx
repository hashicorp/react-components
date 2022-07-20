import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'
import PricingTierList, {
  PricingTierStickyTray,
} from '@hashicorp/react-pricing-tier-list'
import InlineSvg from '@hashicorp/react-inline-svg'
import { IconBoundaryColor24 } from '@hashicorp/flight-icons/svg-react/boundary-color-24'
import { IconConsulColor24 } from '@hashicorp/flight-icons/svg-react/consul-color-24'
import { IconNomadColor24 } from '@hashicorp/flight-icons/svg-react/nomad-color-24'
import { IconPackerColor24 } from '@hashicorp/flight-icons/svg-react/packer-color-24'
import { IconTerraformColor24 } from '@hashicorp/flight-icons/svg-react/terraform-color-24'
import { IconVaultColor24 } from '@hashicorp/flight-icons/svg-react/vault-color-24'
import { IconVagrantColor24 } from '@hashicorp/flight-icons/svg-react/vagrant-color-24'
import { IconWaypointColor24 } from '@hashicorp/flight-icons/svg-react/waypoint-color-24'
import { PricingHeroProps, PricingHeroProducts } from './types'
import s from './style.module.css'

const PRODUCT_ICON_MAP: {
  [key in PricingHeroProducts]: React.ReactNode
} = {
  boundary: <IconBoundaryColor24 />,
  consul: <IconConsulColor24 />,
  nomad: <IconNomadColor24 />,
  packer: <IconPackerColor24 />,
  terraform: <IconTerraformColor24 />,
  vault: <IconVaultColor24 />,
  vagrant: <IconVagrantColor24 />,
  waypoint: <IconWaypointColor24 />,
}

export default function PricingHero({
  backgroundAccentColor,
  product,
  title,
  tiers,
}: PricingHeroProps) {
  const [trayIsVisible, setTrayIsVisible] = useState(false)
  const [ref, isInView] = useInView({
    root: null,
    threshold: 1,
    trackVisibility: true,
    delay: 100,
  })

  useEffect(() => {
    setTrayIsVisible(!isInView)
  }, [isInView])

  return (
    <>
      <header
        className={s.hero}
        style={
          {
            '--background-accent-color': backgroundAccentColor,
          } as React.CSSProperties
        }
      >
        <div className={s.accent}>
          {/* <Image
            src={require('./img/hero-accent.svg')}
            width={684}
            height={392}
            alt=""
            priority={true}
          /> */}
          <InlineSvg
            className={s.cardFooterArrow}
            src={require('./img/hero-accent.svg?include')}
          />
        </div>
        <div className={s.container}>
          <div className={s.titleContent}>
            <span className={s.productIcon}>{PRODUCT_ICON_MAP[product]}</span>{' '}
            <h1 className={s.title}>{title}</h1>
          </div>
          <div className={s.pricingTierListContainer}>
            <PricingTierList tiers={tiers} />
          </div>
        </div>
        <div className={s.intersectionTrigger} ref={ref} aria-hidden="true" />
      </header>
      <div
        className={classNames(
          s.pricingTrayContainer,
          trayIsVisible && s.trayIsVisible
        )}
      >
        <PricingTierStickyTray
          tiers={tiers.map(({ title, cta }) => ({ title, cta }))}
        />
      </div>
    </>
  )
}
