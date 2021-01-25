import { AccordionItems } from '@hashicorp/react-accordion'
import Tabs from '@hashicorp/react-tabs'

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
      <Tabs
        items={tabs.map((tab) => {
          return {
            heading: tab.heading,
            // eslint-disable-next-line react/display-name -- This is the expected usage
            tabChildren: () => <AccordionItems items={tab.items} />,
          }
        })}
      />
    </section>
  )
}

export default TabbedAccordion
