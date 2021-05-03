require('dotenv').config()
const { Octokit } = require('@octokit/core')
const { execFileSync } = require('child_process')

// Update this value with your release notes
const RELEASE_BODY = `Add the release notes here`

/**
 * To create batch release notes! Thanks @BRKalow & @kendallstrautman
 *
 * Create a new octokit access token and add it to .env -- https://github.com/octokit/core.js#rest-api-example
 * Pass in the publish commit SHA as an argument and update the release body notes to generate releases 🎉
 *
 * */

;(async function () {
  const octokit = new Octokit({ auth: process.env.OCTOKIT_ACCESS_TOKEN })
  const [, , SHA] = process.argv
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
