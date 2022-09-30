import type { ButtonProductAttributionProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'

const ButtonProductAttribution = ({
  appearance = 'light',
  productName,
}: ButtonProductAttributionProps) => {
  const iconPath = `url(https://www.hashicorp.com/img/flight-icons/${productName}-color-24.svg)`
  const iconStyles = {
    '--icon': iconPath,
  } as React.CSSProperties

  return (
    <button className={classNames([s.root, s[appearance]])}>
      <span
        aria-label={productName}
        role="img"
        className={s.icon}
        style={iconStyles}
      />
      <span className={classNames([s.productName, s[appearance]])}>
        {productName}
      </span>
    </button>
  )
}

export default ButtonProductAttribution
