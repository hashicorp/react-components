import capitalize from './capitalize'
import mitigateWidows from './mitigate-widows'

describe('capitalize', () => {
  it('should capitalize the first letter of the string', () => {
    const input = `hello world...`
    const output = `Hello world...`
    expect(capitalize(input)).toBe(output)
  })
})

describe('mitigateWidows', () => {
  const widowTests = [
    {
      itString: 'should return an empty string unmodified',
      string: '',
      expected: '',
    },
    {
      itString: 'should not modify a string with no spaces',
      string: 'thisIsAStringWithNoSpaces',
      expected: 'thisIsAStringWithNoSpaces',
    },
    {
      itString: 'should replace the last space in a basic example',
      string: 'This is a basic widow.',
      expected: 'This is a basic&nbsp;widow.',
    },
    {
      itString:
        'should not replace a space between a long word and short widow.',
      string: 'Long word, widow is relatively short.',
      expected: 'Long word, widow is relatively short.',
    },
    {
      itString: 'should account for a shorter unbreakLimit',
      string: 'Here are some words, hello world.',
      unbreakLimit: 11,
      expected: 'Here are some words, hello world.',
    },
    {
      itString: 'should account for a longer unbreakLimit',
      string: 'Long word, then relatively short.',
      unbreakLimit: 17,
      expected: 'Long word, then relatively&nbsp;short.',
    },
    {
      itString: 'should not replace newlines or tabs',
      string: 'Text\nwith\nnewlines\tand\ttabs.',
      expected: 'Text\nwith\nnewlines\tand\ttabs.',
    },
  ]
  for (let i = 0; i < widowTests.length; i++) {
    const { itString, string, unbreakLimit, expected } = widowTests[i]
    it(itString, () => {
      expect(mitigateWidows(string, unbreakLimit)).toBe(expected)
    })
  }
})
