import { useState } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsOrientation,
} from '@reach/tabs'
import classNames from 'classnames'
// import { PricingFeatureTabsProps } from './types'
import s from './style.module.css'

export default function PricingFeatureTabs({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const handleTabChange = (index) => setActiveTabIndex(index)
  const tabsLength = tabs.length

  if (tabsLength > 7 || tabsLength < 2) {
    throw new Error('<PricingFeatureTabs /> only supports between 3 and 7 tabs')
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
            <div className={s.iconWrapper}>{label.icon}</div>
            <span className={s.featureText}>{label.heading}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels className={s.tabPanels}>
        {tabs.map((item, index) => {
          return (
            <TabPanel
              key={item.label.feature}
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
