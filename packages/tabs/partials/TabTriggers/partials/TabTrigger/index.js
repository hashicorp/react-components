import { useEffect } from 'react'
import Tippy from '@tippy.js/react'
import TooltipIcon from './icons/tooltip.svg.js'
import { useTabGroups } from '../../../../provider.js'

const TabTrigger = (props) => {
  const { tab, activeTabIdx, setActiveTab } = props
  const groupCtx = useTabGroups()
  const activeGroup = groupCtx?.activeTabGroup
  const isInActiveGroup = groupCtx && tab.group && tab.group === activeGroup
  const isActiveIndex = tab.index === activeTabIdx
  const isActiveTab = isInActiveGroup || isActiveIndex ? true : false

  useEffect(() => {
    // if the tab is active based on group and the
    // index doesn't match, update the active index
    if (isInActiveGroup) !isActiveIndex && setActiveTab(tab.index)
  }, [activeGroup])

  return (
    <button
      className={`g-tab-trigger ${isActiveTab ? ' active' : ''}`}
      data-tabindex={tab.index}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setActiveTab(tab.index, tab.group)}
    >
      <span className="inner">
        <span className="g-type-body-strong">{tab.heading}</span>
        {tab.tooltip && (
          <Tippy
            className="g-tab-trigger-tippy-tooltip"
            content={tab.tooltip}
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
