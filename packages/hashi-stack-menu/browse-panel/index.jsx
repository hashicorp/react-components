/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import styles from './browse-panel.module.css'

export default function BrowsePanel({ isOpen, children }) {
  return (
    <section className={`${styles.browsePanel} ${isOpen ? styles.isOpen : ''}`}>
      {children}
    </section>
  )
}
