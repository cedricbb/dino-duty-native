# Assets pour DinoDuty

## Images nécessaires

Pour que l'application fonctionne correctement, vous devez ajouter les images suivantes dans ce dossier :

### 1. icon.png (1024x1024 px)
- Icône principale de l'application
- Format: PNG avec transparence
- Utilisé pour l'icône de l'app sur les appareils

### 2. splash.png (1242x2436 px recommandé)
- Écran de démarrage
- Format: PNG
- Couleur de fond: #10b981 (vert émeraude)
- Peut contenir un logo ou un dinosaure

### 3. adaptive-icon.png (1024x1024 px)
- Icône adaptative pour Android
- Format: PNG avec transparence
- Zone de sécurité: 108px de marge sur tous les côtés

### 4. favicon.png (48x48 px)
- Favicon pour la version web
- Format: PNG

## Créer vos propres assets

### Option 1: Utiliser un outil en ligne
- [Figma](https://www.figma.com) - Design gratuit
- [Canva](https://www.canva.com) - Templates prêts à l'emploi

### Option 2: Générer avec l'IA
- Utilisez des prompts comme:
  - "Un dinosaure mignon avec un tablier, style cartoon, fond transparent"
  - "Logo d'application pour enfants avec un œuf de dinosaure coloré"

### Option 3: Assets temporaires
Pour tester l'application rapidement, vous pouvez utiliser des couleurs unies:
- Créez des carrés de couleur verte (#10b981) aux dimensions requises

## Commandes Expo pour régénérer les icônes

Si vous avez déjà une image principale (icon.png), vous pouvez utiliser:

```bash
npx expo-optimize
```

Cette commande optimisera automatiquement vos images pour toutes les plateformes.

## Vérifier vos assets

Après avoir ajouté les images, lancez:

```bash
npm start
```

Et vérifiez que:
- L'icône s'affiche correctement dans Expo Go
- L'écran de démarrage apparaît au lancement
- Aucune erreur de fichier manquant n'est signalée

## Notes importantes

- Tous les fichiers doivent être en minuscules
- Pas d'espaces dans les noms de fichiers
- Format PNG recommandé pour la transparence
- Optimisez vos images pour réduire la taille de l'app
