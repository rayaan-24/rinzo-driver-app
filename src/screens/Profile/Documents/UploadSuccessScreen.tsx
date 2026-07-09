import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
// ==========================================

const ShieldIcon = ({ size = 64, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 17.5 20.5 21 15.5 21 10.5 V 5 L 12 2 L 3 5 V 10.5 C 3 15.5 6.5 20.5 12 22 Z"
      stroke={color}
      strokeWidth={2}
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

const CheckIcon = ({ size = 10, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 20 6 L 9 17 L 4 12"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({ size = 12, color = '#FFFFFF' }) => (
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
  const screenFade = useRef(new Animated.Value(1)).current;

  // Shield Check animation values
  const shieldScale = useRef(new Animated.Value(0.5)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const rippleScale = useRef(new Animated.Value(0.8)).current;
  const rippleOpacity = useRef(new Animated.Value(0.8)).current;

  // Pressed scales
  const dashboardScale = useRef(new Animated.Value(1)).current;
  const profileScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    screenFade.setValue(1);

    // Sequence: Shield springs up, ripple expands/fades, checkmark pops in
    Animated.parallel([
      Animated.spring(shieldScale, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1.6,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(rippleOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(150),
        Animated.spring(checkmarkScale, {
          toValue: 1,
          tension: 100,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [screenFade, shieldScale, checkmarkScale, rippleScale, rippleOpacity]);

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
        <Header
          title="Document Upload"
          showBack
          onBackPress={onViewProfile}
          rightCustom={
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Help"
              accessibilityRole="button"
              activeOpacity={0.7}
              style={styles.headerButtonRight}
            >
              <HelpIcon size={20} color={theme.colors.textDark} />
            </TouchableOpacity>
          }
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. SUCCESS HERO BADGE WRAPPER */}
          <View style={styles.heroWrapper}>
            <View style={styles.badgeWrapperContainer}>
              {/* Expanding Ripple Ring */}
              <Animated.View
                style={[
                  styles.rippleRing,
                  {
                    transform: [{ scale: rippleScale }],
                    opacity: rippleOpacity,
                  },
                ]}
              />

              {/* Shield Badge Wrapper */}
              <Animated.View
                style={[
                  styles.shieldBadgeWrapper,
                  {
                    transform: [{ scale: shieldScale }],
                  },
                ]}
              >
                <ShieldIcon size={44} color="#7C4DFF" />
                
                {/* Checkmark overlay */}
                <Animated.View
                  style={[
                    styles.checkmarkOverlay,
                    {
                      transform: [{ scale: checkmarkScale }],
                    },
                  ]}
                >
                  <CheckIcon size={20} color="#7C4DFF" />
                </Animated.View>
              </Animated.View>
            </View>
            <Text style={styles.titleText} maxFontSizeMultiplier={1.3}>Upload Successful</Text>
            <Text style={styles.refText} maxFontSizeMultiplier={1.3}>REFERENCE ID: #INS-7729</Text>
          </View>

          {/* 3. VERIFICATION STATUS TIMELINE (Uber Style) */}
          <View style={styles.timelineCard}>
            <Text style={styles.timelineHeader} maxFontSizeMultiplier={1.3}>VERIFICATION PIPELINE</Text>
            
            {/* Step 1: Uploaded */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.timelineNode, styles.successNode]}>
                  <CheckIcon size={10} color="#FFFFFF" />
                </View>
                <View style={[styles.timelineLine, styles.activeLine]} />
              </View>
              <View style={styles.timelineRightCol}>
                <View style={styles.timelineTitleRow}>
                  <Text style={styles.stepTitle} maxFontSizeMultiplier={1.3}>Commercial Insurance Uploaded</Text>
                  <Text style={styles.stepTime} maxFontSizeMultiplier={1.3}>Just now</Text>
                </View>
                <Text style={styles.stepDesc} maxFontSizeMultiplier={1.3}>
                  Your document certificate has been securely uploaded and encrypted.
                </Text>
              </View>
            </View>

            {/* Step 2: Under Review */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.timelineNode, styles.activeNode]}>
                  <ClockIcon size={12} color="#FFFFFF" />
                </View>
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineRightCol}>
                <View style={styles.timelineTitleRow}>
                  <Text style={styles.stepTitle} maxFontSizeMultiplier={1.3}>Compliance Verification</Text>
                  <View style={styles.reviewBadge}>
                    <Text style={styles.reviewBadgeText} maxFontSizeMultiplier={1.3}>IN REVIEW</Text>
                  </View>
                </View>
                <Text style={styles.stepDesc} maxFontSizeMultiplier={1.3}>
                  Our compliance team is validating policy cover limits and expiration details. This takes 1–2 hours.
                </Text>
              </View>
            </View>

            {/* Step 3: Active */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.timelineNode, styles.pendingNode]} />
              </View>
              <View style={styles.timelineRightCol}>
                <Text style={[styles.stepTitle, styles.pendingTitle]} maxFontSizeMultiplier={1.3}>Ready for Deliveries</Text>
                <Text style={styles.stepDesc} maxFontSizeMultiplier={1.3}>
                  Once approved, your account status will activate to start receiving collection requests.
                </Text>
              </View>
            </View>
          </View>

          {/* 4. ACTIONS */}
          <View>
            {/* Primary: Go to Dashboard */}
            <Animated.View style={{ transform: [{ scale: dashboardScale }] }}>
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
                <Text style={styles.primaryButtonText} maxFontSizeMultiplier={1.3}>Go to Dashboard</Text>
                <ArrowRightIcon size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>

            {/* Secondary: View My Profile */}
            <Animated.View style={{ transform: [{ scale: profileScale }] }}>
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
                <Text style={styles.secondaryButtonText} maxFontSizeMultiplier={1.3}>View My Profile</Text>
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
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: moderateScale(40),
  },
  heroWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10),
    marginBottom: theme.spacing.xl,
  },
  badgeWrapperContainer: {
    width: moderateScale(140),
    height: moderateScale(140),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: moderateScale(16),
  },
  rippleRing: {
    position: 'absolute',
    width: moderateScale(88),
    height: moderateScale(88),
    borderRadius: moderateScale(44),
    backgroundColor: 'rgba(124, 77, 255, 0.15)', // light purple ripple ring
    zIndex: 0,
  },
  shieldBadgeWrapper: {
    width: moderateScale(88),
    height: moderateScale(88),
    borderRadius: moderateScale(44),
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  checkmarkOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(22),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  refText: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(11),
    color: '#8E8E93',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(22),
    padding: moderateScale(20),
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  timelineHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(11),
    color: '#8E8E93',
    letterSpacing: 1.5,
    marginBottom: moderateScale(20),
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
  },
  timelineLeftCol: {
    alignItems: 'center',
    marginRight: moderateScale(16),
    width: moderateScale(24),
  },
  timelineRightCol: {
    flex: 1,
    paddingBottom: moderateScale(20),
  },
  timelineNode: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  successNode: {
    backgroundColor: theme.colors.success,
  },
  activeNode: {
    backgroundColor: theme.colors.primary,
  },
  pendingNode: {
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timelineLine: {
    position: 'absolute',
    top: moderateScale(24),
    bottom: 0,
    width: 2,
    backgroundColor: '#E5E7EB',
    zIndex: 1,
  },
  activeLine: {
    backgroundColor: theme.colors.success,
  },
  timelineTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
  },
  pendingTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#8E8E93',
  },
  stepTime: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(11),
    color: theme.colors.success,
  },
  reviewBadge: {
    backgroundColor: '#FFF7E6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  reviewBadgeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(9),
    color: '#D97706',
  },
  stepDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: theme.colors.textMedium,
    lineHeight: moderateScale(18),
    marginTop: 2,
  },
  primaryButton: {
    flexDirection: 'row',
    height: moderateScale(56),
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(18),
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
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginRight: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    height: moderateScale(56),
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  headerButtonRight: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
