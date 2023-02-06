/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import styles from './style.module.css'

const ErrorMessage = ({ error }: { error: string }) => {
  return <div className={styles.errorText}>{error}</div>
}

export default ErrorMessage
