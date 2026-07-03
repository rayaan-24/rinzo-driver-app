import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 20 12 H 4 M 10 18 L 4 12 L 10 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 16 H 12.01 M 12 13 C 12 13 12.5 12.5 13.5 11.5 C 14.5 10.5 14.5 9.5 13.5 8.5 C 12.5 7.5 11.5 7.5 10.5 8.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({ size = 24, color = '#D97706' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 6 V 12 L 16 14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ArrowRightIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 5 12 H 19 M 12 5 L 19 12 L 12 19"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ==========================================
// COMPONENT INTERFACE
// ==========================================

interface UploadSuccessScreenProps {
  onGoToDashboard: () => void;
  onViewProfile: () => void;
}

export const UploadSuccessScreen: React.FC<UploadSuccessScreenProps> = ({
  onGoToDashboard,
  onViewProfile,
}) => {
  // Timeline Animation values
  const screenFade = useRef(new Animated.Value(0)).current;

  // Cohesive Illustration Card Entrance Animations
  const cardScale = useRef(new Animated.Value(0.7)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardRotate = useRef(new Animated.Value(-6)).current; // -6 to 0 degrees

  // Continuous floats and breathes (loops)
  const cardFloatY = useRef(new Animated.Value(0)).current;
  const cardBreathScale = useRef(new Animated.Value(1)).current;

  // Soft Green Glow behind the tick area
  const glowScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  // Verification status card progress
  const progressBarWidth = useRef(new Animated.Value(0)).current;

  // Staggered Action Button entries
  const primaryBtnOpacity = useRef(new Animated.Value(0)).current;
  const primaryBtnTranslateY = useRef(new Animated.Value(20)).current;
  const secondaryBtnOpacity = useRef(new Animated.Value(0)).current;
  const secondaryBtnTranslateY = useRef(new Animated.Value(20)).current;

  // Pressed scales
  const dashboardScale = useRef(new Animated.Value(1)).current;
  const profileScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Screen Entry Fade In (250ms)
    Animated.timing(screenFade, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // 2. Cohesive Illustration Entrance (Scale 0.7 -> 1.15 -> 1.0, Opacity 0 -> 1, Rotate -6 -> 0: spring over 700ms)
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1.0,
        friction: 5,
        tension: 30,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(cardRotate, {
        toValue: 0,
        friction: 6,
        tension: 30,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 3. Continuous breathing loop (Scale 1.0 -> 1.04 -> 1.0 over 2200ms)
      Animated.loop(
        Animated.sequence([
          Animated.timing(cardBreathScale, {
            toValue: 1.04,
            duration: 1100,
            useNativeDriver: true,
          }),
          Animated.timing(cardBreathScale, {
            toValue: 1.0,
            duration: 1100,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // 4. Soft green glow pulse overlay behind checkmark (repeat every 3 seconds)
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.4,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(glowOpacity, {
              toValue: 0.3,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0,
              duration: 900,
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Reset scale and opacity instantly for next cycle
        Animated.parallel([
          Animated.timing(glowScale, { toValue: 1.0, duration: 0, useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
        Animated.delay(1800), // 1200ms pulse + 1800ms delay = 3000ms cycle
      ])
    ).start();

    // 5. Phone float loop (translateY 0 -> -6 -> 0: 2400ms infinite easeInOut)
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloatY, {
          toValue: -6,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(cardFloatY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 6. Progress Bar filling (0% -> 33% over 800ms)
    Animated.timing(progressBarWidth, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // 7. Buttons Stagger Fade Up (translateY 20 -> 0)
    // Primary: Go to Dashboard (delay 600ms)
    Animated.parallel([
      Animated.timing(primaryBtnOpacity, { toValue: 1, duration: 400, delay: 600, useNativeDriver: true }),
      Animated.timing(primaryBtnTranslateY, { toValue: 0, duration: 400, delay: 600, useNativeDriver: true }),
    ]).start();

    // Secondary: View My Profile (delay 700ms)
    Animated.parallel([
      Animated.timing(secondaryBtnOpacity, { toValue: 1, duration: 400, delay: 700, useNativeDriver: true }),
      Animated.timing(secondaryBtnTranslateY, { toValue: 0, duration: 400, delay: 700, useNativeDriver: true }),
    ]).start();

  }, [screenFade, cardScale, cardOpacity, cardRotate, cardBreathScale, glowScale, glowOpacity, cardFloatY, progressBarWidth, primaryBtnOpacity, primaryBtnTranslateY, secondaryBtnOpacity, secondaryBtnTranslateY]);

  // Width Interpolations
  const widthInterpolation = progressBarWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '33%'],
  });

  const getPrimaryBtnStyle = () => ({
    opacity: primaryBtnOpacity,
    transform: [{ translateY: primaryBtnTranslateY }, { scale: dashboardScale }],
  });

  const getSecondaryBtnStyle = () => ({
    opacity: secondaryBtnOpacity,
    transform: [{ translateY: secondaryBtnTranslateY }, { scale: profileScale }],
  });

  // Haptic feedbacks
  const handleDashboardIn = () => {
    Animated.timing(dashboardScale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };
  const handleDashboardOut = () => {
    Animated.timing(dashboardScale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };
  const handleProfileIn = () => {
    Animated.timing(profileScale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };
  const handleProfileOut = () => {
    Animated.timing(profileScale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFade }]}>
      <View style={styles.contentWrapper}>
        
        {/* 1. FIXED HEADER */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Go Back"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onViewProfile}
            style={styles.headerButton}
          >
            <ArrowLeftIcon size={22} color={theme.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Document Upload</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Help"
            accessibilityRole="button"
            activeOpacity={0.7}
            style={styles.headerButtonRight}
          >
            <HelpIcon size={20} color={theme.colors.textDark} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. SUCCESS HERO ILLUSTRATION WRAPPER */}
          <View style={styles.heroWrapper}>
            <Animated.View
              style={[
                styles.illustrationContainer,
                {
                  opacity: cardOpacity,
                  transform: [
                    { scale: cardScale },
                    { scale: cardBreathScale },
                    { translateY: cardFloatY },
                    {
                      rotate: cardRotate.interpolate({
                        inputRange: [-180, 180],
                        outputRange: ['-180deg', '180deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              
              {/* Layer 1: Core 3D Illustration Graphic */}
              <Image
                source={require('../../../assets/images/upload_success_hero.png')}
                style={styles.successImage}
                resizeMode="contain"
              />

              {/* Layer 2: Soft Green Glow Pulse Overlay behind checkmark area */}
              <Animated.View
                style={[
                  styles.glowPulseRing,
                  {
                    opacity: glowOpacity,
                    transform: [{ scale: glowScale }],
                  },
                ]}
              />

            </Animated.View>
          </View>

          {/* 3. TITLE & DESCRIPTION */}
          <View style={styles.textBlock}>
            <Text style={styles.titleText}>Upload Successful</Text>
            <Text style={styles.descriptionText}>
              Your documents have been received. Our compliance team will review them within the next 24–48 hours.
            </Text>
          </View>

          {/* 4. VERIFICATION STATUS CARD */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeaderRow}>
              <View style={styles.clockIconBox}>
                <ClockIcon size={22} color="#D97706" />
              </View>
              <View style={styles.statusTitles}>
                <Text style={styles.statusTitle}>Verification in Progress</Text>
                <Text style={styles.statusSubtitle}>Status: Pending Review</Text>
              </View>
            </View>

            {/* Horizontal progress bar */}
            <View style={styles.progressBarTrack}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  { width: widthInterpolation },
                ]}
              />
            </View>

            <Text style={styles.progressCaption}>
              Step 1 of 3 · Technical Integrity Check
            </Text>
          </View>

          {/* 5. ACTIONS (Fade Up Staggered) */}
          <View>
            {/* Primary: Go to Dashboard */}
            <Animated.View style={getPrimaryBtnStyle()}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Go to Dashboard"
                accessibilityRole="button"
                activeOpacity={0.85}
                onPressIn={handleDashboardIn}
                onPressOut={handleDashboardOut}
                onPress={onGoToDashboard}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
                <ArrowRightIcon size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>

            {/* Secondary: View My Profile */}
            <Animated.View style={getSecondaryBtnStyle()}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="View My Profile"
                accessibilityRole="button"
                activeOpacity={0.85}
                onPressIn={handleProfileIn}
                onPressOut={handleProfileOut}
                onPress={onViewProfile}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>View My Profile</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

        </ScrollView>
      </View>
    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM (Poppins-ready)
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    height: moderateScale(60),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerButtonRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: moderateScale(110), // Spacing for floating bottom tabs
  },
  heroWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: theme.spacing.xl,
  },
  illustrationContainer: {
    width: 260,
    height: 260,
    borderRadius: 28,
    backgroundColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: 260,
    height: 260,
    borderRadius: 28,
  },
  glowPulseRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(74, 222, 128, 0.15)', // Very subtle soft green radial pulse (#4ADE80)
    top: 50,
    left: 90,
    zIndex: 1,
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: 12,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textDark,
    textAlign: 'center',
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clockIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  statusTitles: {
    flex: 1,
  },
  statusTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  statusSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressCaption: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginRight: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
