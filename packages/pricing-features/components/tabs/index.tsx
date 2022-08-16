import { useState, ReactNode } from 'react'
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
    content: ReactNode
  }>
}

export default function PricingFeatureTabs({ tabs }: PricingFeatureTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const handleTabChange = (index: number) => setActiveTabIndex(index)
  const tabsLength = tabs.length

  if (tabsLength > 7 || tabsLength < 2) {
    throw new Error('<PricingFeatureTabs /> only supports between 2 and 7 tabs')
  }

  return (
    <Tabs
      className={s.tabs}
      index={activeTabIndex}
      onChange={handleTabChange}
      orientation={TabsOrientation.Horizontal}
      data-testid="pricing-feature-tabs"
    >
      <TabList
        className={s.tabList}
        style={
          {
            '--col': tabsLength,
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
