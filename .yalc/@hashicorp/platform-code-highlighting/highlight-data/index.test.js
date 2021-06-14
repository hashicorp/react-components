const highlightData = require('./')
// Fixtures
const JS_FIXTURE = require('../fixtures/hello-world')
const HCL_FIXTURE = require('../fixtures/hcl-config')
const JSON_FIXTURE = require('../fixtures/state-management')

test('returns an empty object given an empty object', () => {
  return highlightData({}).then((result) => {
    expect(result).toStrictEqual({})
  })
})

test('modifies a { code, language } object', () => {
  return highlightData({
    code: JS_FIXTURE.input,
    language: 'javascript',
  }).then((result) => {
    expect(result).toStrictEqual({
      code: JS_FIXTURE.output,
      language: 'javascript',
    })
  })
})

test('modifies a { code, language: { slug } } object', () => {
  return highlightData({
    code: JSON_FIXTURE.input,
    language: { name: 'JSON', slug: 'json' },
  }).then((result) => {
    expect(result).toStrictEqual({
      code: JSON_FIXTURE.output,
      language: { name: 'JSON', slug: 'json' },
    })
  })
})

test('modifies a deeply nested { code, language } object', () => {
  const data = {
    foo: {
      bar: {},
      baz: {
        code: HCL_FIXTURE.input,
        language: 'hcl',
      },
    },
  }
  return highlightData(data).then((result) => {
    expect(result).toStrictEqual({
      foo: {
        bar: {},
        baz: {
          code: HCL_FIXTURE.output,
          language: 'hcl',
        },
      },
    })
  })
})

test('modifies a deeply nested { code, language: { slug } } object', () => {
  const data = {
    foo: {
      bar: {},
      baz: {
        code: HCL_FIXTURE.input,
        language: {
          name: 'HCL',
          slug: 'hcl',
        },
      },
    },
  }
  return highlightData(data).then((result) => {
    expect(result).toStrictEqual({
      foo: {
        bar: {},
        baz: {
          code: HCL_FIXTURE.output,
          language: {
            name: 'HCL',
            slug: 'hcl',
          },
        },
      },
    })
  })
})
