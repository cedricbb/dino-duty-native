#!/bin/bash

# Script de démarrage rapide pour DinoDuty
# Ce script vérifie les prérequis et lance l'application

echo "🦕 Bienvenue dans DinoDuty - Script de démarrage"
echo "=============================================="
echo ""

# Vérifier Node.js
echo "📦 Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé."
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js détecté: $NODE_VERSION"
echo ""

# Vérifier npm
echo "📦 Vérification de npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm détecté: $NPM_VERSION"
echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📥 Installation des dépendances..."
    echo "⏳ Cela peut prendre quelques minutes..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dépendances installées avec succès !"
    else
        echo "❌ Erreur lors de l'installation des dépendances"
        exit 1
    fi
else
    echo "✅ Dépendances déjà installées"
fi

echo ""
echo "🎨 Vérification des assets..."
if [ ! -f "assets/icon.png" ]; then
    echo "⚠️  Warning: assets/icon.png manquant"
    echo "   Consultez assets/README.md pour plus d'informations"
else
    echo "✅ Assets détectés"
fi

echo ""
echo "🚀 Lancement de l'application..."
echo ""
echo "📱 Instructions:"
echo "   1. Installez Expo Go sur votre téléphone"
echo "   2. Scannez le QR code qui va apparaître"
echo "   3. L'application se lancera automatiquement"
echo ""
echo "💡 Astuce: Appuyez sur 'r' pour recharger l'app"
echo "           Appuyez sur 'j' pour ouvrir le debugger"
echo ""

# Lancer l'application
npm start
