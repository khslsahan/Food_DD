#!/bin/bash

# --- Configuration ---
# Your Docker Hub username or organization
REGISTRY="sahanbcs"
# The name of your application's image
IMAGE_NAME="nutrition-app"
# The tag for the 'latest' version
LATEST_TAG="latest"

# --- Colors for Output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --- Script Logic ---

# If a tag is provided, use it. Otherwise, get the latest git tag.
if [ -n "$1" ]; then
    VERSION="$1"
else
    # Try to get the latest git tag
    VERSION=$(git describe --tags --abbrev=0 2>/dev/null)
    if [ -z "$VERSION" ]; then
        echo -e "${RED}❌ Error: No tag provided and no git tag found!${NC}"
        echo -e "${YELLOW}Usage: ./build-and-push.sh <your-tag>${NC}"
        echo -e "${YELLOW}Or:    git tag <tag>; ./build-and-push.sh${NC}"
        exit 1
    else
        echo -e "${YELLOW}ℹ️  No tag argument provided. Using latest git tag: ${VERSION}${NC}"
    fi
fi

echo -e "${GREEN}🚀 Starting Docker build & push process...${NC}"
echo -e "${YELLOW}   Registry: ${REGISTRY}${NC}"
echo -e "${YELLOW}   Image:    ${IMAGE_NAME}${NC}"
echo -e "${YELLOW}   Tag:      ${VERSION}${NC}"

# Build the Docker image with the user-provided tag
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}"
echo -e "\n${YELLOW}📦 Building image: ${FULL_IMAGE_NAME}:${VERSION}${NC}"
docker build -t "${FULL_IMAGE_NAME}:${VERSION}" .

# Check if the build was successful
if [ $? -ne 0 ]; then
    echo -e "\n${RED}❌ Build failed! Aborting.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Tag the new image as 'latest'
echo -e "\n${YELLOW}🏷️  Tagging image '${FULL_IMAGE_NAME}:${VERSION}' as latest...${NC}"
docker tag "${FULL_IMAGE_NAME}:${VERSION}" "${FULL_IMAGE_NAME}:${LATEST_TAG}"

# Push the version-specific tag to the registry
echo -e "\n${YELLOW}📤 Pushing tag '${VERSION}' to registry...${NC}"
docker push "${FULL_IMAGE_NAME}:${VERSION}"

# Push the 'latest' tag to the registry
echo -e "\n${YELLOW}📤 Pushing tag 'latest' to registry...${NC}"
docker push "${FULL_IMAGE_NAME}:${LATEST_TAG}"

echo -e "\n${GREEN}🎉 Process completed successfully!${NC}"
echo -e "Pushed the following tags to Docker Hub:"
echo -e "  - ${GREEN}${FULL_IMAGE_NAME}:${VERSION}${NC}"
echo -e "  - ${GREEN}${FULL_IMAGE_NAME}:${LATEST_TAG}${NC}" 