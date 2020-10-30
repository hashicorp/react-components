import SvgrCheckCircle from './icons/check-circle.svg.jsx'

function CheckboxList(props) {
  const { items, theme, brand } = props
  const validItems = items && items.filter((l) => l !== '')
  const hasItems = validItems && validItems.length > 0
  if (!hasItems) return null
  return (
    <ul className="checkbox-list" data-testid="checkbox-list">
      {items.map((i, stableIdx) => (
        // eslint-disable-next-line react/no-array-index-key
        <CheckboxItem key={stableIdx} text={i} theme={theme} brand={brand} />
      ))}
    </ul>
  )
}

function CheckboxItem(props) {
  const { text, theme, brand } = props
  return (
    <li className={`checkbox-item theme-${theme} brand-${brand}`}>
      <SvgrCheckCircle className={`theme-${theme} brand-${brand}`} />
      <span className={`text g-type-body theme-${theme}`}>{text}</span>
    </li>
  )
}

export default CheckboxList
