const BASIC_FORM_PROPS = {
  formId: 9999,
  marketoForm: {
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
  marketoForm: {
    result: [
      ...BASIC_FORM_PROPS.marketoForm.result,
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
      },
      {
        id: 'form_page_url__c',
        label: 'form_page_url:',
        dataType: 'hidden',
        rowNumber: 7,
        columnNumber: 0,
        required: false,
      },
    ],
  },
}

export { BASIC_FORM_PROPS, UTM_FORM_PROPS }
