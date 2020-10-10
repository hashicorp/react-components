import InlineSvg from '@hashicorp/react-inline-svg'
import IconEnter from './img/search-legend-enter.svg.js'
import IconPage from './img/search-legend-page.svg.js'
import IconEscape from './img/search-legend-escape.svg.js'

export default function SearchLegend() {
  return (
    <div className="c-search-legend">
      <figure className="legend-item">
        <InlineSvg src={IconEnter} aria-hidden={true} />
        <p className="g-type-tag-label">
          <span className="visually-hidden">Enter</span>
          to select
        </p>
      </figure>
      <figure className="legend-item">
        <InlineSvg src={IconPage} aria-hidden={true} />
        <p className="g-type-tag-label">
          <span className="visually-hidden">Tab</span>
          to navigate
        </p>
      </figure>
      <figure className="legend-item">
        <InlineSvg src={IconEscape} aria-hidden={true} />
        <p className="g-type-tag-label">
          <span className="visually-hidden">Escape</span>
          to dismiss
        </p>
      </figure>
    </div>
  )
}
