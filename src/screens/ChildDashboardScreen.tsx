import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DinoDisplay, TaskCard, DinoFactModal } from '../components';
import { storage } from '../storage';
import { User, Task, DinoProgress } from '../types';
import { COLORS } from '../constants';
import { calculateLevel, calculateStage, getRandomFact } from '../utils/dinoProgress';

interface ChildDashboardScreenProps {
  user: User;
  onLogout: () => void;
}

export const ChildDashboardScreen: React.FC<ChildDashboardScreenProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState<DinoProgress | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentFact, setCurrentFact] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allTasks = await storage.getTasks();
    const userTasks = allTasks.filter(t => t.childId === user.id);
    setTasks(userTasks);

    const progressList = await storage.getDinoProgress();
    const userProgress = progressList.find(p => p.childId === user.id);
    
    if (!userProgress) {
      const newProgress: DinoProgress = {
        id: `progress-${user.id}`,
        childId: user.id,
        totalPoints: 0,
        level: 1,
        stage: 'egg',
        lastUpdated: new Date().toISOString(),
      };
      await storage.updateDinoProgress(user.id, newProgress);
      setProgress(newProgress);
    } else {
      setProgress(userProgress);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCompleteTask = async (taskId: string) => {
    await storage.updateTask(taskId, {
      completed: true,
      completedAt: new Date().toISOString(),
    });

    // Show random fact
    setCurrentFact(getRandomFact());
    setShowFactModal(true);

    await loadData();
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Salut {user.displayName} ! 👋</Text>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.logoutText}>Changer</Text>
          </TouchableOpacity>
        </View>

        {progress && <DinoDisplay progress={progress} />}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            📋 Mes tâches ({pendingTasks.length})
          </Text>
          {pendingTasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateEmoji}>🎉</Text>
              <Text style={styles.emptyStateText}>
                Super ! Tu as terminé toutes tes tâches !
              </Text>
            </View>
          ) : (
            pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => handleCompleteTask(task.id)}
              />
            ))
          )}
        </View>

        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ✅ Tâches complétées ({completedTasks.length})
            </Text>
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </View>
        )}
      </ScrollView>

      <DinoFactModal
        visible={showFactModal}
        fact={currentFact}
        onClose={() => setShowFactModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.primary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyStateEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
