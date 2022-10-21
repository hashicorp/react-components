import type { ProductsUsedProps } from './types'
import { IconBoundaryColor16 } from '@hashicorp/flight-icons/svg-react/boundary-color-16'
import { IconConsulColor16 } from '@hashicorp/flight-icons/svg-react/consul-color-16'
import { IconNomadColor16 } from '@hashicorp/flight-icons/svg-react/nomad-color-16'
import { IconPackerColor16 } from '@hashicorp/flight-icons/svg-react/packer-color-16'
import { IconTerraformColor16 } from '@hashicorp/flight-icons/svg-react/terraform-color-16'
import { IconVaultColor16 } from '@hashicorp/flight-icons/svg-react/vault-color-16'
import { IconVagrantColor16 } from '@hashicorp/flight-icons/svg-react/vagrant-color-16'
import { IconWaypointColor16 } from '@hashicorp/flight-icons/svg-react/waypoint-color-16'
import classNames from 'classnames'
import s from './style.module.css'

const ProductIconMap = {
  boundary: <IconBoundaryColor16 />,
  consul: <IconConsulColor16 />,
  nomad: <IconNomadColor16 />,
  packer: <IconPackerColor16 />,
  terraform: <IconTerraformColor16 />,
  vault: <IconVaultColor16 />,
  vagrant: <IconVagrantColor16 />,
  waypoint: <IconWaypointColor16 />,
}

const ProductsUsed = ({
  appearance = 'light',
  products,
}: ProductsUsedProps) => {
  const eyebrowText = 'Products used'

  // Products with links have different spacing between each other (8px) than
  // products without links (16px). This spacing is set on the `ul` using the `gap` property.
  // This logic determines whether or not products have links so as to conditionally change
  // the spacing.
  const productsHaveLinks = products[0]?.hasOwnProperty('href')

  return (
    <div className={classNames([s.root, s[appearance]])} data-testid="root">
      <p className={classNames([s.eyebrow, s[appearance]])}>{eyebrowText}</p>
      <ul
        className={classNames([s.productList], {
          [s.isSmallerGap]: productsHaveLinks,
        })}
      >
        {products.map((product, index) => {
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <ConditionalLink
                className={classNames([s.product, s[appearance]])}
                href={product.href}
              >
                <span className={s.productIcon}>
                  {ProductIconMap[product.name]}
                </span>
                <span className={classNames([s.productName, s[appearance]])}>
                  {product.name}
                </span>
              </ConditionalLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const ConditionalLink = ({ href, children, className }) => {
  return href ? (
    <a href={href} className={className} data-testid={'anchorEl'}>
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  )
}

export default ProductsUsed
