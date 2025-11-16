export type UserRole = 'parent' | 'child';

export interface User {
  id: string;
  displayName: string;
  role: UserRole;
  parentId?: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  points: number;
  frequency: 'daily' | 'weekly' | 'custom';
  childId: string;
  completed: boolean;
  validated: boolean;
  completedAt?: string;
  validatedAt?: string;
  createdAt: string;
}

export interface DinoProgress {
  id: string;
  childId: string;
  totalPoints: number;
  level: number;
  stage: 'egg' | 'baby' | 'juvenile' | 'adult' | 'legendary';
  lastUpdated: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired: number;
  tasksRequired: number;
  unlockedAt?: string;
}

export interface DinoFact {
  id: string;
  fact: string;
  category: string;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  dinoProgress: DinoProgress[];
  badges: Badge[];
  unlockedBadges: string[];
}
