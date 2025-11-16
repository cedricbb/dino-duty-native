export const COLORS = {
  primary: '#10b981',
  primaryDark: '#059669',
  primaryLight: '#34d399',
  secondary: '#8b5cf6',
  background: '#f0fdf4',
  white: '#ffffff',
  text: '#1f2937',
  textLight: '#6b7280',
  border: '#e5e7eb',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  egg: '#fef3c7',
  baby: '#bfdbfe',
  juvenile: '#fca5a5',
  adult: '#a78bfa',
  legendary: '#fbbf24',
};

export const DINO_FACTS = [
  {
    id: '1',
    fact: 'Les dinosaures faisaient leur nid avec des feuilles et des branches !',
    category: 'home',
  },
  {
    id: '2',
    fact: 'Le T-Rex avait des dents aussi longues qu\'une banane !',
    category: 'fun',
  },
  {
    id: '3',
    fact: 'Les bébés dinosaures éclosaient de gros œufs, comme les oiseaux !',
    category: 'eggs',
  },
  {
    id: '4',
    fact: 'Les dinosaures herbivores mangeaient des plantes toute la journée !',
    category: 'food',
  },
  {
    id: '5',
    fact: 'Certains dinosaures étaient aussi petits qu\'une poule !',
    category: 'size',
  },
  {
    id: '6',
    fact: 'Les dinosaures vivaient il y a 65 millions d\'années !',
    category: 'history',
  },
  {
    id: '7',
    fact: 'Le Stégosaure avait des plaques sur le dos pour se protéger !',
    category: 'defense',
  },
  {
    id: '8',
    fact: 'Les dinosaures communiquaient avec des sons et des mouvements !',
    category: 'communication',
  },
];

export const STAGES = {
  egg: {
    name: 'Œuf',
    minPoints: 0,
    maxPoints: 20,
    color: COLORS.egg,
    emoji: '🥚',
  },
  baby: {
    name: 'Bébé',
    minPoints: 21,
    maxPoints: 50,
    color: COLORS.baby,
    emoji: '🦖',
  },
  juvenile: {
    name: 'Jeune',
    minPoints: 51,
    maxPoints: 100,
    color: COLORS.juvenile,
    emoji: '🦕',
  },
  adult: {
    name: 'Adulte',
    minPoints: 101,
    maxPoints: 150,
    color: COLORS.adult,
    emoji: '🦴',
  },
  legendary: {
    name: 'Légendaire',
    minPoints: 151,
    maxPoints: 999999,
    color: COLORS.legendary,
    emoji: '👑',
  },
};

export const POINTS_PER_LEVEL = 10;
