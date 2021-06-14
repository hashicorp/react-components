const readFile = require('./_read-file')

// Note: fixture input and output are in
// separate files to make them easier to edit
module.exports = {
  input: readFile('state-management_input.txt'),
  output: readFile('state-management_output.txt'),
}
