import React, { forwardRef, useState } from 'react'
import Tippy from '@tippyjs/react'
import Image from '@hashicorp/react-image'
import Button from '@hashicorp/react-button'
import fragment from './fragment.graphql'
import classNames from 'classnames'
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
            <TileWithTooltip
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
            <TileForwardRef
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

const TileForwardRef = forwardRef(function Tile(
  {
    color,
    company,
    details,
    hashUrl,
    integrationLink,
    size,
    removeBorders,
    handleClick,
  },
  ref
) {
  const hasLink = integrationLink && company && company.integrationPage
  const hasLinkOrTooltip = hasLink || (company.description && details)
  return (
    <li
      ref={ref}
      key={company.name}
      id={hashUrl ? slug(company.name) : ''}
      className={classNames(s.gridItem, s[size], {
        [s.noBorder]: removeBorders,
        [s.hasLinkOrTooltip]: hasLinkOrTooltip,
      })}
      onClick={handleClick}
    >
      {hasLink ? (
        <a href={`/integrations/${company.integrationPage.slug}`}>
          <TileImage company={company} color={color} size={size} />
        </a>
      ) : (
        <TileImage company={company} color={color} size={size} />
      )}
    </li>
  )
})

function TileWithTooltip({
  color,
  company,
  details,
  hashUrl,
  integrationLink,
  size,
  removeBorders,
}) {
  // We need to hold on to a tippy ref so we can use our custom close icon
  const [visible, setVisible] = useState(false)

  function handleClick() {
    // Hide the tooltip
    setVisible(false)
    // Then, if we are hashing the url, we clear the hash since it has closed
    if (hashUrl) {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      )
    }
  }

  // This is the markup for the actual tooltip
  return (
    <Tippy
      key={company.link}
      content={<TooltipContent company={company} closeTooltip={handleClick} />}
      arrow={true}
      visible={visible}
      onClickOutside={() => setVisible(false)}
      placement="top"
      theme="light"
      interactive={true}
      ignoreAttributes={true}
      onShow={() => {
        // if we're hashing the url, add the hash now, since it is open
        if (hashUrl) {
          history.pushState(null, null, `#${company.name}`)
        }
      }}
    >
      <TileForwardRef
        color={color}
        company={company}
        details={details}
        hashUrl={hashUrl}
        size={size}
        integrationLink={integrationLink}
        removeBorders={removeBorders}
        handleClick={() => setVisible(!visible)}
      />
    </Tippy>
  )
}

function TooltipContent({ company, closeTooltip }) {
  return (
    <div className={s.tooltipDetails}>
      <div className={s.detailsClose} onClick={closeTooltip}>
        &times;
      </div>
      <h5 className={s.detailsHeading}>{company.name}</h5>
      <div>{company.description}</div>
      {company.link && (
        <Button
          className={s.detailsButton}
          title={`${company.name} Website`}
          url={company.link}
          theme={{ variant: 'secondary' }}
          linkType="outbound"
          external={true}
        />
      )}
    </div>
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
