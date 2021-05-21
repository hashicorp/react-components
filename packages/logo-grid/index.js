import { Component } from 'react'
import Tippy from '@tippyjs/react'
import Image from '@hashicorp/react-image'
import Button from '@hashicorp/react-button'
import fragment from './fragment.graphql'

class LogoGrid extends Component {
  constructor(props) {
    super(props)
    this.containsIntegrationLink = this.containsIntegrationLink.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.renderTile = this.renderTile.bind(this)
    this.renderTileWithTooltip = this.renderTileWithTooltip.bind(this)
  }

  render() {
    return (
      <ul
        className={`g-logo-grid ${this.props.size || 'small'} ${
          this.props.removeBorders ? 'no-borders' : ''
        }`}
      >
        {this.props.data.map((c) => {
          return c.description && this.props.details
            ? this.renderTileWithTooltip(c)
            : this.renderTile(c)
        })}
      </ul>
    )
  }

  renderTileWithTooltip(c) {
    // We need to hold on to a tippy ref so we can use our custom close icon
    let inst
    // This is the markup for the actual tooltip
    const tooltip = (
      <div className="logo-grid-tooltip details">
        <div
          className="close"
          onClick={() => {
            // Here, we used the saved ref from when it opened to close it
            inst.hide()
            // Then, if we are hashing the url, we clear the hash since it has closed
            if (this.props.hashUrl) {
              history.pushState(
                '',
                document.title,
                window.location.pathname + window.location.search
              )
            }
          }}
        >
          &times;
        </div>
        <h5>{c.name}</h5>
        <div className="g-text">{c.description}</div>
        {c.link && (
          <Button
            title={`${c.name} Website`}
            url={c.link}
            theme={{ variant: 'secondary' }}
            external={true}
          />
        )}
      </div>
    )
    return (
      <Tippy
        key={c.link}
        content={tooltip}
        arrow={true}
        trigger="click"
        placement="top"
        theme="light"
        hideOnClick={true}
        interactive={true}
        flipOnUpdate={false}
        ignoreAttributes={true}
        multiple={false}
        onShow={(tip) => {
          // save a reference to the currently open instance so it can be closed by the "X"
          inst = tip
          // then if we're hashing the url, add the hash now, since it is open
          if (this.props.hashUrl) {
            history.pushState(null, null, `#${c.name}`)
          }
        }}
      >
        {this.renderTile(c)}
      </Tippy>
    )
  }

  renderTile(c) {
    return (
      <li
        key={c.name}
        id={this.props.hashUrl ? slug(c.name) : ''}
        className={`${c.description && this.props.details ? 'tt ' : ''}${
          this.containsIntegrationLink(c) ? 'linked' : ''
        }`}
      >
        {(this.containsIntegrationLink(c) && (
          <a href={`/integrations/${c.integrationPage.slug}`}>
            {this.renderImage(c)}
          </a>
        )) ||
          this.renderImage(c)}
      </li>
    )
  }

  renderImage(c) {
    let logoProp
    switch (this.props.color) {
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
        sizes={imageSizes[this.props.data.size]}
        url={c[logoProp].url}
        format={c[logoProp].format}
        alt={`${c.name} Logo`}
      />
    )
  }

  // check if data links to integration page; returns bool
  containsIntegrationLink(dat = {}) {
    return this.props.integrationLink && dat && dat.integrationPage
  }
}

export function slug(name) {
  return name.toLowerCase().replace(/[\s_'"]/g, '-')
}

LogoGrid.fragmentSpec = { fragment, dependencies: [Image] }

export default LogoGrid
