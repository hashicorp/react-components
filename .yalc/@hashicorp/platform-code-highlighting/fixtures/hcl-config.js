const readFile = require('./_read-file')

// Note: fixture input and output are in
// separate files to make them easier to edit
module.exports = {
  input: readFile('hcl-config_input.txt'),
  output: readFile('hcl-config_output.txt'),
}
