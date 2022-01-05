import React, { useEffect } from 'react'
import TooltipIcon from '../../icons/tooltip.svg?include'
import Tooltip from '../tooltip'
import { useTabGroups } from '../../provider.js'
import s from './style.module.css'
import classNames from 'classnames'

export interface TabTriggerType {
  index: number
  group?: string
  heading: string
  tooltip?: string
}

interface TabTriggerProps {
  tab: TabTriggerType
  hasOverflow: boolean
  activeTabIdx: number
  setActiveTab: (tabIndex: number, tabGroup?: string) => void
  theme?: 'light' | 'dark'
}

function TabTrigger({
  tab,
  hasOverflow,
  activeTabIdx,
  setActiveTab,
  theme = 'light',
}: TabTriggerProps): React.ReactElement {
  const groupCtx = useTabGroups()
  const activeGroup = groupCtx?.activeTabGroup
  const isInActiveGroup = groupCtx && tab.group && tab.group === activeGroup
  const isActiveIndex = tab.index === activeTabIdx
  const isActiveTab = isInActiveGroup || isActiveIndex ? true : false

  useEffect(() => {
    // if the tab is active based on group and the
    // index doesn't match, update the active index
    if (isInActiveGroup) !isActiveIndex && setActiveTab(tab.index)
  }, [isInActiveGroup, isActiveIndex, setActiveTab, tab.index])

  return (
    <button
      className={classNames(s.root, {
        [s.isActiveTab]: isActiveTab,
        [s.hasOverflow]: hasOverflow,
      })}
      data-heap-track="TabClick"
      data-tabindex={tab.index}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => setActiveTab(tab.index, tab.group)}
    >
      <span className={s.inner}>
        <span className="g-type-body-strong">{tab.heading}</span>
        {tab.tooltip && (
          <Tooltip label={tab.tooltip} aria-label={tab.tooltip} theme={theme}>
            <span
              data-testid="tooltip-icon"
              className={s.tooltipTrigger}
              dangerouslySetInnerHTML={{ __html: TooltipIcon }}
            />
          </Tooltip>
        )}
      </span>
    </button>
  )
}

export default TabTrigger
