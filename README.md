# HashiCorp React Components

This project is a monorepo containing a library of react components that are shared between multiple HashiCorp web properties. It also includes a component playground that uses [swingset](https://github.com/hashicorp/swingset) to create a space where component authors and contributors can experiment with and quickly iterate on component design and functionality.

## Usage

- **Getting Started:** Run `npm i` to install dependencies.
- **Running the Playground:** Run `npm start` - it will start a dev server which can be viewed at `http://localhost:3000`.
- **Running Tests:**: Run `npm t` to execute the tests. To run watch mode on tests, `npm run test:watch` - this is helpful during development.

The `packages` directory contains all the individual components. Let's talk about some of the most important files:

- `index.jsx`: primary export of the component itself
- `index.test.js`: tests for the component, run using [jest](https://jestjs.io/)
- `docs.mdx`: documentation for the component, see [swingset docs](https://github.com/hashicorp/swingset#usage) for more details on the format
- `props.js`: information about the component's props, see [swingset docs](https://github.com/hashicorp/swingset#props) for more details on the format

## Adding package dependencies

We use [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces/) to manage dependencies for all packages. With this in mind, all new dependencies should be added from the project root, using the `--workspace` argument. For example, to add the [`classnames`](https://www.npmjs.com/package/classnames) package to our `button` component, you would run:

```
npm i classnames --workspace=@hashicorp/react-button
```

> Note: with this in mind, package folders, such as `packages/button`, should not contain `package-lock.json` files. If you accidentally install a dependency from within a package folder, please ensure you 1) remove the `package-lock.json` file, and 2) re-run `npm i` from the project root to ensure the root `package-lock.json` is up to date.

## Environment Variables

A few of the elements in our playground rely on environment variables in order to function correctly. We have a `react-components .env.local` stored in 1Password if you'd like to quickly get started. Details on each environment variable:

- `GITHUB_API_TOKEN`
  - Used in `UsageDetails` to fetch `package.json`s from each of our projects
- `SOURCEGRAPH_URL`
  - Used in `UsageDetails` to build links out to [our SourceGraph instance](https://hashicorp-mktg.sourcegraph.com)

## Publishing

Publishing is handled through the [`changesets` library](https://github.com/atlassian/changesets). Publishing is done in CI if changes are found. For more information on how to work with changesets, see [this document](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md).

### Adding a changeset

Run the following command and follow the prompt:

```
npx changeset
```

To make any adjustments to your changeset, just edit the file!

### Releases

The release process is handled mostly automatically via the changesets GitHub action. When changeset files get merged to `main`, a Pull Request is opened which will, upon merge, release all pending changesets and remove the changeset files. We should not need to publish manually with this flow. See the `changesets/action`(https://github.com/changesets/action) repo for more information.

### Canary Releases

If you want to test your changes before merging, you can add a `release:canary` label to your pull request. If any changeset files are found, a release will be created and tagged with `canary`. You can then install the canary version elsewhere:

```
npm install @hashicorp/react-package@canary
```

### Prereleases

Prereleases are also handled through a process integrated into `changesets`. The full flow is outlined in [this document](https://github.com/atlassian/changesets/blob/main/docs/prereleases.md). To enter a prerelease mode for the `canary` tag, we would do something like this:

```
npx changeset pre enter canary
GITHUB_TOKEN=<your token> npx changeset version
GITHUB_TOKEN=<your token> npx changeset publish
```

To continue publishing preleases, use the `npx changeset` command like normal and use the `version` and `publish` commands as appropriate.

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
