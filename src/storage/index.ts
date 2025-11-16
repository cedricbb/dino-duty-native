import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Task, DinoProgress, Badge, AppState } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: '@dinoduty/current_user',
  USERS: '@dinoduty/users',
  TASKS: '@dinoduty/tasks',
  DINO_PROGRESS: '@dinoduty/dino_progress',
  BADGES: '@dinoduty/badges',
  UNLOCKED_BADGES: '@dinoduty/unlocked_badges',
};

// Initialize default badges
const DEFAULT_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Premier Pas',
    description: 'Complète ta première tâche',
    icon: 'Star',
    pointsRequired: 0,
    tasksRequired: 1,
  },
  {
    id: 'badge-2',
    name: 'Débutant',
    description: 'Atteins 20 points',
    icon: 'Sparkles',
    pointsRequired: 20,
    tasksRequired: 0,
  },
  {
    id: 'badge-3',
    name: 'Travailleur',
    description: 'Atteins 40 points',
    icon: 'Zap',
    pointsRequired: 40,
    tasksRequired: 0,
  },
  {
    id: 'badge-4',
    name: 'Champion',
    description: 'Atteins 60 points',
    icon: 'Trophy',
    pointsRequired: 60,
    tasksRequired: 0,
  },
  {
    id: 'badge-5',
    name: 'Super-Héros',
    description: 'Atteins 100 points',
    icon: 'Award',
    pointsRequired: 100,
    tasksRequired: 0,
  },
  {
    id: 'badge-6',
    name: 'Légende',
    description: 'Atteins 150 points',
    icon: 'Crown',
    pointsRequired: 150,
    tasksRequired: 0,
  },
];

class StorageService {
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async setCurrentUser(user: User | null): Promise<void> {
    try {
      if (user) {
        await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const usersData = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      return usersData ? JSON.parse(usersData) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  async addUser(user: User): Promise<void> {
    try {
      const users = await this.getUsers();
      users.push(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const users = await this.getUsers();
      const index = users.findIndex(u => u.id === userId);
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const tasksData = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return tasksData ? JSON.parse(tasksData) : [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  }

  async addTask(task: Task): Promise<void> {
    try {
      const tasks = await this.getTasks();
      tasks.push(task);
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const index = tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const tasks = await this.getTasks();
      const filtered = tasks.filter(t => t.id !== taskId);
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async getDinoProgress(): Promise<DinoProgress[]> {
    try {
      const progressData = await AsyncStorage.getItem(STORAGE_KEYS.DINO_PROGRESS);
      return progressData ? JSON.parse(progressData) : [];
    } catch (error) {
      console.error('Error getting dino progress:', error);
      return [];
    }
  }

  async updateDinoProgress(childId: string, updates: Partial<DinoProgress>): Promise<void> {
    try {
      const progressList = await this.getDinoProgress();
      const index = progressList.findIndex(p => p.childId === childId);
      
      if (index !== -1) {
        progressList[index] = { ...progressList[index], ...updates, lastUpdated: new Date().toISOString() };
      } else {
        const newProgress: DinoProgress = {
          id: `progress-${Date.now()}`,
          childId,
          totalPoints: 0,
          level: 1,
          stage: 'egg',
          lastUpdated: new Date().toISOString(),
          ...updates,
        };
        progressList.push(newProgress);
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.DINO_PROGRESS, JSON.stringify(progressList));
    } catch (error) {
      console.error('Error updating dino progress:', error);
    }
  }

  async getBadges(): Promise<Badge[]> {
    try {
      const badgesData = await AsyncStorage.getItem(STORAGE_KEYS.BADGES);
      if (!badgesData) {
        // Initialize with default badges
        await AsyncStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(DEFAULT_BADGES));
        return DEFAULT_BADGES;
      }
      return JSON.parse(badgesData);
    } catch (error) {
      console.error('Error getting badges:', error);
      return DEFAULT_BADGES;
    }
  }

  async getUnlockedBadges(childId: string): Promise<string[]> {
    try {
      const key = `${STORAGE_KEYS.UNLOCKED_BADGES}_${childId}`;
      const badgesData = await AsyncStorage.getItem(key);
      return badgesData ? JSON.parse(badgesData) : [];
    } catch (error) {
      console.error('Error getting unlocked badges:', error);
      return [];
    }
  }

  async unlockBadge(childId: string, badgeId: string): Promise<void> {
    try {
      const key = `${STORAGE_KEYS.UNLOCKED_BADGES}_${childId}`;
      const unlockedBadges = await this.getUnlockedBadges(childId);
      if (!unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        await AsyncStorage.setItem(key, JSON.stringify(unlockedBadges));
      }
    } catch (error) {
      console.error('Error unlocking badge:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}

export const storage = new StorageService();
