import { AccordionItems } from '@hashicorp/react-accordion'
import Tabs, { Tab } from '@hashicorp/react-tabs'
import classNames from 'classnames'
import s from './style.module.css'

function TabbedAccordion({ heading, tabs, className }) {
  return (
    <section className={classNames(s.root, className)}>
      {heading && (
        <div data-testid="heading" className={s.headingContainer}>
          <h2 className={s.heading}>{heading}</h2>
        </div>
      )}
      <Tabs className={heading ? s.tabsAfterHeading : undefined}>
        {tabs.map((tab, stableIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={stableIdx} heading={tab.heading}>
            <AccordionItems
              items={tab.items}
              className={s.accordionItems}
              withTopBorder={false}
            />
          </Tab>
        ))}
      </Tabs>
    </section>
  )
}

export default TabbedAccordion
