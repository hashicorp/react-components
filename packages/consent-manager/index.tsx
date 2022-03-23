import { useState, useEffect, useCallback } from 'react'
import { EventEmitter } from 'events'
import classNames from 'classnames'
import { loadPreferences, savePreferences } from './util/cookies'
import ConsentBanner from './components/banner'
import ConsentPreferences from './components/dialog'
import SegmentScript from './scripts/segment'
import CustomScripts from './scripts/custom'
import s from './style.module.css'
import { ConsentManagerCategory, ConsentManagerService } from './types'

interface ConsentManagerProps {
  additionalServices?: ConsentManagerService[]
  categories?: ConsentManagerCategory[]
  className?: string
  cookiePolicyLink?: string
  forceShow?: boolean
  privacyPolicyLink?: string
  segmentServices?: ConsentManagerService[]
  segmentWriteKey?: string
  showDialog?: boolean
  utilServerRoot?: string
  version?: number
  onManagePreferences?: () => void
  onAcceptAll?: () => void
}

const emitter = new EventEmitter()

export function open() {
  emitter.emit('openDialog')
}

export default function ConsentManager(props: ConsentManagerProps) {
  const [preferences, setPreferences] = useState(loadPreferences() ?? {})
  const [showDialog, setShowDialog] = useState(props.showDialog ?? false)
  const [showBanner, setShowBanner] = useState(() => {
    // 1. If prop override is set, always show the consent bar.
    if (props.forceShow) return true
  })

  const hasEmptyPreferencesOrVersionMismatch =
    Object.keys(preferences).length === 0 ||
    preferences.version !== props.version

  const saveAndLoadAnalytics = (preferences) => {
    if (typeof preferences === 'undefined') {
      preferences = { loadAll: false, segment: false }
    }
    savePreferences(preferences, props.version)

    // If analytics have already been added to page, it's likely you're updating your preferences
    // We reload the page to re-initiate the script with the updated integrations
    // @ts-expect-error -- initialized doesn't exist on the segment type?
    if (window.analytics && window.analytics.initialized) {
      window.location.reload()
      return
    }

    // Close all dialogs
    document.body.classList.remove('g-noscroll')
    setShowDialog(false)
    setShowBanner(false)
    setPreferences(loadPreferences() ?? {})
  }

  const openDialog = useCallback(() => {
    document.body.classList.add('g-noscroll')
    setShowBanner(false)
    setShowDialog(true)
  }, [])

  // Setup the event handler to open the dialog imperatively
  useEffect(() => {
    emitter.on('openDialog', openDialog)
    return () => {
      emitter.off('openDialog', openDialog)
    }
  }, [openDialog])

  // Show banner if there are no preferences or the version mismatches
  useEffect(() => {
    setShowBanner(hasEmptyPreferencesOrVersionMismatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this check once
  }, [])

  return (
    <div className={classNames(s.root, props.className)}>
      {/*  Consent banner at the bottom */}
      {showBanner && (
        <ConsentBanner
          privacyPolicyLink={props.privacyPolicyLink}
          cookiePolicyLink={props.cookiePolicyLink}
          onManagePreferences={() => {
            openDialog()
            if (props.onManagePreferences) {
              props.onManagePreferences()
            }
          }}
          onAccept={() => {
            saveAndLoadAnalytics({ loadAll: true })
            if (props.onAcceptAll) {
              props.onAcceptAll()
            }
          }}
        />
      )}
      {/*  Consent manager preferences dialog */}
      {showDialog && (
        <ConsentPreferences
          version={props.version}
          segmentWriteKey={props.segmentWriteKey}
          utilServerRoot={props.utilServerRoot}
          segmentServices={props.segmentServices}
          additionalServices={props.additionalServices}
          preferences={preferences}
          categories={props.categories}
          privacyPolicyLink={props.privacyPolicyLink}
          cookiePolicyLink={props.cookiePolicyLink}
          saveAndLoadAnalytics={saveAndLoadAnalytics}
        />
      )}
      <SegmentScript
        preferences={preferences}
        writeKey={props.segmentWriteKey}
      />
      <CustomScripts
        preferences={preferences}
        services={props.additionalServices}
      />
    </div>
  )
}
