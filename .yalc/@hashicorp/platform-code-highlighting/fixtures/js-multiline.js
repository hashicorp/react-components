const readFile = require('./_read-file')

// Note: fixture input and output are in
// separate files to make them easier to edit
module.exports = {
  input: readFile('js-multiline_input.txt'),
  output: readFile('js-multiline_output.txt'),
}
