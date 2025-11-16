import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RoleSelectionScreen, ChildDashboardScreen, ParentDashboardScreen } from './src/screens';
import { storage } from './src/storage';
import { User } from './src/types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const user = await storage.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  };

  const handleUserSelected = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await storage.setCurrentUser(null);
    setCurrentUser(null);
  };

  if (loading) {
    return null;
  }

  if (!currentUser) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <RoleSelectionScreen onUserSelected={handleUserSelected} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {currentUser.role === 'child' ? (
        <ChildDashboardScreen user={currentUser} onLogout={handleLogout} />
      ) : (
        <ParentDashboardScreen user={currentUser} onLogout={handleLogout} />
      )}
    </SafeAreaProvider>
  );
}
