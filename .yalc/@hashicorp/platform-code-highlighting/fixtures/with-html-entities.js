const readFile = require('./_read-file')

// Note: fixture input and output are in
// separate files to make them easier to edit
module.exports = {
  input: readFile('with-html-entities_input.txt'),
  output: readFile('with-html-entities_output.txt'),
}
