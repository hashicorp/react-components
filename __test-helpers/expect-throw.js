/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export default function expectToThrow(fn, throwResult) {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
  expect(fn).toThrow(throwResult)
  console.error.mockRestore()
}
