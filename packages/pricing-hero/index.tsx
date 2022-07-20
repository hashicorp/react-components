import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'
import useProductMeta, { Products } from '@hashicorp/platform-product-meta'
import PricingTierList from '@hashicorp/react-pricing-tier-list'
import PricingTierStickyTray from '@hashicorp/react-pricing-tier-list/components/pricing-sticky-tray'
import { IconBoundaryColor24 } from '@hashicorp/flight-icons/svg-react/boundary-color-24'
import { IconConsulColor24 } from '@hashicorp/flight-icons/svg-react/consul-color-24'
import { IconNomadColor24 } from '@hashicorp/flight-icons/svg-react/nomad-color-24'
import { IconPackerColor24 } from '@hashicorp/flight-icons/svg-react/packer-color-24'
import { IconTerraformColor24 } from '@hashicorp/flight-icons/svg-react/terraform-color-24'
import { IconVaultColor24 } from '@hashicorp/flight-icons/svg-react/vault-color-24'
import { IconVagrantColor24 } from '@hashicorp/flight-icons/svg-react/vagrant-color-24'
import { IconWaypointColor24 } from '@hashicorp/flight-icons/svg-react/waypoint-color-24'
import { PricingHeroProps } from './types'
import s from './style.module.css'

const PRODUCT_MAP: {
  [key in Products]: {
    name: string
    icon: React.ReactNode
  }
} = {
  boundary: {
    name: 'Boundary',
    icon: <IconBoundaryColor24 />,
  },
  consul: {
    name: 'Consul',
    icon: <IconConsulColor24 />,
  },
  nomad: {
    name: 'Nomad',
    icon: <IconNomadColor24 />,
  },
  packer: {
    name: 'Packer',
    icon: <IconPackerColor24 />,
  },
  terraform: {
    name: 'Terraform',
    icon: <IconTerraformColor24 />,
  },
  vault: {
    name: 'Vault',
    icon: <IconVaultColor24 />,
  },
  vagrant: {
    name: 'Vagrant',
    icon: <IconVagrantColor24 />,
  },
  waypoint: {
    name: 'Waypoint',
    icon: <IconWaypointColor24 />,
  },
}

export default function PricingHero({ title, tiers }: PricingHeroProps) {
  const { slug } = useProductMeta()
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
      <header className={s.hero}>
        <div className={s.accent}>
          <span>
            <Image
              src={require('./img/hero-accent.svg')}
              width={684}
              height={392}
              alt=""
              priority={true}
            />
          </span>
        </div>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>{title}</h1>
          </div>
          <div className={s.pricingTierList}>
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
