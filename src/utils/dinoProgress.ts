import { DinoProgress } from '../types';
import { STAGES, POINTS_PER_LEVEL } from '../constants';

export const calculateStage = (points: number): 'egg' | 'baby' | 'juvenile' | 'adult' | 'legendary' => {
  if (points >= STAGES.legendary.minPoints) return 'legendary';
  if (points >= STAGES.adult.minPoints) return 'adult';
  if (points >= STAGES.juvenile.minPoints) return 'juvenile';
  if (points >= STAGES.baby.minPoints) return 'baby';
  return 'egg';
};

export const calculateLevel = (points: number): number => {
  return Math.floor(points / POINTS_PER_LEVEL) + 1;
};

export const getProgressPercentage = (points: number): number => {
  const stage = calculateStage(points);
  const stageInfo = STAGES[stage];
  const pointsInStage = points - stageInfo.minPoints;
  const stageRange = stageInfo.maxPoints - stageInfo.minPoints;
  return Math.min((pointsInStage / stageRange) * 100, 100);
};

export const getNextMilestone = (points: number): { points: number; name: string } => {
  const stage = calculateStage(points);
  
  switch (stage) {
    case 'egg':
      return { points: STAGES.baby.minPoints, name: 'Bébé Dino' };
    case 'baby':
      return { points: STAGES.juvenile.minPoints, name: 'Jeune Dino' };
    case 'juvenile':
      return { points: STAGES.adult.minPoints, name: 'Dino Adulte' };
    case 'adult':
      return { points: STAGES.legendary.minPoints, name: 'Dino Légendaire' };
    case 'legendary':
      return { points: points + 50, name: 'Continue comme ça !' };
  }
};

export const getRandomFact = (): string => {
  const facts = [
    'Les dinosaures faisaient leur nid avec des feuilles !',
    'Le T-Rex avait des dents aussi longues qu\'une banane !',
    'Les bébés dinosaures éclosaient de gros œufs !',
    'Certains dinosaures étaient aussi petits qu\'une poule !',
    'Les dinosaures vivaient il y a 65 millions d\'années !',
    'Le Stégosaure avait des plaques pour se protéger !',
  ];
  return facts[Math.floor(Math.random() * facts.length)];
};
