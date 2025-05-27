#!/bin/bash

set -e  # Arrête le script si une commande échoue

echo "🔧 Installing root dependencies..."
npm install

# Function to install and optionally build a subdirectory
install_dir() {
  local dir=$1
  local do_build=$2

  echo "📦 Installing dependencies for $dir..."
  cd $dir
  npm install

  if [ "$do_build" = true ]; then
    echo "🏗️  Building $dir..."
    npm run build
  fi

  cd ..
}

install_dir "shared-types" true
install_dir "backend" false
install_dir "frontend" false
install_dir "chrome-extension" false

echo "✅ All dependencies installed."

echo "🌍 Setting up environment files..."

cp -n backend/.env.example backend/.env && echo "✅ backend/.env created." || echo "ℹ️ backend/.env already exists."
cp -n frontend/.env.local.example frontend/.env.local && echo "✅ frontend/.env.local created." || echo "ℹ️ frontend/.env.local already exists."
cp -n chrome-extension/.env.example chrome-extension/.env && echo "✅ chrome-extension/.env created." || echo "ℹ️ chrome-extension/.env already exists."

echo "🧪 Don't forget to configure your environment files manually!"
echo "→ backend/.env: add your Anthropic API key"
echo "→ backend/.env: configure database credentials if needed"
