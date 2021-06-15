const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const signale = require('signale')
const ejs = require('ejs')

const CWD = process.cwd()

module.exports = async () => {
  const pathToFile = path.join(CWD, 'scripts', 'should-build.sh')

  // Render the file using ejs
  const result = await promisify(ejs.renderFile)(
    path.join(__dirname, 'templates', 'should-build.sh')
  )

  signale.await(`Writing ignore build step script to ${pathToFile}...`)

  try {
    await fs.promises.writeFile(pathToFile, result, {
      encoding: 'utf-8',
    })

    signale.success(`Created ignore build step script!`)
    signale.log(
      '\n\t➜ Ensure the Ignore Build Step is configured in Vercel as: `bash ./scripts/should-build.sh`.'
    )
    signale.log(
      '\t➜ More information: https://vercel.com/docs/platform/projects#ignored-build-step'
    )
  } catch (error) {
    signale.error('Unable to write ignore build step script.')
    signale.error(error)
  }
}
