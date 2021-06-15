const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const {
  validateFolderNameInput,
  renderTemplatesFromDirectory,
} = require('../util')
const CWD = process.cwd()

module.exports = () => {
  return inquirer
    .prompt([
      {
        name: 'component',
        type: 'input',
        message: `Please provide a unique name for your new component using hyphens to separate words.\ne.g. my-new-component\n`,
        validate: validateFolderNameInput.bind(null, 'component'),
      },
    ])
    .then((answers) => {
      console.log(chalk.gray('rendering files...'))

      // Format component class name
      const componentClass = answers.component
        .split('-')
        .map((part) => `${part.charAt(0).toUpperCase()}${part.substr(1)}`)
        .join('')

      // render and copy over the files
      return renderTemplatesFromDirectory({
        from: path.resolve(__dirname, 'templates'),
        to: path.resolve(CWD, 'components', answers.component),
        locals: Object.assign({}, answers, { componentClass }),
      }).then(() => {
        console.log(
          `Created component ${chalk.green(componentClass)} in ${chalk.green(
            answers.component
          )}`
        )
      })
    })
}
