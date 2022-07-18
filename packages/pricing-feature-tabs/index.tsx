import { useState } from 'react'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabsOrientation,
} from '@reach/tabs'
import { AnimateSharedLayout } from 'framer-motion'
import classNames from 'classnames'
import { PricingFeatureTabsProps } from './types'
import s from './style.module.css'

export default function PricingFeatureTabs({
  features,
}: PricingFeatureTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const handleTabChange = (index) => setActiveTabIndex(index)
  const featuresLength = features.length

  if (featuresLength > 7 || featuresLength < 3) {
    throw new Error('<PricingFeatureTabs /> only supports between 3 and 7 tabs')
  }

  return (
    <Tabs
      className={s.tabs}
      index={activeTabIndex}
      onChange={handleTabChange}
      orientation={TabsOrientation.Horizontal}
    >
      <AnimateSharedLayout>
        <TabList
          className={classNames(s.tabList, {
            [s.smList]: featuresLength < 4,
            [s.mdList]: featuresLength >= 4 && featuresLength <= 5,
            [s.lgList]: featuresLength > 5,
          })}
          style={
            {
              '--col': featuresLength,
            } as React.CSSProperties
          }
        >
          {features.map(({ icon, feature }, index) => (
            <Tab
              className={classNames(s.tab, {
                [s.active]: index === activeTabIndex,
              })}
              key={feature}
            >
              <div className={s.iconWrapper}>{icon}</div>
              <span className={s.featureText}>{feature}</span>
            </Tab>
          ))}
        </TabList>
      </AnimateSharedLayout>
      <TabPanels className={s.tabPanels}>
        {features.map((item, index) => {
          return (
            <TabPanel
              key={item.feature}
              className={classNames({
                [s.fadeIn]: index === activeTabIndex,
              })}
            >
              {item.tabContent}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
