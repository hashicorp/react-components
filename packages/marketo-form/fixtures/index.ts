const BASIC_FORM_PROPS = {
  metadata: {
    result: [
      {
        id: 9999,
        language: 'English',
        waitingLabel: 'Submitting...',
        buttonLabel: 'Submit',
      },
    ],
  },
  fields: {
    result: [
      {
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
      },
      {
        id: 'LastName',
        label: 'Last Name',
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
      },
    ],
  },
}

const UTM_FORM_PROPS = {
  ...BASIC_FORM_PROPS,
  fields: {
    result: [
      ...BASIC_FORM_PROPS.fields.result,
      {
        id: 'utm_medium__c',
        label: 'utm_medium:',
        dataType: 'hidden',
        rowNumber: 7,
        columnNumber: 0,
        required: false,
        autoFill: {
          value: '',
          valueFrom: 'query',
          parameterName: 'utm_medium',
        },
        visibilityRules: {
          ruleType: 'alwaysShow',
        },
      },
      {
        id: 'form_page_url__c',
        label: 'form_page_url:',
        dataType: 'hidden',
        rowNumber: 7,
        columnNumber: 0,
        required: false,
        visibilityRules: {
          ruleType: 'alwaysShow',
        },
      },
    ],
  },
}

const VISIBILITY_RULE_FORM_PROPS = {
  ...BASIC_FORM_PROPS,
  fields: {
    result: [
      ...BASIC_FORM_PROPS.fields.result,
      {
        id: 'Phone',
        label: 'Phone Number',
        dataType: 'telephone',
        validationMessage: 'Must be a phone number.',
        rowNumber: 6,
        columnNumber: 0,
        required: false,
        formPrefill: true,
        visibilityRules: {
          rules: [
            {
              subjectField: 'fastTracktoSales',
              operator: 'is',
              values: ['yes'],
              altLabel: 'Phone Number:',
            },
          ],
          ruleType: 'show',
        },
      },
      {
        id: 'fastTracktoSales',
        label: 'Have salesperson contact me',
        dataType: 'checkbox',
        validationMessage: 'This field is required.',
        rowNumber: 7,
        columnNumber: 0,
        required: false,
        formPrefill: true,
        fieldMetaData: {
          initiallyChecked: false,
        },
        visibilityRules: {
          ruleType: 'alwaysShow',
        },
      },
    ],
  },
}

export { BASIC_FORM_PROPS, UTM_FORM_PROPS, VISIBILITY_RULE_FORM_PROPS }
