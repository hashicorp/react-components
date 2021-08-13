import className from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import CheckSquare from './icons/check-square.svg?include'

function CheckboxList({ items, theme, product }) {
  const validItems = items && items.filter((l) => l !== '')
  const hasItems = validItems && validItems.length > 0
  const { themeClass } = useProductMeta(product) // overrides base --brand with product colors
  if (!hasItems) return null
  return (
    <ul
      className={className('checkbox-list', themeClass)}
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
    <li className={`checkbox-item theme-${theme} `}>
      <InlineSvg className={`check-icon theme-${theme}`} src={CheckSquare} />
      <span className={`text g-type-body theme-${theme}`}>{text}</span>
    </li>
  )
}

export default CheckboxList
