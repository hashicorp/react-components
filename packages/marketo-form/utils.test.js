import { calculateDefaultValues, formattedLabel, groupFields } from './utils'
import { UTM_FORM_PROPS } from './fixtures'

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
    const groups = groupFields(
      {
        name: {
          fields: ['FirstName', 'LastName'],
          component: () => {},
        },
      },
      UTM_FORM_PROPS.marketoForm.result
    )
    expect(groups).toEqual({
      name: [
        UTM_FORM_PROPS.marketoForm.result[0],
        UTM_FORM_PROPS.marketoForm.result[1],
      ],
      utm_medium__c: [UTM_FORM_PROPS.marketoForm.result[2]],
    })
  })
})

describe('calculateDefaultValues', () => {
  it('calculates default values', () => {
    expect(calculateDefaultValues(UTM_FORM_PROPS.marketoForm.result)).toEqual({
      FirstName: '',
      LastName: '',
      utm_medium__c: '',
    })
  })
})
