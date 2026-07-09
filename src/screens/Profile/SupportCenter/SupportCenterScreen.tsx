import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  BackHandler,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { driverData } from '../../../data/profile';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

const { width } = Dimensions.get('window');
const cardWidth = (width - theme.spacing.md * 2 - 12) / 2;

// ==========================================
// OUTLINED SVG ICONS (Support Center layout)
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

const BellIcon = ({ size = 22, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PackageIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L2 7l10 5 10-5-10-5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 7v10l10 5V12L2 7z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 7v10l-10 5V12l10-5z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DeviceIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 8l3 3-3 3M11 14h4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PaymentsIcon = ({ size = 20, color = '#D97706' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="12"
      r="2.5"
      stroke={color}
      strokeWidth={2.5}
    />
    <Path
      d="M5 9.5h.01M19 14.5h.01"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

const WarningIcon = ({ size = 20, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L2 12l10 10 10-10L12 2z"
      fill={color}
    />
    <Path
      d="M12 7v6"
      stroke="#EF4444"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Circle cx="12" cy="16.5" r="1.25" fill="#EF4444" />
  </Svg>
);

const TicketIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12c0-1.1.9-2 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v2c1.1 0 2 .9 2 2s-.9 2-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-2c-1.1 0-2-.9-2-2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 6v12M15 6v12"
      stroke={color}
      strokeWidth={1.5}
      strokeDasharray="2 3"
    />
  </Svg>
);

const ClockHistoryIcon = ({ size = 20, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 7v5l3 2M3 11.5L6.5 8M3 11.5L7.5 13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ size = 14, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 5l7 7-7 7"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookOpenIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 3h6a4 4 0 014 4v14a4 4 0 00-4-4H2V3zM22 3h-6a4 4 0 00-4 4v14a4 4 0 014-4h6V3z"
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
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="11" r="2.5" stroke={color} strokeWidth={2} />
  </Svg>
);

// ==========================================
// TACTILE ANIMATED TOUCH CONTAINER
// ==========================================

interface TappableCardProps {
  onPress?: () => void;
  style?: any;
  children: React.ReactNode;
}

const TappableCard: React.FC<TappableCardProps> = ({ onPress, style, children }) => {
  const scaleVal = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.timing(scaleVal, { toValue: 0.98, duration: 80, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.timing(scaleVal, { toValue: 1, duration: 120, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleVal }] }}>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        activeOpacity={0.85}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        style={[styles.cardLayout, style]}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// SCREEN EXPORT
// ==========================================

interface SupportCenterScreenProps {
  onBack: () => void;
  onNavigateOrderSupport?: () => void;
  onNavigateEmergencySupport?: () => void;
  onNavigateTechnicalSupport?: () => void;
  onNavigatePaymentQueries?: () => void;
}

export const SupportCenterScreen: React.FC<SupportCenterScreenProps> = ({
  onBack,
  onNavigateOrderSupport,
  onNavigateEmergencySupport,
  onNavigateTechnicalSupport,
  onNavigatePaymentQueries,
}) => {
  const screenFade = useRef(new Animated.Value(0)).current;
  const cardsFade = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Intercept hardware back button on Android
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Entrance transitions
    Animated.sequence([
      Animated.timing(screenFade, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.stagger(
        60,
        cardsFade.map((anim) =>
          Animated.timing(anim, { toValue: 1, duration: 350, useNativeDriver: true })
        )
      ),
    ]).start();

    return () => backHandler.remove();
  }, [onBack, screenFade, cardsFade]);

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
    <Animated.View style={[styles.outerContainer, { opacity: screenFade }]}>
      
      {/* 1. FIXED HEADER */}
      <Header
        leftCustom={
          <View style={styles.headerLeftCol}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Go Back"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.headerBackTouch}
            >
              <ArrowLeftIcon size={24} color={theme.colors.textDark} />
            </TouchableOpacity>
            <View style={styles.avatarOutline}>
              <Image source={driverData.avatar} style={styles.avatarImage} />
            </View>
          </View>
        }
        rightCustom={
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            activeOpacity={0.7}
            style={styles.headerRightBtn}
          >
            <BellIcon size={22} color="#7C4DFF" />
          </TouchableOpacity>
        }
      />

      {/* 2. SCROLL CONTENT BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Info Block */}
        <View style={styles.titleSection}>
          <Text style={styles.mainHeading}>Support Center</Text>
          <Text style={styles.subtitle}>How can we assist your journey today?</Text>
        </View>

        {/* 2x2 Category Grid */}
        <View style={styles.gridContainer}>
          
          {/* Card 1: Order Issues */}
          <Animated.View style={[getCardAnimStyle(cardsFade[0]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                if (onNavigateOrderSupport) {
                  onNavigateOrderSupport();
                }
              }}
            >
              <View style={styles.iconCircleBg}>
                <PackageIcon size={20} color="#7C4DFF" />
              </View>
              <Text style={styles.cardGridTitle}>Order Issues</Text>
              <Text style={styles.cardGridDesc}>
                Damages, missing items, or delivery delays
              </Text>
            </TappableCard>
          </Animated.View>

          {/* Card 2: App Technical Support */}
          <Animated.View style={[getCardAnimStyle(cardsFade[1]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                if (onNavigateTechnicalSupport) {
                  onNavigateTechnicalSupport();
                }
              }}
            >
              <View style={styles.iconCircleBg}>
                <DeviceIcon size={20} color="#7C4DFF" />
              </View>
              <Text style={styles.cardGridTitle}>App Technical Support</Text>
              <Text style={styles.cardGridDesc}>
                GPS errors, login issues, or app crashes
              </Text>
            </TappableCard>
          </Animated.View>

          {/* Card 3: Payment Queries */}
          <Animated.View style={[getCardAnimStyle(cardsFade[2]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                if (onNavigatePaymentQueries) {
                  onNavigatePaymentQueries();
                }
              }}
            >
              <View style={[styles.iconCircleBg, styles.goldIcon]}>
                <PaymentsIcon size={20} color="#D97706" />
              </View>
              <Text style={styles.cardGridTitle}>Payment Queries</Text>
              <Text style={styles.cardGridDesc}>
                Earnings, bonuses, or payout schedules
              </Text>
            </TappableCard>
          </Animated.View>

          {/* Card 4: Emergency (Soft Red Alert) */}
          <Animated.View style={[getCardAnimStyle(cardsFade[3]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                if (onNavigateEmergencySupport) {
                  onNavigateEmergencySupport();
                }
              }}
              style={styles.redCard}
            >
              <View style={[styles.iconCircleBg, styles.redIcon]}>
                <WarningIcon size={20} color="#EF4444" />
              </View>
              <Text style={[styles.cardGridTitle, styles.redText]}>Emergency</Text>
              <Text style={[styles.cardGridDesc, styles.redText]}>
                Immediate safety or vehicle assistance
              </Text>
            </TappableCard>
          </Animated.View>

        </View>

        {/* Recent Tickets Block */}
        <Animated.View style={[styles.sectionWrapper, getCardAnimStyle(cardsFade[4])]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeadingText}>Recent Tickets</Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="View All tickets"
              accessibilityRole="button"
              activeOpacity={0.7}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Ticket Card 1 */}
          <TappableCard
            onPress={() => {
              // TODO: Navigate to Ticket Details
            }}
            style={styles.ticketCard}
          >
            {/* 1. LEFT SECTION */}
            <View style={styles.leftSection}>
              <TicketIcon size={20} color="#7C4DFF" />
            </View>
            
            {/* 2. CENTER SECTION */}
            <View style={styles.centerSection}>
              <Text style={styles.ticketTitle} numberOfLines={2}>Mismatched Item Count</Text>
              <Text style={styles.ticketSubtitle} numberOfLines={2}>Ticket #LX-8821 • 2 hours ago</Text>
            </View>

            {/* 3. RIGHT SECTION */}
            <View style={styles.rightSection}>
              <View style={styles.statusChip}>
                <Text style={styles.statusChipText}>IN{"\n"}REVIEW</Text>
              </View>
              <View style={styles.chevronContainer}>
                <ChevronRightIcon size={14} color="#8E8E93" />
              </View>
            </View>
          </TappableCard>

          {/* Ticket Card 2 */}
          <TappableCard
            onPress={() => {
              // TODO: Navigate to Ticket Details
            }}
            style={styles.ticketCard}
          >
            {/* 1. LEFT SECTION */}
            <View style={[styles.leftSection, styles.leftSectionClosed]}>
              <ClockHistoryIcon size={20} color="#8E8E93" />
            </View>

            {/* 2. CENTER SECTION */}
            <View style={styles.centerSection}>
              <Text style={styles.ticketTitle} numberOfLines={2}>Fuel Reimbursement</Text>
              <Text style={styles.ticketSubtitle} numberOfLines={2}>Ticket #LX-8794 • Yesterday</Text>
            </View>

            {/* 3. RIGHT SECTION */}
            <View style={styles.rightSection}>
              <View style={[styles.statusChip, styles.closedChip]}>
                <Text style={[styles.statusChipText, styles.closedChipText]}>CLOSED</Text>
              </View>
              <View style={styles.chevronContainer}>
                <ChevronRightIcon size={14} color="#8E8E93" />
              </View>
            </View>
          </TappableCard>
        </Animated.View>

        {/* Popular Articles Block */}
        <View style={styles.sectionWrapper}>
          <Text style={[styles.sectionHeadingText, styles.popularArticleHeader]}>Popular Articles</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.articlesHorizontalScroll}
          >
            {/* Article Card 1 */}
            <TappableCard
              onPress={() => {
                // TODO: Navigate to Article Details
              }}
              style={styles.articleCard}
            >
              <BookOpenIcon size={20} color="#7C4DFF" />
              <Text style={styles.articleTitle}>Navigating Restricted Zones</Text>
              <Text style={styles.articleDesc}>
                Learn about handling gated communities and private routes.
              </Text>
            </TappableCard>

            {/* Article Card 2 */}
            <TappableCard
              onPress={() => {
                // TODO: Navigate to Article Details
              }}
              style={styles.articleCard}
            >
              <ShieldIcon size={20} color="#7C4DFF" />
              <Text style={styles.articleTitle}>Safety First</Text>
              <Text style={styles.articleDesc}>
                Essential safety guidelines and checklists during deliveries.
              </Text>
            </TappableCard>
          </ScrollView>
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
    backgroundColor: '#FCFAFF', // Light lavender theme
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackTouch: {
    width: 32,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatarOutline: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    backgroundColor: theme.colors.borderLight,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginLeft: 6,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
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
    paddingBottom: moderateScale(40),
  },
  titleSection: {
    marginBottom: theme.spacing.md,
  },
  mainHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.textMedium,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  cardLayout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  iconCircleBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  goldIcon: {
    backgroundColor: '#FFF9E6',
  },
  redIcon: {
    backgroundColor: '#FFECEC',
  },
  cardGridTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  cardGridDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: theme.colors.textMedium,
    lineHeight: 15,
  },
  redCard: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FEE2E2',
  },
  redText: {
    color: '#EF4444',
  },
  sectionWrapper: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeadingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.textDark,
  },
  viewAllText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: '#7C4DFF',
  },
  ticketCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 96,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  leftSection: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftSectionClosed: {
    backgroundColor: '#F2F2F7',
  },
  centerSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  rightSection: {
    height: 72,
    width: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative',
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ticketTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: theme.colors.textDark,
    marginRight: 8,
    marginBottom: 4,
  },
  statusChip: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#F3EFFF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 54,
  },
  statusChipText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 9,
    color: '#7C4DFF',
    textAlign: 'center',
    lineHeight: 10,
  },
  closedChip: {
    backgroundColor: '#F2F2F7',
  },
  closedChipText: {
    color: '#8E8E93',
  },
  ticketSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#8E8E93',
  },
  popularArticleHeader: {
    marginBottom: 12,
  },
  articlesHorizontalScroll: {
    paddingRight: theme.spacing.md,
  },
  articleCard: {
    width: 230,
    marginRight: 12,
    height: 155,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
  },
  articleTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: theme.colors.textDark,
    marginTop: 10,
    marginBottom: 4,
  },
  articleDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: theme.colors.textMedium,
    lineHeight: 16,
  },
});