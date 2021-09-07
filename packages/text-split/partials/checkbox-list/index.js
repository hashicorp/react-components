import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import CheckSquare from './icons/check-square.svg?include'
import s from './style.module.css'

function CheckboxList({ items, theme, product }) {
  const validItems = items && items.filter((l) => l !== '')
  const hasItems = validItems && validItems.length > 0
  const { themeClass } = useProductMeta(product) // overrides base --brand with product colors
  if (!hasItems) return null
  return (
    <ul
      className={classNames(s.checkboxList, themeClass)}
      data-testid="checkbox-list"
    >
      {items.map((i, stableIdx) => (
        // eslint-disable-next-line react/no-array-index-key
        <CheckboxItem key={stableIdx} text={i} theme={theme} />
      ))}
    </ul>
  )
}

function CheckboxItem({ text, theme }) {
  return (
    <li className={classNames(s.checkboxItem, s[`theme-${theme}`])}>
      <InlineSvg className={s.checkIcon} src={CheckSquare} />
      <span className={s.text}>{text}</span>
    </li>
  )
}

export default CheckboxList
