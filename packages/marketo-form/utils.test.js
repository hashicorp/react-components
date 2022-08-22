import { calculateDefaultValues, formattedLabel, groupFields } from './utils'
import { UTM_FORM_PROPS, VISIBILITY_RULE_FORM_PROPS } from './fixtures'

describe('formattedLabel', () => {
  it('appends asterisk for required fields', () => {
    expect(
      formattedLabel({
        id: 'FirstName',
        label: 'First Name',
        dataType: 'text',
        validationMessage: 'This field is required.',
        rowNumber: 3,
        columnNumber: 0,
        maxLength: 255,
        required: true,
        formPrefill: true,
        visibilityRules: {
          ruleType: 'alwaysShow',
        },
      })
    ).toBe('First Name *')
  })

  it('does not append asterisk for non-required fields', () => {
    expect(
      formattedLabel({
        id: 'FirstName',
        label: 'First Name',
        dataType: 'text',
        validationMessage: 'This field is required.',
        rowNumber: 3,
        columnNumber: 0,
        maxLength: 255,
        required: false,
        formPrefill: true,
        visibilityRules: {
          ruleType: 'alwaysShow',
        },
      })
    ).toBe('First Name')
  })
})

describe('groupFields', () => {
  it('groups fields', () => {
    const groups = groupFields(UTM_FORM_PROPS.marketoForm.result, {
      name: {
        fields: ['FirstName', 'LastName'],
        component: () => {},
      },
    })
    expect(groups).toEqual({
      name: [
        UTM_FORM_PROPS.marketoForm.result[0],
        UTM_FORM_PROPS.marketoForm.result[1],
      ],
      utm_medium__c: [UTM_FORM_PROPS.marketoForm.result[2]],
      form_page_url__c: [UTM_FORM_PROPS.marketoForm.result[3]],
    })
  })
})

describe('calculateDefaultValues', () => {
  it('calculates default values', () => {
    expect(
      calculateDefaultValues(VISIBILITY_RULE_FORM_PROPS.marketoForm.result)
    ).toEqual({
      FirstName: '',
      LastName: '',
      Phone: '',
      fastTracktoSales: false,
    })
  })

  it('accounts for passed in values', () => {
    expect(
      calculateDefaultValues(UTM_FORM_PROPS.marketoForm.result, {
        form_page_url__c: 'http',
      })
    ).toEqual({
      FirstName: '',
      LastName: '',
      utm_medium__c: '',
      form_page_url__c: 'http',
    })
  })
})
