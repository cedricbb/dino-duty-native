# DinoDuty - Application Mobile Native

Application React Native pour gamifier les tâches ménagères des enfants avec un système de progression de dinosaure.

## 🦕 Fonctionnalités

### Interface Enfant
- Tableau de bord avec progression visuelle du dinosaure
- Liste des tâches à accomplir
- Validation simple avec bouton "J'ai fait !"
- Faits amusants sur les dinosaures après chaque tâche complétée
- Système de niveaux et d'évolution du dinosaure (œuf → bébé → jeune → adulte → légendaire)

### Interface Parent
- Création et gestion des tâches
- Attribution de points par tâche
- Validation ou rejet des tâches complétées
- Suivi de la progression de l'enfant
- Gestion multi-enfants

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI
- Expo Go sur votre téléphone (iOS ou Android)

### Étapes d'installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer l'application :
```bash
npm start
```

3. Scanner le QR code avec :
   - **iOS** : Application Appareil photo
   - **Android** : Application Expo Go

## 📱 Structure de l'application

```
dinoduty-native/
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── DinoDisplay.tsx
│   │   ├── TaskCard.tsx
│   │   └── DinoFactModal.tsx
│   ├── screens/          # Écrans de l'application
│   │   ├── RoleSelectionScreen.tsx
│   │   ├── ChildDashboardScreen.tsx
│   │   └── ParentDashboardScreen.tsx
│   ├── storage/          # Gestion du stockage AsyncStorage
│   │   └── index.ts
│   ├── types/            # Types TypeScript
│   │   └── index.ts
│   ├── constants/        # Constantes (couleurs, faits, etc.)
│   │   └── index.ts
│   └── utils/            # Fonctions utilitaires
│       └── dinoProgress.ts
├── App.tsx               # Point d'entrée de l'application
└── package.json
```

## 🎨 Palette de couleurs

- **Primary** : #10b981 (Vert émeraude)
- **Secondary** : #8b5cf6 (Violet)
- **Background** : #f0fdf4 (Vert très clair)
- **Success** : #22c55e
- **Warning** : #f59e0b
- **Error** : #ef4444

## 📊 Système de progression

### Stades d'évolution du dinosaure
1. **Œuf** (0-20 points) 🥚
2. **Bébé** (21-50 points) 🦖
3. **Jeune** (51-100 points) 🦕
4. **Adulte** (101-150 points) 🦴
5. **Légendaire** (151+ points) 👑

### Points par niveau
- 1 niveau = 10 points
- Les points sont gagnés en complétant et validant des tâches

## 💾 Stockage des données

L'application utilise **AsyncStorage** pour stocker localement :
- Profils des utilisateurs (parents et enfants)
- Tâches créées et leur statut
- Progression des dinosaures
- Badges débloqués

## 🔧 Technologies utilisées

- **React Native** - Framework mobile
- **Expo** - Outils de développement
- **TypeScript** - Typage statique
- **AsyncStorage** - Stockage local
- **Expo Linear Gradient** - Dégradés de couleurs
- **React Native SVG** - Support des icônes SVG

## 📝 Scripts disponibles

- `npm start` - Lancer le serveur de développement Expo
- `npm run android` - Lancer sur émulateur Android
- `npm run ios` - Lancer sur simulateur iOS
- `npm run web` - Lancer version web

## 🎯 Prochaines fonctionnalités

- [ ] Notifications push pour rappeler les tâches
- [ ] Système de récompenses supplémentaires
- [ ] Statistiques et graphiques de progression
- [ ] Mode hors ligne amélioré
- [ ] Synchronisation cloud optionnelle
- [ ] Thèmes personnalisables
- [ ] Plus de faits amusants sur les dinosaures

## 🐛 Signaler un bug

Si vous rencontrez un problème, veuillez créer une issue avec :
- Description du problème
- Étapes pour reproduire
- Captures d'écran si possible
- Version de l'application

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍👩‍👧‍👦 Pour les parents

Cette application a été conçue pour :
- Motiver les enfants de manière positive
- Éviter les conflits liés aux tâches ménagères
- Créer une routine ludique et éducative
- Renforcer l'autonomie des enfants
- Passer un moment agréable en famille

## 🎮 Pour les enfants

Avec DinoDuty, tu peux :
- Faire grandir ton propre dinosaure
- Gagner des points en faisant tes tâches
- Découvrir des faits amusants sur les dinosaures
- Devenir un super-héros du rangement !

---

Fait avec ❤️ pour les familles
