#!/bin/bash

# Installation script for react-timeline-editor custom module

echo "🚀 Installing react-timeline-editor custom module dependencies..."

# Check if npm or yarn is available
if command -v npm &> /dev/null; then
    echo "Using npm to install dependencies..."
    npm install
elif command -v yarn &> /dev/null; then
    echo "Using yarn to install dependencies..."
    yarn install
else
    echo "❌ Error: Neither npm nor yarn is installed. Please install Node.js and npm first."
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "📖 Usage:"
echo "  Import the Timeline component in your React project:"
echo "  import { Timeline } from './custom';"
echo ""
echo "📚 See README.md and example.tsx for more details." 