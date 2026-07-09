import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from '../../../utils/responsive';

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
  const insets = useSafeAreaInsets();
  const hasTabBar = !onBack;
  const bottomPadding = hasTabBar
    ? 72 + (insets.bottom > 0 ? insets.bottom : theme.spacing.md) + theme.spacing.md
    : insets.bottom > 0 ? insets.bottom : theme.spacing.md;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentWrapper}>
        <Header
          title="Performance"
          showBack={!!onBack}
          onBackPress={onBack}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.comingSoonContainer,
            {
              paddingBottom: bottomPadding,
            },
          ]}
        >
          <View 
            style={styles.iconWrapper}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel="Trend chart icon"
          >
            <TrendIcon size={48} color="#7C4DFF" />
          </View>
          <Text style={styles.title} maxFontSizeMultiplier={1.3}>Coming Soon</Text>
          <Text style={styles.description} maxFontSizeMultiplier={1.3}>
            We're building a comprehensive dashboard to help you track your ratings, earnings, and delivery efficiency.
          </Text>
        </ScrollView>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(32),
  },
  iconWrapper: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(24),
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(24),
    color: theme.colors.textDark,
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(16),
    color: theme.colors.textMedium,
    textAlign: 'center',
    lineHeight: moderateScale(24),
  },
});
