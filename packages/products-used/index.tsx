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

  return (
    <div className={classNames([s.root, s[appearance]])} data-testid="root">
      <p className={classNames([s.eyebrow, s[appearance]])}>{eyebrowText}</p>
      <ul className={s.productList}>
        {products.map((product, index) => {
          const isLink = !!product.href

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={classNames([
                s.product,
                s.isVerticallyCentered,
                s[appearance],
                { [s.isLink]: isLink },
              ])}
            >
              <ConditionalLink href={product.href}>
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

const ConditionalLink = ({ href, children }) => {
  return href ? (
    <a href={href} className={s.isVerticallyCentered} data-testid={'anchorEl'}>
      {children}
    </a>
  ) : (
    children
  )
}

export default ProductsUsed
