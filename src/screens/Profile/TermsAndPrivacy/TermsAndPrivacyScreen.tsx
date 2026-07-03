import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';

const { width } = Dimensions.get('window');

// ==========================================
// OUTLINED SVG ICONS (Satisfying pixel perfect)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4M10 18l-6-6 6-6"
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
      d="M12 16h.01M12 13c0 0 .5-.5 1.5-1.5s1-1 1-1.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoCircleIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M12 16v-4M12 8h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
      fill={color}
    />
  </Svg>
);

const BulletCheckIcon = ({ size = 16, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M8 12l3 3 5-5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ size = 20, color = '#D97706' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
      fill={color}
    />
  </Svg>
);

const TruckIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11-10h2.5l1.86 2.5H17V8.5zm1 10c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
    />
  </Svg>
);

const WarningIcon = ({ size = 20, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// COMPONENT EXPORT
// ==========================================

interface TermsAndPrivacyScreenProps {
  onBack: () => void;
}

export const TermsAndPrivacyScreen: React.FC<TermsAndPrivacyScreenProps> = ({ onBack }) => {
  // Animation refs
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const cardsStaggerAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const btnScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance transitions
    Animated.sequence([
      Animated.timing(screenFadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.stagger(
        60,
        cardsStaggerAnim.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
  }, [screenFadeAnim, cardsStaggerAnim]);

  const handlePressIn = () => {
    Animated.timing(btnScaleAnim, {
      toValue: 0.97,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(btnScaleAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  // Card slide animation values
  const getCardAnimStyle = (animVal: Animated.Value) => ({
    opacity: animVal,
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFadeAnim }]}>
      
      {/* 1. FIXED STICKY HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Go Back"
          accessibilityRole="button"
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.headerLeftBtn}
        >
          <ArrowLeftIcon size={24} color={theme.colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Privacy</Text>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Help"
          accessibilityRole="button"
          activeOpacity={0.7}
          style={styles.headerRightBtn}
        >
          <HelpIcon size={20} color={theme.colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title and date last updated header */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Terms & Privacy</Text>
          <Text style={styles.updateDateText}>LAST UPDATED: OCTOBER 24, 2023</Text>
          <View style={styles.purpleUnderline} />
        </View>

        {/* SECTION 1: Introduction */}
        <Animated.View style={[styles.card, getCardAnimStyle(cardsStaggerAnim[0])]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleBg}>
              <InfoCircleIcon size={20} color="#7C4DFF" />
            </View>
            <Text style={styles.cardTitle}>1. Introduction</Text>
          </View>
          <Text style={styles.bodyText}>
            Welcome to Rinzo Driver. These Terms and Conditions govern your use of our premium logistics platform and service. By accessing or using the platform, you agree to be bound by these terms. Our commitment is to provide a reliable, white-glove delivery experience for both our drivers and our clients.
          </Text>
        </Animated.View>

        {/* SECTION 2: User Responsibilities */}
        <Animated.View style={[styles.card, getCardAnimStyle(cardsStaggerAnim[1])]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleBg}>
              <ShieldIcon size={20} color="#7C4DFF" />
            </View>
            <Text style={styles.cardTitle}>2. User Responsibilities</Text>
          </View>
          
          <View style={styles.bulletList}>
            <View style={styles.bulletRow}>
              <BulletCheckIcon size={16} color="#7C4DFF" />
              <Text style={styles.bulletText}>
                Maintain a professional demeanor while interacting with concierge clients and laundry partners.
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <BulletCheckIcon size={16} color="#7C4DFF" />
              <Text style={styles.bulletText}>
                Ensure vehicle cleanliness and safety standards are met according to our 8pt Grid inspection guidelines.
              </Text>
            </View>
            <View style={styles.bulletRow}>
              <BulletCheckIcon size={16} color="#7C4DFF" />
              <Text style={styles.bulletText}>
                Update shipment statuses in real-time to maintain the high-velocity data integrity required by the Rinzo network.
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* SECTION 3: Data Privacy & Security */}
        <Animated.View style={[styles.card, getCardAnimStyle(cardsStaggerAnim[2])]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircleBg, styles.goldIconBg]}>
              <LockIcon size={20} color="#D97706" />
            </View>
            <Text style={styles.cardTitle}>3. Data Privacy & Security</Text>
          </View>
          <Text style={styles.bodyText}>
            Your privacy is paramount. We collect geolocation data only when the app is active and you are "On Duty" to facilitate efficient route optimization.
          </Text>

          {/* Stacked inner lavender boxes */}
          <View style={styles.lavenderBox}>
            <Text style={styles.lavenderBoxHeader}>COLLECTED DATA</Text>
            <Text style={styles.lavenderBoxBody}>Location, device ID, contact details, and performance metrics.</Text>
          </View>

          <View style={styles.lavenderBox}>
            <Text style={styles.lavenderBoxHeader}>DATA USAGE</Text>
            <Text style={styles.lavenderBoxBody}>Order matching, payout processing, and service improvements.</Text>
          </View>
        </Animated.View>

        {/* SECTION 4: Operational Procedures */}
        <Animated.View style={[styles.card, getCardAnimStyle(cardsStaggerAnim[3])]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleBg}>
              <TruckIcon size={20} color="#7C4DFF" />
            </View>
            <Text style={styles.cardTitle}>4. Operational Procedures</Text>
          </View>

          {/* Timeline Wrapper */}
          <View style={styles.timelineWrapper}>
            <View style={styles.timelineLine} />

            {/* Step 1 */}
            <View style={styles.timelineNodeRow}>
              <View style={styles.nodeCircleDot} />
              <View style={styles.timelineNodeContent}>
                <Text style={styles.timelineNodeTitle}>Acceptance</Text>
                <Text style={styles.timelineNodeDesc}>
                  Once an order is accepted, it must be fulfilled within the estimated premium window.
                </Text>
              </View>
            </View>

            {/* Step 2 */}
            <View style={styles.timelineNodeRow}>
              <View style={styles.nodeCircleDot} />
              <View style={styles.timelineNodeContent}>
                <Text style={styles.timelineNodeTitle}>Handling</Text>
                <Text style={styles.timelineNodeDesc}>
                  Laundry items must be handled with extreme care, utilizing Rinzo-certified protective covers.
                </Text>
              </View>
            </View>

            {/* Step 3 */}
            <View style={styles.timelineNodeRow}>
              <View style={[styles.nodeCircleDot, styles.completionNodeDot]} />
              <View style={styles.timelineNodeContent}>
                <Text style={styles.timelineNodeTitle}>Completion</Text>
                <Text style={styles.timelineNodeDesc}>
                  Proof of delivery (Photo & Customer Signature) is mandatory for final payout settlement.
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* SECTION 5: Termination of Service */}
        <Animated.View style={[styles.card, styles.redCard, getCardAnimStyle(cardsStaggerAnim[4])]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircleBg, styles.redIconBg]}>
              <WarningIcon size={20} color="#EF4444" />
            </View>
            <Text style={[styles.cardTitle, styles.redCardTitle]}>5. Termination of Service</Text>
          </View>
          <Text style={styles.bodyText}>
            Rinzo reserves the right to suspend or terminate driver access for failure to comply with safety standards, fraudulent activity, or consistent failure to maintain a service rating of 4.5 stars or higher.
          </Text>
        </Animated.View>

        {/* BOTTOM ACTION BUTTONS */}
        <View style={styles.bottomContainer}>
          <Animated.View style={{ transform: [{ scale: btnScaleAnim }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="I Understand and Accept"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={onBack}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>I Understand & Accept</Text>
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.footerDisclaimer}>
            By clicking "Accept", you acknowledge that you have read and agree to all terms outlined above. A copy has been sent to your registered email address.
          </Text>
        </View>

      </ScrollView>

    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FCF9FF', // Light lavender theme background style
  },
  headerContainer: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F5',
  },
  headerLeftBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textDark,
  },
  headerRightBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: moderateScale(50),
  },
  titleSection: {
    marginBottom: theme.spacing.lg,
  },
  mainTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  updateDateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#8E8E93',
  },
  purpleUnderline: {
    width: 80,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7C4DFF',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircleBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  goldIconBg: {
    backgroundColor: '#FFF9E6',
  },
  redIconBg: {
    backgroundColor: '#FFECEC',
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: theme.colors.textDark,
  },
  bodyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#6C6C70',
    lineHeight: 18,
  },
  bulletList: {
    marginTop: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#6C6C70',
    lineHeight: 18,
    marginLeft: 10,
    flex: 1,
  },
  lavenderBox: {
    backgroundColor: '#F7F3FF', // inner lavender info box
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  lavenderBoxHeader: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#7C4DFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  lavenderBoxBody: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6C6C70',
    lineHeight: 16,
  },
  timelineWrapper: {
    position: 'relative',
    marginTop: 10,
    paddingLeft: 8,
  },
  timelineLine: {
    position: 'absolute',
    left: 11,
    top: 14,
    bottom: 26,
    width: 2,
    backgroundColor: '#F3EFFF',
  },
  timelineNodeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  nodeCircleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C4DFF',
    marginTop: 5,
    zIndex: 2,
  },
  completionNodeDot: {
    backgroundColor: '#C5B3FF', // lighter node circle
  },
  timelineNodeContent: {
    flex: 1,
    marginLeft: 16,
  },
  timelineNodeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  timelineNodeDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6C6C70',
    lineHeight: 16,
  },
  redCard: {
    backgroundColor: '#FFF8F8',
    borderColor: '#FEE2E2',
  },
  redCardTitle: {
    color: '#EF4444',
  },
  bottomContainer: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#7C4DFF',
    borderRadius: 22,
    height: 56,
    width: width - theme.spacing.md * 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 12,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  footerDisclaimer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 12,
  },
});
