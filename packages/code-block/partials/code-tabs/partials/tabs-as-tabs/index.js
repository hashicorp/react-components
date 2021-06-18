import React from 'react'
import classNames from 'classnames'
import s from './style.module.css'

function TabsAsTabs({ tabLabels, activeTabIdx, setActiveTabIdx }) {
  return (
    <div className={s.tabsAsTabs}>
      {tabLabels.map((tabLabel, idx) => {
        const isActive = idx == activeTabIdx
        return (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={classNames(s.tabControl, { [s.isActive]: isActive })}
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
