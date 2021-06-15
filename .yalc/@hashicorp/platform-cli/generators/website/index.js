const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const {
  validateFolderNameInput,
  renderTemplatesFromDirectory
} = require('../util')

module.exports = () => {
  return inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: `Please provide a unique name for your new website using hyphens to separate words.\ne.g. my-new-website\n`,
        validate: validateFolderNameInput.bind(null, 'website')
      }
    ])
    .then(answers => {
      console.log(chalk.gray('rendering files...'))
      return renderTemplatesFromDirectory({
        from: path.resolve(__dirname, 'templates'),
        to: answers.name,
        locals: answers
      }).then(() => {
        console.log(`Created website ${chalk.green(answers.name)}`)
      })
    })
}
