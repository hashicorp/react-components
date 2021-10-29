import { Component } from 'react'
import EventEmitter from 'events'
import ConsentBanner from './partials/banner'
import ConsentPreferences from './partials/dialog'
import { loadPreferences, savePreferences } from './partials/cookies'
import loadAnalytics from './partials/load'
import classNames from 'classnames'
import s from './style.module.css'

const emitter = new EventEmitter()

export function open() {
  emitter.emit('openDialog')
}

export default class ConsentManager extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDialog: props.showDialog || false,
      showBanner: false,
      preferences: loadPreferences() || {},
    }
    this.saveAndLoadAnalytics = this.saveAndLoadAnalytics.bind(this)
    this.openDialog = this.openDialog.bind(this)
  }

  saveAndLoadAnalytics(preferences) {
    if (typeof preferences === 'undefined') {
      preferences = { loadAll: false, segment: false }
    }
    savePreferences(preferences, this.props.version)

    loadAnalytics(
      preferences,
      this.props.segmentWriteKey,
      this.props.additionalServices
    )

    // Close all dialogs
    document.body.classList.remove('g-noscroll')
    this.setState({
      showDialog: false,
      showBanner: false,
      preferences: loadPreferences(),
    })
  }

  shouldRequireConsent() {
    // 1. If prop override is set, always show the consent bar.
    if (this.props.forceShow) {
      return true
    }
    // 2. Check cookies and apply existing consent preferences if they've already been set.
    if (
      Object.keys(this.state.preferences).length !== 0 &&
      this.state.preferences.version === this.props.version
    ) {
      // Load segment and custom integrations
      loadAnalytics(
        this.state.preferences,
        this.props.segmentWriteKey,
        this.props.additionalServices
      )
      return false
    } else {
      // 3. Always show the consent bar if we don't have a response stored.
      return true
    }
  }

  componentDidMount() {
    this.setState({ showBanner: this.shouldRequireConsent() })
    emitter.on('openDialog', this.openDialog)
  }

  openDialog() {
    document.body.classList.add('g-noscroll')
    this.setState({ showDialog: true, showBanner: false })
  }

  render() {
    return (
      <div className={classNames(s.root, this.props.className)}>
        {/*  Consent banner at the bottom */}
        {this.state.showBanner && (
          <ConsentBanner
            privacyPolicyLink={this.props.privacyPolicyLink}
            cookiePolicyLink={this.props.cookiePolicyLink}
            onManagePreferences={this.openDialog}
            onAccept={() => {
              this.saveAndLoadAnalytics({ loadAll: true })
            }}
          />
        )}
        {/*  Consent manager preferences dialog */}
        {this.state.showDialog && (
          <ConsentPreferences
            version={this.props.version}
            segmentWriteKey={this.props.segmentWriteKey}
            utilServerRoot={this.props.utilServerRoot}
            segmentServices={this.props.segmentServices}
            additionalServices={this.props.additionalServices}
            preferences={this.state.preferences}
            categories={this.props.categories}
            privacyPolicyLink={this.props.privacyPolicyLink}
            cookiePolicyLink={this.props.cookiePolicyLink}
            saveAndLoadAnalytics={this.saveAndLoadAnalytics}
          />
        )}
      </div>
    )
  }
}
