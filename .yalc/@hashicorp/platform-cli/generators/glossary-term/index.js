const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const ejs = require('ejs')
const slugify = require('slugify')
const { promisify } = require('util')
const open = require('open')

const CWD = process.cwd()

const validateTermDoesNotExist = async (term) => {
  try {
    await fs.promises.access(
      path.join(CWD, 'content', 'glossary', `${term}.mdx`),
      fs.constants.F_OK
    )
    // If the access call succeeds, we assume the term exists and so return false
    return `A term with the name ${term} already exists`
  } catch {
    // If the access call fails, we assume the term does not exist and so we return true
    return true
  }
}

const writeTerm = async (term) => {
  const pathToGlossaryDir = path.join(CWD, 'content', 'glossary')
  const filename = `${slugify(term, { lower: true, strict: true })}.mdx`
  const pathToTerm = path.join(pathToGlossaryDir, filename)

  // ensure the glossary directory exists
  await fs.promises.mkdir(pathToGlossaryDir, { recursive: true })

  // Render the file using ejs
  const result = await promisify(ejs.renderFile)(
    path.join(__dirname, 'templates', 'term.mdx'),
    { term }
  )

  await fs.promises.writeFile(pathToTerm, result, {
    encoding: 'utf-8',
  })

  return pathToTerm
}

module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'term',
      type: 'input',
      message: `Please provide the name of the term you are defining:`,
      validate: validateTermDoesNotExist,
    },
  ])

  console.log(chalk.gray('writing new term...'))

  const pathToTerm = await writeTerm(answers.term)

  console.log(
    `Created term ${chalk.green(answers.term)} at ${chalk.green(pathToTerm)}`
  )

  const { shouldOpen } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldOpen',
      message: 'Open the term file in your editor?',
    },
  ])

  if (shouldOpen) await open(pathToTerm)
}
