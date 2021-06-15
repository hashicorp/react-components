const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const {
  validateFolderNameInput,
  renderTemplatesFromDirectory
} = require('../util')
const CWD = process.cwd()

module.exports = () => {
  return inquirer
    .prompt([
      {
        name: 'page',
        type: 'input',
        message: `Please provide a unique name for your new page using hyphens to separate words.\ne.g. my-new-page\n`,
        validate: validateFolderNameInput.bind(null, 'page')
      },
      {
        name: 'data',
        type: 'list',
        message: 'What type of page would you like to generate?',
        choices: [
          { name: 'Typescript with DatoCMS', default: true },
          { name: 'Typescript, no data fetching' }
        ]
      }
    ])
    .then(answers => {
      console.log(chalk.gray('rendering files...'))

      // Format page class name
      const pageClass = answers.page
        .split('-')
        .map(part => `${part.charAt(0).toUpperCase()}${part.substr(1)}`)
        .join('')

      // render and copy over the files
      const destinationPath = path.resolve(CWD, 'pages', answers.page)
      return renderTemplatesFromDirectory({
        from: path.resolve(__dirname, 'templates'),
        to: destinationPath,
        locals: Object.assign({}, answers, { pageClass })
      }).then(() => {
        if (answers.data === 'Typescript, no data fetching') {
          fs.unlinkSync(path.join(destinationPath, 'index.tsx'))
          fs.unlinkSync(path.join(destinationPath, 'query.graphql'))
          fs.renameSync(
            path.join(destinationPath, 'index_nodata.tsx'),
            path.join(destinationPath, 'index.tsx')
          )
        }

        if (answers.data === 'Typescript with DatoCMS') {
          fs.unlinkSync(path.join(destinationPath, 'index_nodata.tsx'))
        }

        console.log(
          `Created page ${chalk.green(pageClass)} in ${chalk.green(
            answers.page
          )}`
        )
      })
    })
}
