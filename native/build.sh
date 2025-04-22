#!/bin/bash

set -e

mkdir -p artifacts
mkdir -p temp

echo "🔍 Checking requirements..."

# Check cargo-xwin
if ! command -v cargo-xwin &> /dev/null; then
  echo "📦 Installing cargo-xwin..."
  cargo install cargo-xwin
fi

# Ensure Windows target is installed
if ! rustup target list | grep -q "x86_64-pc-windows-msvc (installed)"; then
  echo "🎯 Adding x86_64-pc-windows-msvc target..."
  rustup target add x86_64-pc-windows-msvc
fi

echo "🛠️ Building for host platform (fallback)..."
napi build ./temp/ --release
cp temp/kodkord-native.node artifacts/fallback-x64.node

echo "🐧 Building for Linux..."
napi build ./temp/ --release --target x86_64-unknown-linux-gnu
cp temp/kodkord-native.node artifacts/linux-x64-gnu.node

echo "🪟 Building for Windows..."
napi build ./temp/ --release --target x86_64-pc-windows-msvc
cp temp/kodkord-native.node artifacts/windows-x64-msvc.node

# cp temp/index.d.ts index.d.ts

# Clean up
rm -rf temp

echo "✅ Build complete. Artifacts stored in ./artifacts/"
