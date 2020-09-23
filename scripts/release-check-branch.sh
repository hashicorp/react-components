#!/usr/bin/env bash

GRAY='\033[1;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "\n${GRAY}Checking branch..."
currentbranch=$(git rev-parse --abbrev-ref HEAD)
if [ $currentbranch != "master" ]; then
    echo "${RED}ERROR!${NC} Publish should only be run from master.\nYou're on a branch ${RED}${currentbranch}\n"
    exit 1
else
    echo "${GREEN}✓${NC} Publishing off master\n"
fi
