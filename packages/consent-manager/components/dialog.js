/*
  dialog.js
  Managing preferences dialog
*/

import { Component } from 'react'
import getIntegrations from '../util/integrations'
import CloseButton from '../img/icn_close'
import Button from '@hashicorp/react-button'
import Toggle from '@hashicorp/react-toggle'
import classNames from 'classnames'
import s from './dialog.module.css'

export default class ConsentPreferences extends Component {
  constructor(props) {
    super(props)

    this.state = {
      version: props.version || 0,
      showConfirmationDialog: false,
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
      this.props.segmentWriteKey,
      this.props.utilServerRoot
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
          <div className={s.itemTitle}>{item.name}</div>
          <div className={s.flexCenteredRow}>
            <div className={s.itemDescription}>{item.description}</div>
            <div className={s.consentToggle}>
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
          </div>
        </div>
      )
    })

    return (
      <div className={s.category} key={name}>
        <div className={s.categoryTitle}>{name}</div>
        <div className={s.flexCenteredRow}>
          <div className={s.categoryDescription}>
            {this.state.categories[name]}
          </div>
          <div className={s.consentToggle}>
            {!this.state.showCategories[name] && (
              <Toggle
                onChange={this.handleToggle.bind(this, name, 'categories')}
                enabled={
                  this.state.consent.loadAll || this.getCategoryToggle(name)
                }
              />
            )}
          </div>
        </div>
        <div className={s.categoryFold}>
          <button
            className={classNames(s.categoryFoldTrigger, {
              [s.shown]: this.state.showCategories[name],
            })}
            onClick={() => {
              this.handleFold(name)
            }}
          >
            {!this.state.showCategories[name] && 'See more'}
            {this.state.showCategories[name] && 'See less'}
            <svg width="14" height="8" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.293.293L7 5.586 1.707.293A1 1 0 1 0 .293 1.707l6 6a.997.997 0 0 0 1.414 0l6-6A1 1 0 0 0 12.293.293"
                fill="var(--brand)"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {this.state.showCategories[name] && (
          <div className={s.categoryItems}>{categoryItems}</div>
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
        {!this.state.showConfirmationDialog && (
          <div className={s.visibleDialog}>
            <div className={s.dialogTitle}>
              <span>Data Collection Preferences</span>
              <div
                className={s.closeButton}
                onClick={() => {
                  this.setState({ showConfirmationDialog: true })
                }}
              >
                <CloseButton />
              </div>
            </div>
            <div className={s.dialogBody}>
              <p>
                HashiCorp uses data collected by cookies and JavaScript
                libraries to improve your browsing experience, analyze site
                traffic, and increase the overall performance of our site. By
                using our website, you’re agreeing to our{' '}
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
              <p>
                The categories below outline which companies and tools we use
                for collecting data. To opt out of a category of data
                collection, set the toggle to “Off” and save your preferences.
              </p>
              <div id="outline">{categories}</div>
            </div>
            <div className={s.dialogFooter}>
              <Button
                title="Cancel"
                theme={{
                  variant: 'secondary',
                  brand: 'neutral',
                  background: 'light',
                }}
                onClick={() => {
                  this.setState({ showConfirmationDialog: true })
                }}
              />
              <Button
                className={s.saveButton}
                title="Save Preferences"
                onClick={() => {
                  this.props.saveAndLoadAnalytics(this.state.consent)
                }}
              />
            </div>
          </div>
        )}
        {/* Cancellation confirmation dialog */}
        {this.state.showConfirmationDialog && (
          <div className={s.visibleDialog}>
            <div className={s.dialogTitle}>
              <span>Are you sure?</span>
            </div>
            <div className={s.dialogBody}>
              <p>
                Your preferences have not been saved. To continue using our
                website, you must either set individual preferences or agree to{' '}
                <a
                  href={this.props.privacyPolicyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our privacy policy
                </a>
                .
              </p>
            </div>
            <div className={s.dialogFooter}>
              <Button
                title="Back to Preferences"
                theme={{
                  variant: 'secondary',
                  brand: 'neutral',
                  background: 'light',
                }}
                onClick={() => {
                  this.setState({ showConfirmationDialog: false })
                }}
              />
              <Button
                title="Agree & Close"
                className={s.saveButton}
                onClick={() => {
                  this.props.saveAndLoadAnalytics({ loadAll: true })
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
