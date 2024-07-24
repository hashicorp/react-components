import React from 'react'
import Link from 'next/link'
import * as NavPanel from '../panel'
import Promo, { type PromoProps } from '../promo'
import { Products } from '@hashicorp/platform-product-meta'
import FlightIcon from '@hashicorp/react-design-system-components/src/components/flight-icon'
import { TextPlus } from '@hashicorp/react-design-system-components/src/components/text'
import s from './style.module.css'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

const PRODUCT_LOGO_MAP = new Map([
  ['Terraform', 'terraform-fill-color'],
  ['Packer', 'packer-fill-color'],
  ['Vault', 'vault-fill-color'],
  ['Boundary', 'boundary-fill-color'],
  ['Consul', 'consul-fill-color'],
  ['Nomad', 'nomad-fill-color'],
  ['Waypoint', 'waypoint-fill-color'],
  ['Vagrant', 'vagrant-fill-color'],
])

interface ProductsPanelProps {
  productCategories: any
  promo?: PromoProps
  parseUrl?: (url: string) => {
    linkType: 'inbound' | 'outbound'
    href: string
  }
  trackNavClickEvent?: (name: string, href: string, section?: string) => void
  v?: (text: string) => string
}

const ProductsPanel = ({
  productCategories,
  promo,
  parseUrl,
  trackNavClickEvent,
  v,
}: ProductsPanelProps) => {
  return (
    <NavPanel.Root>
      <NavPanel.Column>
        <ul className={s.productCategories}>
          {productCategories.map(({ title, products }) => {
            return (
              <li key={title} className={s.productCategory}>
                <TextPlus.Body className={s.eyebrow}>{title}</TextPlus.Body>
                <ul className={s.productList}>
                  {products.map((product) => {
                    return (
                      <li key={product.url}>
                        <NavProduct
                          {...product}
                          parseUrl={parseUrl}
                          trackNavClickEvent={trackNavClickEvent}
                        />
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </NavPanel.Column>
      {promo ? (
        <Promo
          {...promo}
          parseUrl={parseUrl}
          trackNavClickEvent={trackNavClickEvent}
          v={v}
        />
      ) : null}
    </NavPanel.Root>
  )
}

export interface NavProductProps {
  url: string
  product: Products | string
  description: string
  parseUrl?: (url: string) => {
    linkType: 'inbound' | 'outbound'
    href: string
  }
  trackNavClickEvent?: (name: string, href: string, section?: string) => void
}

function NavProduct({
  url,
  product,
  description,
  parseUrl,
  trackNavClickEvent,
}: NavProductProps) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={parseUrl ? parseUrl(url).href : url}
        onClickCapture={() => {
          trackNavClickEvent && trackNavClickEvent(product, url, 'products')
        }}
        className={s.focusIndicator}
        passHref
      >
        <div className={s.productWrapper}>
          <div className={s.productLogo}>
            <FlightIcon
              name={PRODUCT_LOGO_MAP.get(product) ?? 'hashicorp-fill-color'}
            />
          </div>
          <div className={s.productTextContent}>
            <span>{product}</span>
            <span className={s.productDesc}>{description}</span>
          </div>
        </div>
      </Link>
    </NavigationMenu.Link>
  )
}

export default ProductsPanel
