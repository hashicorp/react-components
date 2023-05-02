/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// Use this component if you need to conditionally render a specifc custom script.
// See @TODO: ADD LINK TO WEB FILE WHEN COMPLETE

import classNames from 'classnames'
import { loadPreferences } from '../util/cookies'
import CustomScripts from './custom'
import type { ConsentManagerService } from '../types'
import s from '../style.module.css'

interface CustomScriptsWrapperProps {
  additionalServices?: ConsentManagerService[]
  className?: string
}

export default function CustomScriptsWrapper(props: CustomScriptsWrapperProps) {
  const preferences = loadPreferences() ?? {}

  return (
    <div className={classNames(s.root, props.className)}>
      <CustomScripts
        preferences={preferences}
        services={props.additionalServices}
      />
    </div>
  )
}
