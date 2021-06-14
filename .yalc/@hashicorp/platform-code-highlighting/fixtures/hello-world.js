const readFile = require('./_read-file')

// Note: fixture input and output are in
// separate files to make them easier to edit
module.exports = {
  input: readFile('hello-world_input.txt'),
  output: readFile('hello-world_output.txt'),
}
