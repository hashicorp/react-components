import type { ButtonProductAttributionProps } from './types'
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
    <button className={s.root}>
      <span
        aria-label={productName}
        role="img"
        className={s.icon}
        style={iconStyles}
      />
      <span className={s.productName}>{productName}</span>
    </button>
  )
}

export default ButtonProductAttribution
