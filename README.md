# HashiCorp React Components

This project is a [lerna](https://github.com/lerna/lerna) monorepo containing a library of react components that are shared between multiple HashiCorp web properties. It also includes a component playground that uses [swingset](https://github.com/hashicorp/swingset) to create a space where component authors and contributors can experiment with and quickly iterate on component design and functionality.

## Usage

- **Getting Started:** Run `npm i` to install base-level dependencies, then follow with `npm run bootstrap` to install dependencies for each component in the `packages` directory.
- **Running the Playground:** Run `npm start` - it will start a dev server which can be viewed at `http://localhost:3000`.
- **Running Tests:**: Run `npm t` to execute the tests. To run watch mode on tests, `npm run test:watch` - this is helpful during development.

The `packages` directory contains all the individual components. Let's talk about some of the most important files:

- `index.jsx`: primary export of the component itself
- `index.test.js`: tests for the component, run using [jest](https://jestjs.io/)
- `docs.mdx`: documentation for the component, see [swingset docs](https://github.com/hashicorp/swingset#usage) for more details on the format
- `props.js`: information about the component's props, see [swingset docs](https://github.com/hashicorp/swingset#props) for more details on the format

## Environment Variables

A few of the elements in our playground rely on environment variables in order to function correctly. We have a `react-components .env.local` stored in 1Password if you'd like to quickly get started. Details on each environment variable:

- `GITHUB_API_TOKEN`
  - Used in `UsageDetails` to fetch `package.json`s from each of our projects
- `SOURCEGRAPH_URL`
  - Used in `UsageDetails` to build links out to [our SourceGraph instance](https://sourcegraph.hashi-mktg.com)

## Publishing Packages

We manage and distribute packages to [`npm`](https://www.npmjs.com/) using [Lerna](https://lerna.js.org/). Each component is independently published and versioned.

### Prerequisites

In order to publish packages, you must:

1. Be added to the HashiCorp organization on `npm`
2. [Enable 2-factor authentication](https://docs.npmjs.com/configuring-two-factor-authentication) on your npm account
3. Log into to `npm` in your CLI with [`npm login`](https://docs.npmjs.com/cli/adduser)

If you have not done any of these steps, the publish script will fail.

### Publishing `--canary` releases

Canary releases allow us to publish and test in-progress changes to components.

```
npm run release:canary
```

You can consume pre-releases with something like `npm install @hashicorp/react-package-name@next`. Canary releases should only be used in staging contexts, not production.

By default, `npm run release:canary` will publish a pre-patch canary release. If you're working on feature changes or breaking changes, you'll likely want to run the appropriate versioning command within the package folder before running `npm run release:canary`. This also helps signal the versioning intent to reviewers.

**Further details**: `npm run release:canary` will publish any changed packages and their dependencies. It tags the release with the `@next` dist-tag. It also uses [Lerna's `--canary` option](https://github.com/lerna/lerna/tree/master/commands/publish#--canary) to avoid version collisions across branches.

### Publishing Production Releases

Production releases should only be published off of `main`.

```sh
npm run release
```

Any production releases should be **immediately followed up by bumping the updated package** in any consuming projects.

For most web-components packages, this means checking the `hashicorp-www-next` repo for Dependabot PRs to bump the package in question. You can view open Dependabot PRs on `hashicorp-www-next` using [the PR view with the `author:app/dependabot-preview` filter applied](https://github.com/hashicorp/hashicorp-www-next/pulls/app%2Fdependabot-preview).

### Oh no! I got a 401 and now my packages are like half-published

The current workaround is not ideal, but should completely fix the issue. Definitely reach out if you need assistance, as almost everyone on the team has run into this:

1. **Remove the "Publish" commit**. The "Publish" commit will most likely be your most recent commit, in which case the command below can be used. **These commands rewrite git history, so use caution!**

   ```sh
   git reset --hard HEAD^ # reset the previous commit
   git push origin main --force-with-lease # push new history
   ```

1. **Delete the tags** that point to the deleted publish commit

   ```sh
   git tag --delete {tagname} # delete the local tag
   git push --delete origin {tagname} # delete the remote tag
   ```

   For example:

   ```sh
   git tag --delete @hashicorp/react-secondary-nav@2.1.0
   git push --delete origin @hashicorp/react-secondary-nav@2.1.0
   ```

   If multiple packages were published, you'll need to delete tags for each individual package.

Now everything should be reset to its state prior to the publish failure.

## Batch Release Notes

Upon publishing new versions of any package(s), corresponding [GitHub release(s)](https://github.com/hashicorp/react-components/releases) should be published as well with information about the changes, migration notes and links to the PR where changes occurred.

When publishing one or two packages, you can manually create the releases in the GitHub interface. However, if you released a big batch of updates that affects many packages in a similar way (think dependency updates), this process for publishing releases can be automated via [this helpful script](https://github.com/hashicorp/react-components/blob/main/scripts/create-batch-release-notes.js).

### Setup

To use this script, you'll need to setup some config. This script uses [Octokit](https://github.com/octokit/core.js#rest-api-example) to interface with the [GitHub API](https://docs.github.com/en/rest/reference/repos#create-a-release) easily.

First, create a [new personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) (select `repo` scope) and add it to your local `.env` file or just paste it directly into the script. This is how you'll authenticate to create the GitHub release. _Note, you'll also need to [**Enable SSO**](https://docs.github.com/en/github/authenticating-to-github/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on) on the token since this is a Hashicorp repo_

Next, you'll want to head to the script file: `scripts/create-batch-release-notes` and add in your release notes body.

```js
const RELEASE_BODY = `Add the release notes here`
```

This content will be published in the body of all the releases related to the recently published packages, so please ensure it's providing the correct info.

### Executing the script

Now you can run the script while passing in the `sha` of the publish commit as a command-line argument. (This is the commit that updates all the version numbers. [See this example](https://github.com/hashicorp/react-components/commit/49699840cdb61fffbe4cdbce01a10873626a2259))

When you're ready, navigate to your terminal in the root of this project and run:

```sh
node scripts/create-batch-release-notes.js <YOUR_PUBLISH_SHA>
```

If all goes well, you should now see these releases published in GitHub. If you have issues, check that the access token has SSO-Enabled.
