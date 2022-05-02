import * as React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import type {
  NotificationProps,
  NotificationProducts,
  NotificationTypes,
  NotificationLanguages,
} from './types'
import Button from '@hashicorp/react-button'
import CloseButton from '@hashicorp/react-close-button'
// Product icons
import { IconBoundaryColor24 } from '@hashicorp/flight-icons/svg-react/boundary-color-24'
import { IconConsulColor24 } from '@hashicorp/flight-icons/svg-react/consul-color-24'
import { IconNomadColor24 } from '@hashicorp/flight-icons/svg-react/nomad-color-24'
import { IconPackerColor24 } from '@hashicorp/flight-icons/svg-react/packer-color-24'
import { IconTerraformColor24 } from '@hashicorp/flight-icons/svg-react/terraform-color-24'
import { IconVaultColor24 } from '@hashicorp/flight-icons/svg-react/vault-color-24'
import { IconVagrantColor24 } from '@hashicorp/flight-icons/svg-react/vagrant-color-24'
import { IconWaypointColor24 } from '@hashicorp/flight-icons/svg-react/waypoint-color-24'
// Map icons
import DeFlag from './flags/de.svg'
import EnFlag from './flags/en.svg'
import FrFlag from './flags/fr.svg'
import JpFlag from './flags/jp.svg'
import KrFlag from './flags/kr.svg'
// Type icons
import { IconRadio16 } from '@hashicorp/flight-icons/svg-react/radio-16'
import { IconCalendar16 } from '@hashicorp/flight-icons/svg-react/calendar-16'
import { IconGuide16 } from '@hashicorp/flight-icons/svg-react/guide-16'
import s from './style.module.css'

const LANGUAGE_MAP: { [key in NotificationLanguages]: React.ReactNode } = {
  de: DeFlag,
  en: EnFlag,
  fr: FrFlag,
  jp: JpFlag,
  kr: KrFlag,
}

const TYPE_MAP: {
  [key in NotificationTypes]: {
    name: string
    icon: React.ReactNode
  }
} = {
  podcast: {
    name: 'Podcast',
    icon: <IconRadio16 />,
  },
  webinar: {
    name: 'Webinar',
    icon: <IconCalendar16 />,
  },
  whitepaper: {
    name: 'Whitepaper',
    icon: <IconGuide16 />,
  },
}

const PRODUCT_MAP: {
  [key in NotificationProducts]: {
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

export default function Notification({
  appearance = 'light',
  thumbnail,
  language,
  type,
  product,
  description,
  onDismiss,
  cta,
}: NotificationProps) {
  return (
    <div className={classNames(s.notification, s[appearance])}>
      <CloseButton
        appearance={appearance}
        onClick={onDismiss}
        ariaLabel="Dimiss notification"
        className={s.closeButton}
      />
      {thumbnail ? (
        <div className={s.thumbnail}>
          <Image
            src={thumbnail.src}
            width={800}
            height={600}
            objectFit="cover"
            alt={thumbnail.alt}
          />
        </div>
      ) : null}
      <div className={s.content}>
        {language ? (
          <div className={s.language}>
            <Image src={LANGUAGE_MAP[language]} width="24" height="18" alt="" />
          </div>
        ) : null}
        {type ? (
          <div className={s.type}>
            <span className={s.typeIcon}>{TYPE_MAP[type].icon}</span>
            <span className={s.typeName}>{TYPE_MAP[type].name}</span>
          </div>
        ) : null}
        {product ? (
          <div className={s.product}>
            <span className={s.productIcon}>{PRODUCT_MAP[product].icon}</span>{' '}
            <span className={s.productName}>{PRODUCT_MAP[product].name}</span>
          </div>
        ) : null}
        <p className={s.description}>{description}</p>
        <div className={s.cta}>
          <Button
            title={cta.title}
            url={cta.url}
            linkType="inbound"
            size="small"
            theme={{
              variant: appearance === 'dark' ? 'tertiary-neutral' : 'tertiary',
              background: appearance,
            }}
          />
        </div>
      </div>
    </div>
  )
}
