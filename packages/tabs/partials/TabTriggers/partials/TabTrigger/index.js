import { useEffect } from 'react'
import Tippy from '@tippy.js/react'
import TooltipIcon from './icons/tooltip.svg.js'
import { useTabGroups } from '../../../../provider.js'

const TabTrigger = (props) => {
  const { item, activeTabIdx, setActiveTab } = props
  const groupCtx = useTabGroups()
  const activeGroup = groupCtx?.activeTabGroup
  const isInActiveGroup = groupCtx && item.group && item.group === activeGroup
  const isActiveIndex = item.tabIndex === activeTabIdx
  const isActiveTab = isInActiveGroup || isActiveIndex ? true : false

  useEffect(() => {
    // if the tab is active based on group and the
    // index doesn't match, update the active index
    if (isInActiveGroup) !isActiveIndex && setActiveTab(item.tabIndex)
  }, [activeGroup])

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
