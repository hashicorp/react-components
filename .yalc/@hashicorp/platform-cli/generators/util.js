const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const { promisify } = require('util')
const readdirp = require('readdirp')
const CWD = process.cwd()

module.exports.validateFolderNameInput = function (name = 'folder', input) {
  const folderNameRegex = new RegExp(/^[a-z-]+$/)
  const folderNameValid = folderNameRegex.test(input)
  if (!folderNameValid) {
    return `A ${name} name can only contain lowercase letters and dashes. You entered: ${input}`
  }
  const folderNameExists = fse.readdirSync(CWD).includes(input)
  if (folderNameExists) {
    return `A folder with the name ${input} already exists.`
  } else {
    return true
  }
}

/**
 * Takes a folder containing files that can optionally contain ejs template strings, fills in any
 * template values if they exist, and copies the result to a destination folder.
 * @param {Object} opt
 * @param {String} opt.from - the directory that contains template files to copy from
 * @param {String} opt.to - the name of the directory the template files should be copied into
 * @param {Object} [opt.locals] - variables that can be rendered via ejs within templates
 * @return {Promise} a promise returning a list of output files
 */
module.exports.renderTemplatesFromDirectory = function ({ from, to, locals }) {
  // create the root directory
  fse.mkdirSync(to)

  // read all the files in the template directory
  return readdirp.promise(from).then((files) => {
    // go through each file
    return Promise.all(
      files.map((file) => {
        // format the output path
        const filePath = path.resolve(to, file.path)
        // render the template & write the file
        return promisify(ejs.renderFile)(file.fullPath, {
          ...locals,
        }).then((result) => fse.outputFile(filePath, result))
      })
    )
  })
}
