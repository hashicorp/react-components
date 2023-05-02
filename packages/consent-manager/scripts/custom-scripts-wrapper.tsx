/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Use this component if you need to conditionally render a specifc custom script.
// See @TODO: ADD LINK TO WEB FILE WHEN COMPLETE

import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { EventEmitter } from 'events'
import { loadPreferences } from '../util/cookies'
import CustomScripts from './custom'
import type { ConsentManagerService } from '../types'
import s from '../style.module.css'

interface CustomScriptsWrapperProps {
  additionalServices?: ConsentManagerService[]
  className?: string
}

const emitter = new EventEmitter()

export default function CustomScriptsWrapper(props: CustomScriptsWrapperProps) {
  const [preferences, setPreferences] = useState(loadPreferences() ?? {})

  const saveAndLoadAnalytics = useCallback(() => {
    // If analytics have already been added to page, it's likely you're updating your preferences
    // We reload the page to re-initiate the script with the updated integrations
    if (window.analytics && window.analytics.initialized) {
      window.location.reload()
      return
    }

    setPreferences(loadPreferences() ?? {})
  }, [])

  useEffect(() => {
    emitter.on('saveAndLoadAnalytics', saveAndLoadAnalytics)
    return () => {
      emitter.off('saveAndLoadAnalytics', saveAndLoadAnalytics)
    }
  }, [saveAndLoadAnalytics])

  return (
    <div className={classNames(s.root, props.className)}>
      <CustomScripts
        preferences={preferences}
        services={props.additionalServices}
      />
    </div>
  )
}
