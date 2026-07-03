import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { screenWidth, moderateScale } from '../utils/responsive';
const s = (size: number) => moderateScale(size, 0.3);
import { theme } from '../theme';

interface StatsCardProps {
  label: string;
  value: number;
  valueColor: string;
}

// Calculate width to fit 3 cards in a row with margins
const CARD_WIDTH = (screenWidth - theme.spacing.md * 2 - theme.spacing.sm * 2) / 3;

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, valueColor }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: s(12),
    paddingHorizontal: theme.spacing.sm,
    width: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: s(10),
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
    marginBottom: s(4),
    textAlign: 'center',
  },
  value: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(28),
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
  },
});
