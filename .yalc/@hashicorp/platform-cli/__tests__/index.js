const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

test('lint: valid css', () => {
  const res = execCli('lint', 'valid.css')
  expect(res).toMatch(/Stylelint passed!/)
  expect(res).not.toMatch(/Stylelint did not find any valid files to lint/)
})

test('lint: invalid css', () => {
  const res = execCliError('lint', 'invalid.css')
  expect(res).toMatch(/color-no-invalid-hex/)
  expect(res).not.toMatch(/Stylelint passed!/)
})

test('lint: executes eslint', () => {
  const res = execCli('lint', 'valid.js')
  expect(res).not.toMatch(/ESLint did not find any valid files to lint/)
  expect(res).toMatch(/ESLint passed!/)
})

// there is a lot more test coverage that could be added for the format
// command, this test just covers the most basic case that it runs and works
test('format: basic', () => {
  // ensure the command output is correct
  const res = execCli('format', 'prettier.js')
  expect(res).toMatch(
    /Formatting packages\/cli\/__tests__\/fixtures\/prettier\.js/
  )
  expect(res).toMatch('Formatting complete!')
  // ensure the formatting actually happened
  const defaultValue = fs.readFileSync(
    path.join(__dirname, 'fixtures/prettier.original.js'),
    'utf8'
  )
  const fileContents = fs.readFileSync(
    path.join(__dirname, 'fixtures/prettier.js'),
    'utf8'
  )
  expect(fileContents).not.toEqual(defaultValue)

  // reset the formatting to what it was before
  fs.writeFileSync(path.join(__dirname, 'fixtures/prettier.js'), defaultValue)
})

// not currently covered because it requires things to be staged in git which
// i didn't want to deal with, and is ultimately just a wrapper for lint & format
test.todo('precommit')

// not tested because i didn't want to go down the rabbit hole of mocking and
// simulating CLI input right now
test.todo('generate')

// this is also a fairly basic test and could be expanded
test('markdown-blocks', () => {
  const template = fs.readFileSync(
    path.join(__dirname, 'fixtures/markdown-blocks.original.md'),
    'utf8'
  )
  const fixturePath = path.join(__dirname, 'fixtures/markdown-blocks.md')
  let fixture = fs.readFileSync(fixturePath, 'utf8')

  // ensure they initially match
  expect(template).toEqual(fixture)

  // run the command
  execCli('markdown-blocks', 'markdown-blocks.md')

  // read the file again and make sure they dont match
  fixture = fs.readFileSync(fixturePath, 'utf8')
  expect(template).not.toEqual(fixture)

  // reset the fixture
  fs.writeFileSync(fixturePath, template)
})

// test utilities

function execCli(cmd, fixturePath) {
  return String(
    execSync(
      `${path.join(__dirname, '../next-hashicorp')} ${cmd} ${
        fixturePath ? path.join(__dirname, 'fixtures', fixturePath) : ''
      }`
    )
  )
}

function execCliError(cmd, fixturePath) {
  try {
    execCli(cmd, fixturePath)
  } catch (err) {
    return String(err.stdout)
  }
}
