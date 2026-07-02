import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { moderateScale, screenWidth } from '../../../utils/responsive';
import { CustomButton } from '../../../components/common/CustomButton';
import { PageIndicator } from '../../../components/common/PageIndicator';

const s = (size: number) => moderateScale(size, 0.3);

interface OnboardingScreen3Props {
  onGetStarted?: () => void;
  onBack?: () => void;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  onGetStarted,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Spacer */}
      <View style={styles.headerSpacer} />

      {/* 3D OTP Verification Illustration Container */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/onboarding3_courier.png')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* Info Content Section */}
      <View style={styles.content}>
        <Text style={styles.title}>Secure Every Delivery</Text>
        <Text style={styles.subtitle}>
          Verify delivery with OTP and ensure every order reaches the right customer.
        </Text>
      </View>

      {/* Bottom Action Footer */}
      <View style={styles.footer}>
        <PageIndicator total={3} current={2} style={styles.indicator} />
        
        <View style={styles.buttonColumn}>
          <CustomButton
            title="Get Started  →"
            onPress={onGetStarted ? onGetStarted : () => {}}
            style={styles.getStartedButton}
          />
          <CustomButton
            title="Back"
            variant="secondary"
            onPress={onBack ? onBack : () => {}}
            style={styles.backButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerSpacer: {
    height: s(20),
  },
  illustrationContainer: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: s(10),
  },
  illustrationImage: {
    width: screenWidth * 0.9,
    height: '100%',
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(15),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: s(10),
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
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
  },
  indicator: {
    marginBottom: s(20),
  },
  buttonColumn: {
    flexDirection: 'column',
    width: '100%',
  },
  getStartedButton: {
    width: '100%',
    height: s(54),
    borderRadius: s(16),
    backgroundColor: '#7952F3',
  },
  backButton: {
    width: '100%',
    height: s(54),
    borderRadius: s(16),
    backgroundColor: '#FFFFFF',
    borderColor: '#E2DEF0',
    borderWidth: 1,
    marginTop: s(12),
  },
});

export default OnboardingScreen3;
