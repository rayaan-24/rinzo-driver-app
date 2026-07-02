import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';

// ==========================================
// CUSTOM SVG ICONS (Android space-safe paths)
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

const CheckCircleIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M 9 12 L 11 14 L 15 10" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const StarIcon = ({ size = 20, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 L 12 2 Z"
      fill={color}
      stroke={color}
      strokeWidth={1}
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({ size = 20, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M 12 6 V 12 L 16 14" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const SparklesIcon = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 9 3 L 10.5 7.5 L 15 9 L 10.5 10.5 L 9 15 L 7.5 10.5 L 3 9 L 7.5 7.5 L 9 3 Z M 19 13 L 19.75 16.75 L 23.5 17 L 19.75 17.25 L 19 21 L 18.25 17.25 L 14.5 17 L 18.25 16.75 L 19 13 Z M 19 3 L 19.5 5.5 L 22 6 L 19.5 6.5 L 19 9 L 18.5 6.5 L 16 6 L 18.5 5.5 L 19 3 Z"
      fill={color}
    />
  </Svg>
);

const ChevronDownIcon = ({ size = 14, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 6 9 L 12 15 L 18 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronRightIcon = ({ size = 16, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 9 5 L 15 12 L 9 19" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TrendUpIcon = ({ size = 12, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 23 6 L 13.5 15.5 L 8.5 10.5 L 1 18 M 17 6 H 23 V 12" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AnalyticsIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 18 20 V 10 M 12 20 V 4 M 6 20 V 14" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FeedbackIcon = ({ size = 20, color = '#F59E0B' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 21 15 C 21 16.1 20.1 17 19 17 H 7 L 3 21 V 5 C 3 3.9 3.9 3 5 3 H 19 C 20.1 3 21 3.9 21 5 V 15 Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M 12 7 L 13.5 10 L 16.5 10.2 L 14.2 12.3 L 14.8 15.2 L 12 13.8 L 9.2 15.2 L 9.8 12.3 L 7.5 10.2 L 10.5 10 L 12 7 Z" fill={color} />
  </Svg>
);

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface PerformanceScreenProps {
  onBack: () => void;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({ onBack }) => {
  // Screen and segment entrance animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const overviewFade = useRef(new Animated.Value(0)).current;
  const cardsFade = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.95)).current;
  const bannerFade = useRef(new Animated.Value(0)).current;
  const chartCardFade = useRef(new Animated.Value(0)).current;
  const insightsFade = useRef(new Animated.Value(0)).current;

  // Staggered graph animation heights (target percentage values)
  const barHeights = useRef([
    { day: 'M', value: 0.55, anim: new Animated.Value(0) },
    { day: 'T', value: 0.78, anim: new Animated.Value(0) },
    { day: 'W', value: 1.0, anim: new Animated.Value(0), active: true },
    { day: 'T', value: 0.38, anim: new Animated.Value(0) },
    { day: 'F', value: 0.68, anim: new Animated.Value(0) },
    { day: 'S', value: 0.88, anim: new Animated.Value(0) },
    { day: 'S', value: 0.48, anim: new Animated.Value(0) },
  ]).current;

  // Click haptics scale refs
  const backScale = useRef(new Animated.Value(1)).current;
  const helpScale = useRef(new Animated.Value(1)).current;
  const volumeScale = useRef(new Animated.Value(1)).current;
  const feedbackScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Entrance staggered fade animations
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(overviewFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(cardsFade, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(cardScale, { toValue: 1.0, friction: 6, tension: 40, useNativeDriver: true }),
        Animated.timing(bannerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(chartCardFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(insightsFade, { toValue: 1, duration: 450, useNativeDriver: true }),
      ]),
    ]).start();

    // 2. Staggered Bar Animations ( Wed is highest bar, Mon-Sun, 700ms duration, 80ms stagger)
    const anims = barHeights.map((bar, idx) => {
      return Animated.sequence([
        Animated.delay(idx * 80),
        Animated.timing(bar.anim, {
          toValue: bar.value,
          duration: 700,
          useNativeDriver: false, // Height layout changes need false
        }),
      ]);
    });

    Animated.parallel(anims).start();

  }, [headerFade, overviewFade, cardsFade, cardScale, bannerFade, chartCardFade, insightsFade, barHeights]);

  // Click scales
  const pressIn = (scale: Animated.Value) => {
    Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };
  const pressOut = (scale: Animated.Value) => {
    Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentWrapper}>
        
        {/* 1. FIXED HEADER */}
        <Animated.View style={[styles.headerContainer, { opacity: headerFade }]}>
          <Animated.View style={{ transform: [{ scale: backScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Go Back"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPressIn={() => pressIn(backScale)}
              onPressOut={() => pressOut(backScale)}
              onPress={onBack}
              style={styles.headerButton}
            >
              <ArrowLeftIcon size={22} color={theme.colors.textDark} />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerTitle}>Performance</Text>
          <Animated.View style={{ transform: [{ scale: helpScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Help"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPressIn={() => pressIn(helpScale)}
              onPressOut={() => pressOut(helpScale)}
              style={styles.headerButtonRight}
            >
              <HelpIcon size={20} color={theme.colors.textDark} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. PAGE TITLE */}
          <Animated.View style={[styles.titleSection, { opacity: overviewFade }]}>
            <Text style={styles.titleText}>Performance Overview</Text>
            <Text style={styles.subtitleText}>Your statistics for the last 7 days</Text>
          </Animated.View>

          {/* 3. TOP METRIC CARDS (Two columns) */}
          <Animated.View
            style={[
              styles.metricsRow,
              { opacity: cardsFade, transform: [{ scale: cardScale }] },
            ]}
          >
            {/* Card 1: Acceptance */}
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.acceptanceIconBox}>
                  <CheckCircleIcon size={16} color={theme.colors.primary} />
                </View>
                <Text style={styles.metricLabel}>Acceptance</Text>
              </View>
              <Text style={styles.metricValue}>98%</Text>
              <View style={styles.trendRow}>
                <TrendUpIcon size={12} color="#10B981" />
                <Text style={styles.trendText}>+2.4%</Text>
              </View>
            </View>

            {/* Card 2: Rating */}
            <View style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={styles.ratingIconBox}>
                  <StarIcon size={15} color="#D97706" />
                </View>
                <Text style={styles.metricLabel}>Rating</Text>
              </View>
              <View style={styles.ratingValueRow}>
                <Text style={styles.metricValue}>4.92</Text>
                <Text style={styles.ratingMaxText}>/ 5</Text>
              </View>
            </View>
          </Animated.View>

          {/* 4. PERFORMANCE GRADIENT BANNERS */}
          <Animated.View style={[styles.performanceCardShadow, { opacity: bannerFade }]}>
            <View style={styles.performanceCardContent}>
              <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
                <Defs>
                  <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <Stop offset="0%" stopColor="#8664EC" />
                    <Stop offset="100%" stopColor="#6366F1" />
                  </SvgLinearGradient>
                </Defs>
                <Rect width="100%" height="100%" rx={24} fill="url(#grad)" />
              </Svg>
              <View style={styles.performanceLeft}>
                <View style={styles.performanceHeaderRow}>
                  <ClockIcon size={18} color="#FFFFFF" />
                  <Text style={styles.performanceHeaderLabel}>ON-TIME DELIVERY</Text>
                </View>
                <Text style={styles.performanceValue}>99.2%</Text>
                <Text style={styles.performanceSubtitle}>Excellent performance this week3f</Text>
              </View>
              <View style={styles.sparkleContainer}>
                <SparklesIcon size={24} color="#FFFFFF" />
              </View>
            </View>
          </Animated.View>

          {/* 5. WEEKLY WORKING HOURS CHARTS */}
          <Animated.View style={[styles.analyticsCard, { opacity: chartCardFade }]}>
            <View style={styles.analyticsHeader}>
              <View>
                <Text style={styles.analyticsTitle}>Weekly Working Hrs</Text>
                <Text style={styles.analyticsSubtitle}>Working from Mon to Sun</Text>
              </View>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Dropdown Pill"
                activeOpacity={0.7}
                style={styles.dropdownPill}
              >
                <Text style={styles.dropdownText}>This Week</Text>
                <ChevronDownIcon size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Vertical Rounded Bars Chart */}
            <View style={styles.chartWrapper}>
              {barHeights.map((bar, idx) => (
                <View key={idx} style={styles.chartBarCol}>
                  <View style={styles.barTrack}>
                    <Animated.View
                      style={[
                        styles.barFill,
                        bar.active ? styles.barFillActive : styles.barFillInactive,
                        {
                          height: bar.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }),
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.axisLabel, bar.active && styles.axisLabelActive]}>
                    {bar.day}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.chartDivider} />

            <View style={styles.analyticsFooter}>
              <Text style={styles.footerLabel}>Total this week</Text>
              <Text style={styles.footerValue}>45.6hr</Text>
            </View>
          </Animated.View>

          {/* 6. DEEP INSIGHTS LISTING */}
          <Animated.View style={[styles.insightsContainer, { opacity: insightsFade }]}>
            <Text style={styles.insightsTitleHeading}>Deep Insights</Text>

            {/* Insight Card 1: Volume */}
            <Animated.View style={{ transform: [{ scale: volumeScale }] }}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Order Volume Analysis"
                accessibilityRole="button"
                activeOpacity={0.85}
                onPressIn={() => pressIn(volumeScale)}
                onPressOut={() => pressOut(volumeScale)}
                style={styles.insightCard}
              >
                <View style={styles.insightLeft}>
                  <View style={styles.volumeIconCircle}>
                    <AnalyticsIcon size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.insightTextContent}>
                    <Text style={styles.insightCardTitle}>Order Volume Analysis</Text>
                    <Text style={styles.insightCardSubtitle}>Peak hours and hot zones</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color={theme.colors.textLight} />
              </TouchableOpacity>
            </Animated.View>

            {/* Insight Card 2: Feedback */}
            <Animated.View style={{ transform: [{ scale: feedbackScale }] }}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Customer Feedback"
                accessibilityRole="button"
                activeOpacity={0.85}
                onPressIn={() => pressIn(feedbackScale)}
                onPressOut={() => pressOut(feedbackScale)}
                style={styles.insightCard}
              >
                <View style={styles.insightLeft}>
                  <View style={styles.feedbackIconCircle}>
                    <FeedbackIcon size={20} color="#D97706" />
                  </View>
                  <View style={styles.insightTextContent}>
                    <Text style={styles.insightCardTitle}>Customer Feedback</Text>
                    <Text style={styles.insightCardSubtitle}>Read what customers say</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color={theme.colors.textLight} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

        </ScrollView>
      </View>
    </View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
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
    paddingBottom: moderateScale(110), // Prevent tab bottom overlap
  },
  titleSection: {
    marginBottom: 16,
  },
  titleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    lineHeight: 30,
    marginBottom: 4,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textMedium,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: theme.spacing.xl,
  },
  metricCard: {
    flex: 1,
    height: 165,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  acceptanceIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  metricLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMedium,
  },
  metricValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    lineHeight: 36,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#10B981',
    marginLeft: 4,
  },
  ratingValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingMaxText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
    marginLeft: 4,
  },
  performanceCardShadow: {
    marginBottom: theme.spacing.xl,
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 6,
    borderRadius: 24,
    backgroundColor: '#8664EC',
  },
  performanceCardContent: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  performanceLeft: {
    flex: 1,
  },
  performanceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  performanceHeaderLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginLeft: 8,
    letterSpacing: 0.8,
  },
  performanceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    lineHeight: 42,
    marginBottom: 8,
  },
  performanceSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.medium,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  sparkleContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  analyticsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 14,
    elevation: 3,
    marginBottom: theme.spacing.xl,
  },
  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  analyticsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  analyticsSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
  },
  dropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F0FD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dropdownText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginRight: 6,
  },
  chartWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 6,
    marginBottom: 18,
  },
  chartBarCol: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    height: 90,
    width: 18,
    backgroundColor: '#F2F0FD',
    borderRadius: 9,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 10,
  },
  barFill: {
    width: '100%',
    borderRadius: 9,
  },
  barFillActive: {
    backgroundColor: '#8664EC', // Wed active primary purple
  },
  barFillInactive: {
    backgroundColor: '#C0BDF3', // Secondary light purple
  },
  axisLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMedium,
  },
  axisLabelActive: {
    color: theme.colors.primary,
  },
  chartDivider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginBottom: 18,
  },
  analyticsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
  footerValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  insightsContainer: {
    marginBottom: theme.spacing.lg,
  },
  insightsTitleHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.md,
    marginLeft: 2,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    marginBottom: 12,
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  insightLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F0FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  feedbackIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  insightTextContent: {
    justifyContent: 'center',
  },
  insightCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  insightCardSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
});
