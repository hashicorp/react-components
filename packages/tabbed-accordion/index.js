import { AccordionItems } from '@hashicorp/react-accordion'
import Tabs, { Tab } from '@hashicorp/react-tabs'

function TabbedAccordion({ heading, tabs }) {
  return (
    <section className="g-tabbed-accordion">
      {heading && (
        <div
          data-testid="heading"
          className="heading-container g-grid-container"
        >
          <h2 className="g-type-display-2">{heading}</h2>
        </div>
      )}
      <Tabs>
        {tabs.map((tab, stableIdx) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={stableIdx} heading={tab.heading}>
            <AccordionItems items={tab.items} />
          </Tab>
        ))}
      </Tabs>
    </section>
  )
}

export default TabbedAccordion
