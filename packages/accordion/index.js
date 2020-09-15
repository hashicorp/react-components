import React from 'react'
import AccordionItems, { AccordionItem } from './partials/AccordionItems'

function Accordion({ heading, items }) {
  return (
    <section className="g-accordion">
      <div className="g-grid-container">
        {heading && (
          <h2 className="g-type-display-2" data-testid="heading">
            {heading}
          </h2>
        )}
        <AccordionItems items={items} />
      </div>
    </section>
  )
}

export default Accordion

export { AccordionItems, AccordionItem }
