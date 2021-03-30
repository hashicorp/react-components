require('dotenv').config()
const { Octokit } = require('@octokit/core')
const { execFileSync } = require('child_process')

/**
 * To create batch release notes! Thanks @BRKalow
 *
 * Create a new octokit access token and add it to .env -- https://github.com/octokit/core.js#rest-api-example
 * Swap out the Publish commit sha and the release body and go for it 🎉
 *
 * */

;(async function () {
  const octokit = new Octokit({ auth: process.env.OCTOKIT_ACCESS_TOKEN })
  const SHA = '7c8682475ca9c35392f973332e20dc4b89ef05bf' // swap out the sha for your publish commit
  const RELEASE_BODY = `Add the release notes here`
  const tags = String(execFileSync('git', ['tag', '--points-at', SHA])).split(
    '\n'
  )
  await Promise.all(
    tags.map(async (tag) => {
      if (!tag) return

      try {
        await octokit.request('POST /repos/{owner}/{repo}/releases', {
          owner: 'hashicorp',
          repo: 'react-components',
          tag_name: tag,
          body: RELEASE_BODY,
        })
      } catch (e) {
        console.error(e.errors)
      }
    })
  )
})()
