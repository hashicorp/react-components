/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  calculateDefaultValues,
  formattedLabel,
  groupFields,
  includesSkippedRecords,
} from './utils'
import { UTM_FORM_PROPS, VISIBILITY_RULE_FORM_PROPS } from './fixtures'

describe('formattedLabel', () => {
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
    const groups = groupFields(UTM_FORM_PROPS.fields.result, {
      name: {
        fields: ['FirstName', 'LastName'],
        component: () => {},
      },
    })
    expect(groups).toEqual({
      name: [UTM_FORM_PROPS.fields.result[0], UTM_FORM_PROPS.fields.result[1]],
      utm_medium__c: [UTM_FORM_PROPS.fields.result[2]],
      form_page_url__c: [UTM_FORM_PROPS.fields.result[3]],
    })
  })
})

describe('calculateDefaultValues', () => {
  it('calculates default values', () => {
    expect(
      calculateDefaultValues(VISIBILITY_RULE_FORM_PROPS.fields.result)
    ).toEqual({
      FirstName: '',
      LastName: '',
      Phone: '',
      fastTracktoSales: false,
    })
  })

  it('accounts for passed in values', () => {
    expect(
      calculateDefaultValues(UTM_FORM_PROPS.fields.result, {
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

describe('includesSkippedRecords', () => {
  it('returns true when containing skipped records', () => {
    const response = {
      requestId: 'f8a8#185cc1e96b9',
      result: [
        {
          status: 'skipped',
          reasons: [
            {
              code: '1003',
              message:
                "Invalid value for field 'email' and value 'dylan.staley@hashicorp.co.k'",
            },
          ],
        },
      ],
      success: true,
    }
    expect(includesSkippedRecords(response)).toBe(true)
  })

  it('returns false when not containing skipped records', () => {
    const response = {
      requestId: 'f8a8#185cc1e96b9',
      result: [
        {
          status: 'created',
        },
      ],
      success: true,
    }
    expect(includesSkippedRecords(response)).toBe(false)
  })
})
