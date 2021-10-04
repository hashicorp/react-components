cd ../react-components-zchsh
git checkout main
git fetch upstream zs.storybook
git reset --hard upstream/zs.storybook
git push -u origin main --force-with-lease
cd ../react-components
