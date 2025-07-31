#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Clear screen and show header
clear
echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                    🚀 Git Deployment Script 🚀                ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository!${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Adding files to staging area...${NC}"
git add .
echo -e "${GREEN}✅ Files added successfully!${NC}"
echo ""

# Get current branch
current_branch=$(git branch --show-current)
echo -e "${BLUE}🌿 Current branch: ${PURPLE}$current_branch${NC}"
echo ""

# Show status
echo -e "${YELLOW}📊 Current status:${NC}"
git status --short
echo ""

# Prompt for commit message
echo -e "${CYAN}💬 Enter your commit message:${NC}"
echo -e "${YELLOW}   (Press Enter when done)${NC}"
read -p "   " commit_message

# Check if commit message is empty
if [ -z "$commit_message" ]; then
    echo -e "${RED}❌ Commit message cannot be empty!${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🔨 Committing changes...${NC}"
git commit -m "$commit_message"
echo -e "${GREEN}✅ Commit successful!${NC}"
echo ""

echo -e "${YELLOW}🚀 Pushing to remote repository...${NC}"
git push origin main
echo -e "${GREEN}✅ Push successful!${NC}"
echo ""

# Show final status
echo -e "${CYAN}📈 Final status:${NC}"
git status --short
echo ""

echo -e "${GREEN}🎉 Deployment completed successfully! 🎉${NC}"
echo -e "${BLUE}   Repository: $(git remote get-url origin)${NC}"
echo -e "${BLUE}   Branch: $current_branch${NC}"
echo -e "${BLUE}   Commit: $(git rev-parse --short HEAD)${NC}"
