/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import s from './style.module.css'

interface TabsAsDropdownProps {
  tabLabels: string[]
  setActiveTabIdx: (tabIdx: number) => void
  hasHeading: boolean
}

function TabsAsDropdown({
  tabLabels,
  setActiveTabIdx,
  hasHeading,
}: TabsAsDropdownProps) {
  return (
    <div
      className={classNames(s.tabsAsDropdown, { [s.hasHeading]: hasHeading })}
    >
      <select
        className={s.listboxButton}
        onChange={(e) => setActiveTabIdx(parseInt(e.target.value, 10))}
      >
        {tabLabels.map((tabLabel, idx) => (
          <option key={tabLabel} value={idx}>
            {tabLabel}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TabsAsDropdown
