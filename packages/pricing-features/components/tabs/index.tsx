import { useState, ReactElement } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsOrientation,
} from '@reach/tabs'
import classNames from 'classnames'
import { LabelProps } from '../../types'
import s from './style.module.css'

interface PricingFeatureTabsProps {
  tabs: Array<{
    label: LabelProps
    content: ReactElement
  }>
}

export default function PricingFeatureTabs({ tabs }: PricingFeatureTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const handleTabChange = (index: number) => setActiveTabIndex(index)
  const tabCount = tabs.length

  if (tabCount > 7 || tabCount < 2) {
    throw new Error('<PricingFeatureTabs /> only supports between 2 and 7 tabs')
  }

  return (
    <Tabs
      className={s.tabs}
      index={activeTabIndex}
      onChange={handleTabChange}
      orientation={TabsOrientation.Horizontal}
    >
      <TabList
        className={s.tabList}
        style={
          {
            '--col': tabCount,
            '--tab-padding':
              tabCount > 3 ? '12px 12px 32px 12px' : '22px 22px 42px 22px',
          } as React.CSSProperties
        }
      >
        {tabs.map(({ label }, index) => (
          <Tab
            className={classNames(s.tab, {
              [s.active]: index === activeTabIndex,
            })}
            key={label.heading}
          >
            <div className={s.labelIcon}>{label.icon}</div>
            <span className={s.labelHeading}>{label.heading}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels className={s.tabPanels}>
        {tabs.map((item, index) => {
          return (
            <TabPanel
              key={item.label.heading}
              className={classNames({
                [s.fadeIn]: index === activeTabIndex,
              })}
            >
              {item.content}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
