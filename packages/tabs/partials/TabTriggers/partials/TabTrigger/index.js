import Tippy from '@tippy.js/react'
import TooltipIcon from './icons/tooltip.svg.js'

const TabTrigger = (props) => {
  const { item, activeTabIdx, setActiveTab, activeTabGroup } = props
  const isActiveTab = item.group
    ? item.group === activeTabGroup
    : item.tabIndex === activeTabIdx

  // TODO: need to check if multiple tabs are 'active'
  // should this controller be at the base level??
  // and just pass down 'isActive' & 'setIsActive' to this level
  // lots of edge cases to consider here, should the path reset if a new
  // non-path item is selected?

  return (
    <button
      className={`g-tab-trigger ${isActiveTab ? ' active' : ''}`}
      data-tabindex={item.tabIndex}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setActiveTab(item.tabIndex, item.group)}
    >
      <span className="inner">
        <span className="g-type-body-strong">{item.heading}</span>
        {item.tooltip && (
          <Tippy
            className="g-tab-trigger-tippy-tooltip"
            content={item.tooltip}
            animation="fade"
            arrow={true}
            placement="top"
            hideOnClick={false}
          >
            <span
              data-testid="tooltip-icon"
              className="tooltip"
              dangerouslySetInnerHTML={{ __html: TooltipIcon }}
            />
          </Tippy>
        )}
      </span>
    </button>
  )
}

export default TabTrigger
