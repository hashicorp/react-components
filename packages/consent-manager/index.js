import { Component } from 'react'
import { render } from 'react-dom'
import EventEmitter from 'events'
import inEU from '@segment/in-eu'
import ConsentBanner from './banner'
import ConsentPreferences from './dialog'
import { loadPreferences, savePreferences } from './cookies'
import loadAnalytics from './load'

const emitter = new EventEmitter()

// TODO: remove this
export function init(props) {
  render(<ConsentManager {...props} />, document.querySelector(props.container))
}

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
      preferences = { All: false, 'Segment.io': false }
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
    // 1. Check cookies
    if (
      this.state.preferences &&
      this.state.preferences.version === this.props.version
    ) {
      // Load segment and custom integrations
      loadAnalytics(
        this.state.preferences,
        this.props.segmentWriteKey,
        this.props.additionalServices
      )
      return false
    }
    // 2. Check inEU. If in-eu, show consent. If not, show nothing. Load all.
    if (inEU() || this.props.forceShow) {
      return true
    } else {
      // Load all analytics
      this.saveAndLoadAnalytics({ loadAll: true })
      return false
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
      <div id="g-consent-manager">
        {/*  Consent banner at the bottom */}
        {this.state.showBanner && (
          <ConsentBanner
            privacyPolicyLink={this.props.privacyPolicyLink}
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
            saveAndLoadAnalytics={this.saveAndLoadAnalytics}
          />
        )}
      </div>
    )
  }
}
