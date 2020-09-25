import InlineSvg from '@hashicorp/react-inline-svg'
import SvgChevronDown from '../../icons/chevron-down.svg.js'

function DropdownTrigger(props) {
  const { onClick, isCollapsed, text, brand, isActive } = props
  return (
    <button
      className={`dropdown-trigger g-type-body-small-strong brand-${brand} style-menu-item ${
        isCollapsed ? 'is-collapsed' : ''
      } ${isActive ? 'is-active' : ''}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <span className={`text brand-${brand}`}>{text}</span>
      <InlineSvg src={SvgChevronDown} />
    </button>
  )
}

export default DropdownTrigger
