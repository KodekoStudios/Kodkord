@echo off
setlocal enabledelayedexpansion

echo 🔍 Checking requirements...

REM Crear carpetas
mkdir artifacts 2>nul
mkdir temp 2>nul

where cargo-xwin >nul 2>nul
if errorlevel 1 (
    echo 📦 Installing cargo-xwin...
    cargo install cargo-xwin
)

rustup target list | findstr "x86_64-pc-windows-msvc (installed)" >nul
if errorlevel 1 (
    echo 🎯 Adding x86_64-pc-windows-msvc target...
    rustup target add x86_64-pc-windows-msvc
)

echo 🛠️ Building for host platform (fallback)...
napi build .\temp\ --release
copy /Y temp\kodkord-native.node artifacts\fallback-x64.node >nul

echo 🐧 Building for Linux...
napi build .\temp\ --release --target x86_64-unknown-linux-gnu
copy /Y temp\kodkord-native.node artifacts\linux-x64-gnu.node >nul

echo 🪟 Building for Windows...
napi build .\temp\ --release --target x86_64-pc-windows-msvc
copy /Y temp\kodkord-native.node artifacts\windows-x64-msvc.node >nul

rmdir /S /Q temp

echo ✅ Build complete. Artifacts stored in .\artifacts\
