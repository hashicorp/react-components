import React, { useRef, useState } from 'react'
import Image from '@hashicorp/react-image'
import Button from '@hashicorp/react-button'
import fragment from './fragment.graphql'
import classNames from 'classnames'
import DialogTooltip from './partials/dialog-tooltip'
import { useRect } from '@reach/rect'
import s from './style.module.css'

interface LogoGridProps {
  data: $TSFixMe
  color?: 'color' | 'white' | 'monochrome'
  details?: boolean
  integrationLink?: boolean
  removeBorders?: boolean
  size?: 'small' | 'medium' | 'large'
}

function LogoGrid({
  data,
  color = 'color',
  details,
  integrationLink,
  removeBorders,
  size = 'small',
}: LogoGridProps): React.ReactElement {
  const theme = color == 'white' ? 'dark' : 'light'

  return (
    <ul className={classNames(s.root, s[size], s[theme])}>
      {data.map((company) => {
        // What we wrap the TileImage in within the tile
        // varies on whether we need a link or tooltip
        const hasLink = integrationLink && company.integrationPage
        const hasTooltip = company.description && details
        // Configure the company logo for clarity in conditional rendering
        function TileImage() {
          return <CompanyLogo company={company} color={color} size={size} />
        }
        return (
          <li
            key={company.name}
            className={classNames(s.listItem, s[size], {
              [s.removeBorders]: removeBorders,
            })}
          >
            {hasLink ? (
              // Tiles may link to integration pages, this overrides tooltip use.
              // Note: seems like links would only work when used in
              // the hashicorp-www-next project. We should likely clarify this.
              <a
                className={s.tileClickable}
                href={`/integrations/${company.integrationPage.slug}`}
              >
                <TileImage />
              </a>
            ) : hasTooltip ? (
              // Tiles with tooltips are rendered as <button> elements.
              <TileWithTooltip company={company} theme={theme}>
                <TileImage />
              </TileWithTooltip>
            ) : (
              // Tiles without links or tooltips are non-interactive.
              <div className={s.tilePlain}>
                <TileImage />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function TileWithTooltip({ children, company, theme }) {
  const [showDialog, setShowDialog] = useState(false)
  const triggerRef = useRef(null)
  const triggerRect = useRect(triggerRef)
  return (
    <>
      <button
        className={classNames(s.tileClickable, { [s.showDialog]: showDialog })}
        ref={triggerRef}
        onClick={() => setShowDialog(true)}
      >
        {children}
      </button>
      <DialogTooltip
        triggerRect={triggerRect}
        shown={showDialog}
        setIsShown={setShowDialog}
        theme={theme}
      >
        <h5 className={classNames(s.companyName, s[theme])}>{company.name}</h5>
        <p className={classNames(s.companyDescription, s[theme])}>
          {company.description}
        </p>
        {company.link && (
          <Button
            className={s.companyLinkButton}
            title={`${company.name} Website`}
            url={company.link}
            theme={{ variant: 'secondary', background: theme }}
            linkType="outbound"
            external={true}
          />
        )}
      </DialogTooltip>
    </>
  )
}

function CompanyLogo({ company, color, size }) {
  // Map from the "color" prop to the logo key,
  // and use that to access the provided logo to use based on the color prop
  const colorPropName = {
    monochrome: 'monochromeLogo',
    white: 'whiteLogo',
    color: 'logo',
  }[color]
  const logoImage = company[colorPropName]
  // Map the "size" prop to  an <img /> sizes  attribute
  const logoImageSizes = {
    small:
      '(max-width: 500px) calc(.5 * (50vw - 10w)), (max-width: 1000px) calc(.5 * (33.33vw - 20w)), calc(.5 * (16.66vw - 25w))',
    medium:
      '(max-width: 650px) calc(.5 * (50vw - 20w)), calc(.5 * (25vw - 22w))',
    large:
      '(max-width: 500px) calc(.5 * (100vw - 48w)), (max-width: 700px) calc(.5 * (50vw - 48w - 15w)), calc(.5 * (33.33vw - 20px))',
  }[size]
  return (
    <Image
      sizes={logoImageSizes}
      url={logoImage.url}
      format={logoImage.format}
      alt={`${company.name} Logo`}
    />
  )
}

LogoGrid.fragmentSpec = { fragment, dependencies: [Image] }

export default LogoGrid
