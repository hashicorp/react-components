import React from 'react'
import classNames from 'classnames'
import s from './style.module.css'

function TabsAsTabs({ tabLabels, activeTabIdx, setActiveTabIdx, hasHeading }) {
  return (
    <div className={classNames(s.tabsAsTabs, { [s.hasHeading]: hasHeading })}>
      {tabLabels.map((tabLabel, idx) => {
        const isActive = idx == activeTabIdx
        return (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={classNames(
              s.tabControl,
              { [s.isActive]: isActive },
              { [s.hasHeading]: hasHeading }
            )}
            onClick={() => setActiveTabIdx(idx)}
          >
            {tabLabel}
          </button>
        )
      })}
    </div>
  )
}

export default TabsAsTabs
