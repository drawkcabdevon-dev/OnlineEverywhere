#!/bin/bash

# Configuration
PROJECT_ID="test-2-485314"
IMAGE_NAME="ole-dev-app-images/app-suite"
TAG="new-post-handler"
FULL_IMAGE_PATH="gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG"

echo "🚀 Starting Deployment Helper..."

# 1. Check for Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not found. Please ensure Docker Desktop is running."
    exit 1
fi
echo "✅ Docker is found."

# 2. Check for Google Cloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI (gcloud) is not found."
    echo "   Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi
echo "✅ gcloud CLI is found."

# 3. Authenticate Docker with GCR
echo "🔑 Configuring Docker authentication for gcr.io..."
gcloud auth configure-docker gcr.io --quiet
if [ $? -ne 0 ]; then
    echo "❌ Failed to configure Docker authentication."
    echo "   Try running: 'gcloud auth login' first."
    exit 1
fi

# 4. Build the Image
echo "📦 Building Docker image..."
docker build -t $FULL_IMAGE_PATH --platform linux/amd64 .
if [ $? -ne 0 ]; then
    echo "❌ Docker build failed."
    exit 1
fi

# 5. Push the Image
echo "nm Pushing image to Google Container Registry..."
docker push $FULL_IMAGE_PATH

if [ $? -eq 0 ]; then
    echo "✅ Success! Image deployed to: $FULL_IMAGE_PATH"
else
    echo "❌ Docker push failed."
    exit 1
fi
