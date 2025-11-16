@echo off
REM Script de démarrage rapide pour DinoDuty (Windows)

echo 🦕 Bienvenue dans DinoDuty - Script de démarrage
echo ==============================================
echo.

REM Vérifier Node.js
echo 📦 Vérification de Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js n'est pas installé.
    echo Veuillez installer Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js détecté: %NODE_VERSION%
echo.

REM Vérifier npm
echo 📦 Vérification de npm...
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm n'est pas installé.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm détecté: %NPM_VERSION%
echo.

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo 📥 Installation des dépendances...
    echo ⏳ Cela peut prendre quelques minutes...
    call npm install
    
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Dépendances installées avec succès !
    ) else (
        echo ❌ Erreur lors de l'installation des dépendances
        pause
        exit /b 1
    )
) else (
    echo ✅ Dépendances déjà installées
)

echo.
echo 🎨 Vérification des assets...
if not exist "assets\icon.png" (
    echo ⚠️  Warning: assets\icon.png manquant
    echo    Consultez assets\README.md pour plus d'informations
) else (
    echo ✅ Assets détectés
)

echo.
echo 🚀 Lancement de l'application...
echo.
echo 📱 Instructions:
echo    1. Installez Expo Go sur votre téléphone
echo    2. Scannez le QR code qui va apparaître
echo    3. L'application se lancera automatiquement
echo.
echo 💡 Astuce: Appuyez sur 'r' pour recharger l'app
echo            Appuyez sur 'j' pour ouvrir le debugger
echo.

REM Lancer l'application
call npm start
