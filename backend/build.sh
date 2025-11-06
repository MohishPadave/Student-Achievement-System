#!/bin/bash
echo "Starting build process..."
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Installing dependencies..."
npm install --production
echo "Build completed successfully!"