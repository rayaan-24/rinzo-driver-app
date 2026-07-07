import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import Svg, { Path } from 'react-native-svg';

interface PerformanceScreenProps {
  onBack?: () => void;
}

const TrendIcon = ({ size = 64, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 23 6 L 13.5 15.5 L 8.5 10.5 L 1 18"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M 17 6 H 23 V 12"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({ onBack }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentWrapper}>
        <Header
          title="Performance"
          showBack={!!onBack}
          onBackPress={onBack}
        />
        <View style={styles.comingSoonContainer}>
          <View style={styles.iconWrapper}>
            <TrendIcon size={48} color="#7C4DFF" />
          </View>
          <Text style={styles.title}>Coming Soon</Text>
          <Text style={styles.description}>
            We're building a comprehensive dashboard to help you track your ratings, earnings, and delivery efficiency.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentWrapper: {
    flex: 1,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.textMedium,
    textAlign: 'center',
    lineHeight: 24,
  },
});
