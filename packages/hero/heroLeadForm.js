import { useState, useEffect } from 'react'
import { Formik, Field } from 'formik'
import Button from '@hashicorp/react-button'
import TextInput from '@hashicorp/react-text-input'
import queryString from 'query-string'
import s from './hero-lead-form.module.css'

const EMAIL_STORAGE_KEY = 'prevVal_emailValue'

function HeroLeadForm(props) {
  const [storedEmail, setStoredEmail] = useState('')
  const [submitStatus, setSubmitStatus] = useState(false)

  //  On mount only, try to retrieve a stored email
  useEffect(() => {
    let retrievedEmail = window.localStorage.getItem(EMAIL_STORAGE_KEY)
    if (retrievedEmail !== null) setStoredEmail(retrievedEmail)
  }, [])

  //  Submit function for use with Formik
  async function handleSubmit(values, formikBag) {
    const { submitRedirectUrl } = props
    const { setSubmitting } = formikBag
    setSubmitting(true)

    // Save submitted email for future use in other forms
    // (Note: done here rather than after onChange to ensure privacy consent)
    window.localStorage.setItem(EMAIL_STORAGE_KEY, values.email)

    setSubmitting(false)

    setSubmitStatus(true)

    // Submission redirects the user to the appropriate form page where the values will be plucked & placed in field from the query string we set here
    if (window && submitRedirectUrl) {
      window.location = `${submitRedirectUrl}?${queryString.stringify(values, {
        encode: true,
      })}`
    }
  }

  const { placeholder, buttonText, theme } = props
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ email: storedEmail }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <form
          className={s.root}
          onSubmit={formikProps.handleSubmit}
          data-submitting={(!!formikProps.isSubmitting).toString()}
          data-submitted={(!!submitStatus).toString()}
        >
          <div className={s.formElements}>
            <div className={s.formInputs}>
              <Field
                type="email"
                name="email"
                component={(p) => (
                  <TextInput {...p} className={s.textInputOverride} />
                )}
                placeholder={placeholder}
                theme={theme}
              />
            </div>
            <Button
              className={s.buttonOverride}
              type="submit"
              onClick={formikProps.submitForm}
              disabled={formikProps.isSubmitting}
              title={buttonText}
              theme={{
                brand: theme.brand || 'hashicorp',
                variant: theme.variant || 'primary',
                background: theme.background || 'light',
              }}
            />
          </div>
        </form>
      )}
    </Formik>
  )
}

function validate(values) {
  let errors = {}
  if (!values.email || isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

function isValidEmail(string) {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(string)
}

HeroLeadForm.defaultProps = {
  placeholder: 'Enter work email',
  buttonText: 'Submit',
  submitRedirectUrl: 'https://www.hashicorp.com/contact/general',
  theme: {
    background: 'light',
    brand: 'hashicorp',
    variant: 'primary',
  },
}

export default HeroLeadForm
