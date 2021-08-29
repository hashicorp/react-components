import React, { useRef, useState } from 'react'
import Image from '@hashicorp/react-image'
import fragment from './fragment.graphql'
import classNames from 'classnames'
import InfoModal from './partials/info-modal'
import { useRect } from '@reach/rect'
import s from './style.module.css'

function LogoGrid({
  size,
  removeBorders,
  details,
  hashUrl,
  integrationLink,
  color,
  data,
}) {
  return (
    <ul className={classNames(s.root, s[size])}>
      {data.map((c) => {
        if (c.description && details) {
          return (
            <Tile
              details={details}
              hashUrl={hashUrl}
              company={c}
              color={color}
              size={size}
              integrationLink={integrationLink}
              removeBorders={removeBorders}
            />
          )
        } else {
          return (
            <Tile
              details={details}
              hashUrl={hashUrl}
              company={c}
              color={color}
              size={size}
              integrationLink={integrationLink}
              removeBorders={removeBorders}
            />
          )
        }
      })}
    </ul>
  )
}

function Tile({
  color,
  company,
  details,
  hashUrl,
  integrationLink,
  size,
  removeBorders,
}) {
  const [showDialog, setShowDialog] = useState(false)
  const triggerRef = useRef(null)
  const triggerRect = useRect(triggerRef)

  const hasLink = integrationLink && company && company.integrationPage
  const hasLinkOrTooltip = hasLink || (company.description && details)
  return (
    <>
      <li
        ref={triggerRef}
        key={company.name}
        id={hashUrl ? slug(company.name) : ''}
        className={classNames(s.gridItem, s[size], {
          [s.noBorder]: removeBorders,
          [s.hasLinkOrTooltip]: hasLinkOrTooltip,
        })}
        onClick={() => setShowDialog(true)}
      >
        {hasLink ? (
          <a href={`/integrations/${company.integrationPage.slug}`}>
            <TileImage company={company} color={color} size={size} />
          </a>
        ) : (
          <TileImage company={company} color={color} size={size} />
        )}
      </li>
      <InfoModal
        shown={showDialog}
        setIsShown={setShowDialog}
        triggerRect={triggerRect}
        company={company}
      />
    </>
  )
}

function TileImage({ company, color, size }) {
  let logoProp
  switch (color) {
    case 'monochrome':
      logoProp = 'monochromeLogo'
      break
    case 'white':
      logoProp = 'whiteLogo'
      break
    default:
      logoProp = 'logo'
  }

  const imageSizes = {
    small:
      '(max-width: 500px) calc(.5 * (50vw - 10w)), (max-width: 1000px) calc(.5 * (33.33vw - 20w)), calc(.5 * (16.66vw - 25w))',
    medium:
      '(max-width: 650px) calc(.5 * (50vw - 20w)), calc(.5 * (25vw - 22w))',
    large:
      '(max-width: 500px) calc(.5 * (100vw - 48w)), (max-width: 700px) calc(.5 * (50vw - 48w - 15w)), calc(.5 * (33.33vw - 20px))',
  }

  return (
    <Image
      sizes={imageSizes[size]}
      url={company[logoProp].url}
      format={company[logoProp].format}
      alt={`${company.name} Logo`}
    />
  )
}

export function slug(name) {
  return name.toLowerCase().replace(/[\s_'"]/g, '-')
}

LogoGrid.fragmentSpec = { fragment, dependencies: [Image] }

export default LogoGrid
