import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types';
import { COLORS } from '../constants';

interface TaskCardProps {
  task: Task;
  onComplete?: () => void;
  onValidate?: () => void;
  onReject?: () => void;
  isParentView?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onValidate,
  onReject,
  isParentView = false,
}) => {
  return (
    <View style={[
      styles.container,
      task.completed && styles.completedContainer,
      task.validated && styles.validatedContainer,
    ]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.points}>+{task.points} pts</Text>
        </View>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
      </View>

      {!isParentView && !task.completed && onComplete && (
        <TouchableOpacity
          style={styles.button}
          onPress={onComplete}
        >
          <Text style={styles.buttonText}>✓ J'ai fait !</Text>
        </TouchableOpacity>
      )}

      {isParentView && task.completed && !task.validated && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.validateButton]}
            onPress={onValidate}
          >
            <Text style={styles.buttonText}>✓ Valider</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={onReject}
          >
            <Text style={styles.buttonText}>✗ Rejeter</Text>
          </TouchableOpacity>
        </View>
      )}

      {task.validated && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✓ Validé</Text>
        </View>
      )}

      {task.completed && !task.validated && !isParentView && (
        <View style={[styles.badge, styles.pendingBadge]}>
          <Text style={styles.badgeText}>⏳ En attente</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  validatedContainer: {
    backgroundColor: '#f0fdf4',
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  validateButton: {
    flex: 1,
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: COLORS.error,
  },
  badge: {
    backgroundColor: COLORS.success + '20',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  pendingBadge: {
    backgroundColor: COLORS.warning + '20',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
