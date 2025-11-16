import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DinoProgress } from '../types';
import { COLORS, STAGES } from '../constants';
import { getProgressPercentage } from '../utils/dinoProgress';

interface DinoDisplayProps {
  progress: DinoProgress;
}

export const DinoDisplay: React.FC<DinoDisplayProps> = ({ progress }) => {
  const stage = STAGES[progress.stage];
  const percentage = getProgressPercentage(progress.totalPoints);
  
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[stage.color + '40', stage.color + '10']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.emojiContainer, { transform: [{ translateY }] }]}>
          <Text style={styles.emoji}>{stage.emoji}</Text>
        </Animated.View>
        
        <Text style={styles.stageName}>{stage.name}</Text>
        <Text style={styles.points}>{progress.totalPoints} points</Text>
        <Text style={styles.level}>Niveau {progress.level}</Text>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: stage.color }]} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 20,
  },
  gradient: {
    padding: 30,
    alignItems: 'center',
  },
  emojiContainer: {
    marginBottom: 20,
  },
  emoji: {
    fontSize: 80,
  },
  stageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  points: {
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
});
