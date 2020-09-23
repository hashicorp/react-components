#!/usr/bin/env bash

set -e

GRAY='\033[1;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "\n${GRAY}Checking npm auth...${NC}"
NPMNAME=$(npm whoami)
echo "${GREEN}✓${NC} Logged in as ${GREEN}${NPMNAME}${NC}"
echo "${GRAY}Checking hashicorp:developers membership...${NC}"
NPMTEAM="hashicorp:developers"
NAMEONTEAM=$(npm team ls $NPMTEAM | grep $(npm whoami))
echo "${GREEN}✓${NC} Member of ${GREEN}${NPMTEAM}${NC}"
echo "${GRAY}Checking 2FA status...${NC}"

set +e

AUTHLINE=$(npm profile get --parseable | grep -o -e "tfa\s*.*")
declare -a AUTHPARTS=($(echo $AUTHLINE | cut -d' ' -f1-))
if [ ${#AUTHPARTS[@]} != 2 ]; then
    echo ${#AUTHPARTS[@]}
    echo "${RED}SCRIPT ERROR!${NC}Failed to parse TFA from your npm profile."
    echo "${GRAY} your npm profile for reference:"
    npm profile get --parseable
    exit 1
fi

if [ ${AUTHPARTS[1]} == "auth-and-writes" ]; then
    echo "${GREEN}✓${NC} 2FA for ${GREEN}${AUTHPARTS[1]}${NC} is ${GREEN}active${NC}\n"
else

    echo "${RED}ERROR!${NC} 2FA seems to be set to ${RED}${AUTHPARTS[1]}${NC} for ${NPMNAME}. \nYou must ${RED}enable 2FA for auth-and-writes${NC} to run release commands.\n"
    echo "${GRAY}Your npm profile:"
    npm profile get --parseable
    echo "\n"
fi
