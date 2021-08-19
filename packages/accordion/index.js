import React from 'react'
import AccordionItems, { AccordionItem } from './partials/AccordionItems'
import s from './style.module.css'

function Accordion({ heading, items }) {
  return (
    <section className={s.root}>
      <div className="g-grid-container">
        {heading && (
          <h2 className={s.heading} data-testid="heading">
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
