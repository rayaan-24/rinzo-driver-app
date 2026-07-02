import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const HistoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <Text style={styles.subtitle}>List of completed and cancelled orders</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textMedium,
  },
});
