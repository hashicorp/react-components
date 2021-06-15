## Running the Site Locally

The website can be run locally through node.js or [Docker](https://www.docker.com/get-started). If you choose to run through Docker, everything will be a little bit slower due to the additional overhead, so for frequent contributors it may be worth it to use node.

> **Note:** If you are using a text editor that uses a "safe write" save style such as **vim** or **goland**, this can cause issues with the live reload in development. If you turn off safe write, this should solve the problem. In vim, this can be done by running `:set backupcopy=yes`. In goland, search the settings for "safe write" and turn that setting off.

### With Docker

Running the site locally is simple. Provided you have Docker installed, clone this repo, run `make`, and then visit `http://localhost:3000`.

The docker image is pre-built with all the website dependencies installed, which is what makes it so quick and simple, but also means if you need to change dependencies and test the changes within Docker, you'll need a new image. If this is something you need to do, you can run `make build-image` to generate a local Docker image with updated dependencies, then `make website-local` to use that image and preview.

### With Node

If your local development environment has a supported version (v10.0.0+) of [node installed](https://nodejs.org/en/) you can run:

- `npm install`
- `npm start`

...and then visit `http://localhost:3000`.

If you pull down new code from github, you should run `npm install` again. Otherwise, there's no need to re-run `npm install` each time the site is run, you can just run `npm start` to get it going.
