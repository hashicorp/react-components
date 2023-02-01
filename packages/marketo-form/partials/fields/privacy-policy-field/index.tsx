/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-form-fields/checkbox'
import FieldWrapper from '../../field-wrapper'
import { FormMetadataContext } from '../../../contexts/FormMetadata'
import type { MarketoFormCheckboxField } from '../../../types'
import { useErrorMessage } from '../../../utils'
import style from './style.module.css'

const LABELS_BY_LANGUAGE = {
  English: (
    <>
      I agree to HashiCorp’s{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy Policy
      </a>
      <span className={style.required}>*</span>
    </>
  ),
  French: (
    <>
      J&apos;accepte la{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        politique de confidentialité
      </a>{' '}
      d&apos;HashiCorp.<span className={style.required}>*</span>
    </>
  ),
  Korean: (
    <>
      HashiCorp의{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        개인정보 처리방침
      </a>
      에 동의합니다<span className={style.required}>*</span>
    </>
  ),
  Japanese: (
    <>
      HashiCorpの
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        プライバシーポリシー
      </a>
      に同意します。
      <span className={style.required}>*</span>
    </>
  ),
  German: (
    <>
      Ich stimme den{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Datenschutzrichtlinien
      </a>{' '}
      von HashiCorp zu.<span className={style.required}>*</span>
    </>
  ),
  Spanish: (
    <>
      Estoy de acuerdo con la{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        política de privacidad
      </a>{' '}
      de HashiCorp.<span className={style.required}>*</span>
    </>
  ),
  'Portuguese (Brazil)': (
    <>
      Eu concordo com a{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Política de Privacidade
      </a>{' '}
      da HashiCorp.<span className={style.required}>*</span>
    </>
  ),
  Italian: (
    <>
      Accetto{' '}
      <a
        href="https://www.hashicorp.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
      >
        l&apos;informativa sulla privacy
      </a>{' '}
      di HashiCorp.
      <span className={style.required}>*</span>
    </>
  ),
}

const PrivacyPolicyField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const metadata = useContext(FormMetadataContext)
  const { register, watch } = useFormContext()
  const error = useErrorMessage(field.id)
  const checked = watch(field.id, false)

  return (
    <FieldWrapper fieldId={field.id}>
      <CheckboxInput
        label={
          metadata && metadata.language in LABELS_BY_LANGUAGE
            ? LABELS_BY_LANGUAGE[metadata.language]
            : LABELS_BY_LANGUAGE.English
        }
        field={{
          ...register(field.id),
          checked,
        }}
        error={error}
      />
    </FieldWrapper>
  )
}

export default PrivacyPolicyField
