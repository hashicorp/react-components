/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import FieldWrapper from '../../field-wrapper'
import type { MarketoFormHtmltextField } from '../../../types'
import styles from './style.module.css'

const Index = ({ field }: { field: MarketoFormHtmltextField }) => {
  return (
    <FieldWrapper fieldId={field.id}>
      <span
        className={styles.htmltext}
        dangerouslySetInnerHTML={{ __html: field.text }}
      />
    </FieldWrapper>
  )
}

export default Index
