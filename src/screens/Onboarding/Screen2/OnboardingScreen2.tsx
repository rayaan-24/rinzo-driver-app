import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { moderateScale, verticalScale, screenWidth } from '../../../utils/responsive';
import { CustomButton } from '../../../components/common/CustomButton';
import { PageIndicator } from '../../../components/common/PageIndicator';

const s = (size: number) => moderateScale(size, 0.3);
const vs = (size: number) => verticalScale(size);

interface OnboardingScreen2Props {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  onNext,
  onSkip,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Row */}
      <View style={styles.header}>
        <View style={styles.spacer} />
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* 3D Courier QR Illustration Container */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/onboarding2_courier.jpg')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Info Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>Every Parcel Tracked</Text>
        <Text style={styles.subtitle}>
          Each laundry bag receives a unique QR tag for complete traceability.
        </Text>
      </View>

      {/* Bottom Action Footer */}
      <View style={styles.footer}>
        <PageIndicator total={3} current={1} style={styles.indicator} />
        <CustomButton
          title="Next"
          onPress={onNext ? onNext : () => {}}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE5F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
    height: vs(48),
  },
  spacer: {
    flex: 1,
  },
  skipBtn: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  skipText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textDecorationLine: 'underline',
  },
  illustrationContainer: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(8),
  },
  illustrationImage: {
    width: screenWidth * 0.9,
    height: '100%',
    maxHeight: vs(340),
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(12),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: vs(8),
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: s(15),
    color: '#7C7985',
    textAlign: 'center',
    lineHeight: s(22),
    paddingHorizontal: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: vs(20),
    paddingTop: theme.spacing.xs,
  },
  indicator: {
    marginBottom: vs(20),
  },
  button: {
    width: '100%',
    height: vs(54),
    borderRadius: s(16),
    backgroundColor: '#7952F3',
  },
});

export default OnboardingScreen2;
