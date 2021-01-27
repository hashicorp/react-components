import Tippy from '@tippy.js/react'
import TooltipIcon from './icons/tooltip.svg.js'

const TabTrigger = (props) => {
  const { item, activeTabIdx, setActiveTab, activeTabGroup } = props
  function isActiveTab() {
    let active = false
    const isInActiveGroup = !!item.group && item.group === activeTabGroup

    if (isInActiveGroup) {
      active = true
      // if the tab is active based on group and the
      // index doesn't match, update the active index
      item.tabIndex !== activeTabIdx && setActiveTab(item.tabIndex)
    } else if (item.tabIndex === activeTabIdx) {
      active = true
    }

    return active
  }

  return (
    <button
      className={`g-tab-trigger ${isActiveTab() ? ' active' : ''}`}
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
