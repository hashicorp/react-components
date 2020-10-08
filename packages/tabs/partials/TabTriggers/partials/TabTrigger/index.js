import React from 'react'
import Tippy from '@tippy.js/react'
import TooltipIcon from './icons/tooltip.svg.js'

const TabTrigger = props => {
  const { item, activeTabIdx, setActiveTabIdx } = props
  const isActiveTab = item.tabIndex === activeTabIdx
  return (
    <button
      className={`g-tab-trigger ${isActiveTab ? ' active' : ''}`}
      data-tabindex={item.tabIndex}
      onMouseDown={e => e.preventDefault()}
      onClick={() => setActiveTabIdx(item.tabIndex)}
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
