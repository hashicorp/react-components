# 1. rebase zs.storybook on the working branch,
#    dropping any previous "storybook: setup-storybook" commits.
# 2. run this script
# 3. also, you can run ./scripts/deploy-storybook to update your fork and re-deploy this branch via the fork

# install storybook deps
npm i @babel/core@7 @storybook/addon-actions@6 @storybook/addon-docs@6 @storybook/addon-essentials@6 @storybook/addon-links@6 @storybook/react@6 babel-loader@8

# define new storybook-specific npm scripts, specifically:
# "storybook": "start-storybook -p 6006",
# "build-storybook": "build-storybook"
sed -i '' "s/\"prepare\": \"simple-git-hooks\"/\"prepare\": \"simple-git-hooks\",\n    \"storybook\": \"start-storybook -p 6006\",\n    \"build-storybook\": \"build-storybook\"/" package.json

# add storybook-static to gitignore
echo "\nstorybook-static" >>.gitignore

# commit
git commit -am "storybook: setup-storybook"
