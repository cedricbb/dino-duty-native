import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { storage } from '../storage';
import { User } from '../types';

interface RoleSelectionScreenProps {
  onUserSelected: (user: User) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onUserSelected }) => {
  const [step, setStep] = useState<'role' | 'name'>('role');
  const [selectedRole, setSelectedRole] = useState<'parent' | 'child' | null>(null);
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const loadedUsers = await storage.getUsers();
    setUsers(loadedUsers);
  };

  const handleRoleSelect = (role: 'parent' | 'child') => {
    setSelectedRole(role);
    setStep('name');
  };

  const handleCreateUser = async () => {
    if (!name.trim() || !selectedRole) return;

    setLoading(true);
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      displayName: name.trim(),
      role: selectedRole,
      createdAt: new Date().toISOString(),
    };

    await storage.addUser(newUser);
    await storage.setCurrentUser(newUser);

    // Initialize dino progress for children
    if (selectedRole === 'child') {
      await storage.updateDinoProgress(newUser.id, {
        totalPoints: 0,
        level: 1,
        stage: 'egg',
      });
    }

    setLoading(false);
    onUserSelected(newUser);
  };

  const handleSelectExistingUser = async (user: User) => {
    await storage.setCurrentUser(user);
    onUserSelected(user);
  };

  if (step === 'role') {
    return (
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>🦕 Bienvenue sur DinoDuty !</Text>
          <Text style={styles.subtitle}>Qui es-tu ?</Text>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelect('parent')}
          >
            <Text style={styles.roleEmoji}>👨‍👩‍👧‍👦</Text>
            <Text style={styles.roleTitle}>Parent</Text>
            <Text style={styles.roleDescription}>Créer et valider des tâches</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRoleSelect('child')}
          >
            <Text style={styles.roleEmoji}>🧒</Text>
            <Text style={styles.roleTitle}>Enfant</Text>
            <Text style={styles.roleDescription}>Accomplir des tâches et faire grandir ton dino</Text>
          </TouchableOpacity>

          {users.length > 0 && (
            <View style={styles.existingUsers}>
              <Text style={styles.existingUsersTitle}>Ou continue avec :</Text>
              {users.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.userCard}
                  onPress={() => handleSelectExistingUser(user)}
                >
                  <Text style={styles.userEmoji}>{user.role === 'parent' ? '👨‍👩‍👧‍👦' : '🧒'}</Text>
                  <Text style={styles.userName}>{user.displayName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>
            {selectedRole === 'parent' ? '👨‍👩‍👧‍👦 Parent' : '🧒 Enfant'}
          </Text>
          <Text style={styles.subtitle}>Comment t'appelles-tu ?</Text>

          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Ton prénom"
              value={name}
              onChangeText={setName}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleCreateUser}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, (!name.trim() || loading) && styles.buttonDisabled]}
            onPress={handleCreateUser}
            disabled={!name.trim() || loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Création...' : 'C\'est parti ! 🚀'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setStep('role');
              setSelectedRole(null);
              setName('');
            }}
          >
            <Text style={styles.backButtonText}>← Retour</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.9,
  },
  roleCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  roleEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  input: {
    fontSize: 18,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  existingUsers: {
    marginTop: 40,
  },
  existingUsersTitle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  userCard: {
    backgroundColor: COLORS.white + 'CC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
});
