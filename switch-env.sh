#!/bin/bash

# This script helps switch between environment configurations

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}FleetBlox Environment Switcher${NC}"
echo "============================="

# Function to show current environment
show_current_env() {
  if [ -f .env.local ]; then
    ENV_TYPE=$(grep "NEXT_PUBLIC_ENV" .env.local | cut -d '=' -f2)
    if [ -z "$ENV_TYPE" ]; then
      ENV_TYPE=$(grep "NEXT_PUBLIC_ENV" .env | cut -d '=' -f2)
    fi
    echo -e "${YELLOW}Current environment:${NC} $ENV_TYPE"
  else
    echo -e "${YELLOW}Current environment:${NC} development (default)"
  fi
}

# Show current environment
show_current_env
echo

# Provide options
echo "Select the environment to switch to:"
echo "1. Development"
echo "2. Production"
echo "3. Custom (configure manually)"
echo "4. Exit"
echo

# Get user input
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo -e "${GREEN}Switching to development environment...${NC}"
    cp .env.development .env.local
    echo "// Custom overrides for local development" >> .env.local
    ;;
  2)
    echo -e "${GREEN}Switching to production environment...${NC}"
    cp .env.production .env.local
    echo "// Custom overrides for local production testing" >> .env.local
    ;;
  3)
    echo -e "${GREEN}Creating custom environment...${NC}"
    if [ ! -f .env.local ]; then
      cp .env.example .env.local
    fi
    echo "Edit .env.local with your custom configuration"
    ;;
  4)
    echo -e "${BLUE}Exiting without changes${NC}"
    exit 0
    ;;
  *)
    echo -e "${YELLOW}Invalid choice. Exiting without changes.${NC}"
    exit 1
    ;;
esac

echo
echo -e "${GREEN}Environment switch complete!${NC}"
show_current_env
echo
echo "Restart your development server for changes to take effect."
