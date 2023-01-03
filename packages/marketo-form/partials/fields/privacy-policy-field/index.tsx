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
      J&apos;accepte la politique de confidentialité d&apos;HashiCorp.
      <span className={style.required}>*</span>
    </>
  ),
  Korean: (
    <>
      향후 HashiCorp의 마케팅 이벤트 및 프로모션, 유용한 정보와 교육 등 안내를
      받으실 수 있습니다. (자세한 내용은 Privacy Policy를 참고하시기 바랍니다:
      HashiCorp)
    </>
  ),
  Japanese: (
    <>
      HashiCorpのプライバシーポリシーに同意します。
      <span className={style.required}>*</span>
    </>
  ),
  German: (
    <>
      Ich stimme den Datenschutzrichtlinien von HashiCorp zu.
      <span className={style.required}>*</span>
    </>
  ),
  Spanish: (
    <>
      Estoy de acuerdo con la política de privacidad de HashiCorp.
      <span className={style.required}>*</span>
    </>
  ),
  'Portuguese (Brazil)': (
    <>
      Eu concordo com a Política de Privacidade da HashiCorp.
      <span className={style.required}>*</span>
    </>
  ),
  Italian: (
    <>
      Accetto l&apos;informativa sulla privacy di HashiCorp.
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
