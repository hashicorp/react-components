/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/*
  dialog.js
  Managing preferences dialog
*/

import { Component } from 'react'
import getIntegrations from '../util/integrations'
import Button from '@hashicorp/react-button'
import Toggle from '@hashicorp/react-toggle'
import { IconArrowDown24 } from '@hashicorp/flight-icons/svg-react/arrow-down-24'
import classNames from 'classnames'
import s from './dialog.module.css'

export default class ConsentPreferences extends Component {
  constructor(props) {
    super(props)

    this.state = {
      version: props.version || 0,
      groupedIntegrations: {}, // Integrations object grouped by category
      consent: props.preferences, // Consent preferences object
      categories: props.categories.reduce((obj, category) => {
        obj[category.name] = category.description
        return obj
      }, {}), // Transform categories description array to object
      showCategories: {}, // Category toggle state object
    }

    this.handleFold = this.handleFold.bind(this)
    this.getCategoryToggle = this.getCategoryToggle.bind(this)
  }

  componentDidMount() {
    // Set up integrations
    getIntegrations(
      this.props.segmentServices,
      this.props.additionalServices,
      this.props.segmentWriteKey
    ).then((groupedIntegrations) => {
      this.setState({ groupedIntegrations })
    })
  }

  // Handler for when user toggles a category or individual integration
  handleToggle(integrationName, integrationOrigin, newValue) {
    let currentConsent = this.state.consent || {}

    // If user has { loadAll: true } and they toggle, make sure to preserve
    // the loadAll settings by setting everything to true first. This setting
    // gets reset at the end of the function.
    if (currentConsent.loadAll) {
      Object.keys(this.state.groupedIntegrations).forEach((category) => {
        this.state.groupedIntegrations[category].forEach((tool) => {
          currentConsent[tool.origin] = currentConsent[tool.origin] || {}
          currentConsent[tool.origin][tool.name] = true
        })
      })
    }

    if (integrationOrigin === 'categories') {
      // User toggled a category toggle
      // Go through list of groupedIntegrations
      this.state.groupedIntegrations[integrationName].forEach((tool) => {
        currentConsent[tool.origin] = currentConsent[tool.origin] || {}
        currentConsent[tool.origin][tool.name] = newValue
      })
    } else {
      // User toggled an individual tool toggle
      currentConsent[integrationOrigin] =
        currentConsent[integrationOrigin] || {}
      currentConsent[integrationOrigin][integrationName] = newValue
    }

    delete currentConsent.loadAll

    this.setState({ consent: currentConsent })
  }

  // Handler for folding categories
  handleFold(categoryName) {
    const categories = this.state.showCategories
    categories[categoryName] = !categories[categoryName]
    this.setState({ showCategories: categories })
  }

  // Calculate value of category toggle
  getCategoryToggle(category) {
    return this.state.groupedIntegrations[category].some((tool) => {
      return (
        this.state.consent &&
        Object.prototype.hasOwnProperty.call(this.state.consent, tool.origin) &&
        Object.prototype.hasOwnProperty.call(
          this.state.consent[tool.origin],
          tool.name
        ) &&
        this.state.consent[tool.origin][tool.name]
      )
    })
  }

  // Build each individual category and integration row
  buildCategory(items, name) {
    const categoryItems = items.map((item) => {
      return (
        <div className={s.categoryItem} key={item.name}>
          <div className={s.categoryItemHeader}>
            <h4 className={s.categoryItemTitle}>{item.name}</h4>
            <Toggle
              onChange={this.handleToggle.bind(this, item.name, item.origin)}
              enabled={Boolean(
                this.state.consent.loadAll ||
                (this.state.consent &&
                  this.state.consent[item.origin] &&
                  this.state.consent[item.origin][item.name])
              )}
            />
          </div>
          <p className={s.categoryItemDescription}>{item.description}</p>
        </div>
      )
    })

    return (
      <div className={s.category} key={name}>
        <div className={s.categoryHeader}>
          <h3 className={s.categoryHeaderTitle}>{name}</h3>
          {!this.state.showCategories[name] && (
            <Toggle
              onChange={this.handleToggle.bind(this, name, 'categories')}
              enabled={
                this.state.consent.loadAll || this.getCategoryToggle(name)
              }
            />
          )}
          <button
            className={classNames(s.categoryFoldTrigger, {
              [s.shown]: this.state.showCategories[name],
            })}
            onClick={() => {
              this.handleFold(name)
            }}
            aria-label={
              this.state.showCategories[name] ? 'See less' : 'See more'
            }
          >
            <IconArrowDown24 />
          </button>
        </div>
        {this.state.showCategories[name] && (
          <div className={s.categoryFold}>
            <p className={s.categoryFoldDescription}>
              {this.state.categories[name]}
            </p>
            {categoryItems}
          </div>
        )}
      </div>
    )
  }

  render() {
    let categories = Object.keys(this.state.groupedIntegrations)
    categories = categories.map((category) => {
      return this.buildCategory(
        this.state.groupedIntegrations[category],
        category
      )
    })

    return (
      <div className={s.root} data-testid="consent-mgr-dialog">
        {/* Manage preferences dialog */}
        <div className={s.visibleDialog}>
          <div className={s.dialogHeader}>
            <h2 className={s.dialogHeaderTitle}>Manage cookies</h2>
          </div>
          <div className={s.dialogBody}>
            <p className={s.dialogBodyIntro}>
              HashiCorp uses data collected by cookies and JavaScript libraries
              to improve your browsing experience, analyze site traffic, and
              increase the overall performance of our site. By using our
              website, you’re agreeing to our{' '}
              <a
                href={this.props.privacyPolicyLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="privacy-policy-link"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href={this.props.cookiePolicyLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cookie-policy-link"
              >
                Cookie Policy
              </a>
              .
            </p>
            <p className={s.dialogBodyNotice}>
              The categories below outline which companies and tools we use for
              collecting data. To opt out of a category of data collection, set
              the toggle to “Off” and save your preferences.
            </p>
            <div id="outline">{categories}</div>
          </div>
          <div className={s.dialogFooter}>
            <Button
              title="Save preferences"
              theme={{
                variant: 'secondary',
                brand: 'neutral',
                background: 'light',
              }}
              onClick={() => {
                this.props.saveAndLoadAnalytics(this.state.consent)
              }}
            />
            <Button
              className={s.saveButton}
              title="Accept all"
              onClick={() => {
                this.props.saveAndLoadAnalytics({ loadAll: true })
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
