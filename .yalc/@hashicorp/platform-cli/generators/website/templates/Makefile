# Default: run this if working on the website locally to run in watch mode.
website:
	@echo "==> Downloading latest Docker image..."
	@docker pull hashicorp/<%= name %>website
	@echo "==> Starting website in Docker..."
	@docker run \
		--interactive \
		--rm \
		--tty \
		--workdir "/website" \
		--volume "$(shell pwd):/website" \
		--volume "/website/node_modules" \
		--publish "3000:3000" \
		hashicorp/<%= name %>website \
		npm start

# This command will generate a static version of the website to the "out" folder.
build:
	@echo "==> Downloading latest Docker image..."
	@docker pull hashicorp/<%= name %>website
	@echo "==> Starting build in Docker..."
	@docker run \
		--interactive \
		--rm \
		--tty \
		--workdir "/website" \
		--volume "$(shell pwd):/website" \
		--volume "/website/node_modules" \
		hashicorp/<%= name %>website \
		npm run static

# If you are changing node dependencies locally, run this to generate a new
# local Docker image with the dependency changes included.
build-image:
	@echo "==> Building Docker image..."
	@docker build -t hashicorp-<%= name %>website-local .

# Use this to clear dependencies as well as the Nextjs cache and output folders.
# Useful if you've recently changed branches and are running into local errors.
clean:
	@echo "==> Deleting generated files..."
	npm run clean

# Use this if you have run `build-image` to use the locally built image
# rather than our CI-generated image to test dependency changes.
website-local:
	@echo "==> Downloading latest Docker image..."
	@docker pull hashicorp/<%= name %>website
	@echo "==> Starting website in Docker..."
	@docker run \
		--interactive \
		--rm \
		--tty \
		--workdir "/website" \
		--volume "$(shell pwd):/website" \
		--volume "/website/node_modules" \
		--publish "3000:3000" \
		hashicorp-<%= name %>website-local \
		npm start

.DEFAULT_GOAL := website
.PHONY: build build-imag clean website website-local
