import classNames from 'classnames'
import InlineSvg from '@hashicorp/react-inline-svg'
import SvgChevronDown from './icons/chevron-down.svg?include'
import NavItemText from '../nav-item-text'
import s from './style.module.css'

function DropdownTrigger(props) {
  const { onClick, isCollapsed, text, isActive } = props
  return (
    <button
      className={classNames(s.root, { [s.isCollapsed]: isCollapsed })}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <NavItemText isActive={isActive} text={text} />
      <InlineSvg src={SvgChevronDown} />
    </button>
  )
}

export default DropdownTrigger
