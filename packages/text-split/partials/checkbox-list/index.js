import className from 'classnames'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import SvgrCheckCircle from './icons/check-circle.svg.jsx'

function CheckboxList({ items, theme, product }) {
  const validItems = items && items.filter((l) => l !== '')
  const hasItems = validItems && validItems.length > 0
  if (!hasItems) return null
  const { themeClass } = useProductMeta(product) // overrides base --brand with product colors
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
      <SvgrCheckCircle className={`theme-${theme}`} />
      <span className={`text g-type-body theme-${theme}`}>{text}</span>
    </li>
  )
}

export default CheckboxList
