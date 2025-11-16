import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskCard } from '../components';
import { storage } from '../storage';
import { User, Task, DinoProgress } from '../types';
import { COLORS } from '../constants';
import { calculateLevel, calculateStage } from '../utils/dinoProgress';

interface ParentDashboardScreenProps {
  user: User;
  onLogout: () => void;
}

export const ParentDashboardScreen: React.FC<ParentDashboardScreenProps> = ({ user, onLogout }) => {
  const [children, setChildren] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedChild, setSelectedChild] = useState<User | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    points: '5',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allUsers = await storage.getUsers();
    const childUsers = allUsers.filter(u => u.role === 'child');
    setChildren(childUsers);

    if (childUsers.length > 0 && !selectedChild) {
      setSelectedChild(childUsers[0]);
    }

    const allTasks = await storage.getTasks();
    setTasks(allTasks);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !selectedChild) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      points: parseInt(newTask.points) || 5,
      frequency: 'daily',
      childId: selectedChild.id,
      completed: false,
      validated: false,
      createdAt: new Date().toISOString(),
    };

    await storage.addTask(task);
    setNewTask({ title: '', description: '', points: '5' });
    setShowAddTask(false);
    await loadData();
  };

  const handleValidateTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    await storage.updateTask(taskId, {
      validated: true,
      validatedAt: new Date().toISOString(),
    });

    // Update dino progress
    const progressList = await storage.getDinoProgress();
    const childProgress = progressList.find(p => p.childId === task.childId);
    const newPoints = (childProgress?.totalPoints || 0) + task.points;
    const newLevel = calculateLevel(newPoints);
    const newStage = calculateStage(newPoints);

    await storage.updateDinoProgress(task.childId, {
      totalPoints: newPoints,
      level: newLevel,
      stage: newStage,
    });

    await loadData();
  };

  const handleRejectTask = async (taskId: string) => {
    await storage.updateTask(taskId, {
      completed: false,
      completedAt: undefined,
    });
    await loadData();
  };

  const handleDeleteTask = async (taskId: string) => {
    await storage.deleteTask(taskId);
    await loadData();
  };

  const childTasks = selectedChild
    ? tasks.filter(t => t.childId === selectedChild.id)
    : [];

  const pendingValidation = childTasks.filter(t => t.completed && !t.validated);
  const validatedTasks = childTasks.filter(t => t.validated);
  const activeTasks = childTasks.filter(t => !t.completed);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Espace Parent 👨‍👩‍👧‍👦</Text>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.logoutText}>Changer</Text>
          </TouchableOpacity>
        </View>

        {children.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>👶</Text>
            <Text style={styles.emptyStateText}>
              Aucun enfant enregistré. Demandez à votre enfant de créer son compte !
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.childSelector}>
              <Text style={styles.childSelectorLabel}>Enfant :</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {children.map((child) => (
                  <TouchableOpacity
                    key={child.id}
                    style={[
                      styles.childChip,
                      selectedChild?.id === child.id && styles.childChipActive,
                    ]}
                    onPress={() => setSelectedChild(child)}
                  >
                    <Text
                      style={[
                        styles.childChipText,
                        selectedChild?.id === child.id && styles.childChipTextActive,
                      ]}
                    >
                      {child.displayName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddTask(true)}
            >
              <Text style={styles.addButtonText}>+ Ajouter une tâche</Text>
            </TouchableOpacity>

            {pendingValidation.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  ⏳ À valider ({pendingValidation.length})
                </Text>
                {pendingValidation.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onValidate={() => handleValidateTask(task.id)}
                    onReject={() => handleRejectTask(task.id)}
                    isParentView
                  />
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                📋 Tâches actives ({activeTasks.length})
              </Text>
              {activeTasks.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    Aucune tâche active. Ajoutez-en une !
                  </Text>
                </View>
              ) : (
                activeTasks.map((task) => (
                  <View key={task.id}>
                    <TaskCard task={task} isParentView />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteTask(task.id)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️ Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            {validatedTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  ✅ Validées ({validatedTasks.length})
                </Text>
                {validatedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} isParentView />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      <Modal
        visible={showAddTask}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddTask(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouvelle tâche</Text>

            <TextInput
              style={styles.input}
              placeholder="Nom de la tâche"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optionnel)"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={styles.input}
              placeholder="Points"
              value={newTask.points}
              onChangeText={(text) => setNewTask({ ...newTask, points: text })}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddTask(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.saveButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  childSelector: {
    padding: 20,
    paddingTop: 0,
  },
  childSelectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  childChip: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  childChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  childChipText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  childChipTextActive: {
    color: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
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
    margin: 20,
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
  deleteButton: {
    backgroundColor: COLORS.error + '20',
    borderRadius: 8,
    padding: 8,
    marginTop: -8,
    marginBottom: 12,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
    color: COLORS.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});
