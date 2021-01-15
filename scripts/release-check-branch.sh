#!/usr/bin/env bash

NL=$'\n'
GRAY=$'\e[02;39m'
RED=$'\e[31m'
GREEN=$'\e[32m'
NC=$'\e[0m'

echo "${NL}${GRAY}Checking branch..."
currentbranch=$(git rev-parse --abbrev-ref HEAD)
if [ $currentbranch != "master" ]; then
    echo "${RED}ERROR!${NC} Publish should only be run from master.${NL}You're on a branch ${RED}${currentbranch}${NC}${NL}"
    exit 1
else
    echo "${GREEN}✓${NC} Publishing off master${NL}"
fi
