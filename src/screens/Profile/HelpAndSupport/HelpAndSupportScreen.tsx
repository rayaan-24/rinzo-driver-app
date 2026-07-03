import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

const { width } = Dimensions.get('window');
const cardWidth = (width - theme.spacing.md * 2 - 12) / 2;

// ==========================================
// OUTLINED SVG ICONS (Help & Support layout)
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

const SearchIcon = ({ size = 20, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
    <Path
      d="M20 20l-3-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const CurvedRouteIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 18c0-3.31 2.69-6 6-6s6-2.69 6-6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
    />
    <Circle cx="6" cy="18" r="3" fill={color} />
    <Circle cx="18" cy="6" r="3" fill={color} />
  </Svg>
);

const PaymentsIcon = ({ size = 20, color = '#D97706' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
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

const TruckIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11-10h2.5l1.86 2.5H17V8.5zm1 10c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
    />
  </Svg>
);

const ToolsIcon = ({ size = 20, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.3C.5 6.7.9 9.8 2.9 11.8c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.5z"
      fill={color}
    />
  </Svg>
);

const HeadsetIcon = ({ size = 26, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12v9c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4v-4c0-4.41 3.59-8 8-8s8 3.59 8 8v4h-3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-9c0-5.52-4.48-10-10-10z"
      fill={color}
    />
  </Svg>
);

const ChatIcon = ({ size = 18, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// TACTILE ANIMATED TOUCH CARD
// ==========================================

interface TappableCardProps {
  onPress?: () => void;
  style?: any;
  children: React.ReactNode;
}

const TappableCard: React.FC<TappableCardProps> = ({ onPress, style, children }) => {
  const scaleVal = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.timing(scaleVal, { toValue: 0.97, duration: 80, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.timing(scaleVal, { toValue: 1, duration: 120, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleVal }] }, style]}>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        activeOpacity={0.85}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        style={styles.cardLayout}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface HelpAndSupportScreenProps {
  onBack: () => void;
  onNavigateSupportCenter?: () => void;
}

export const HelpAndSupportScreen: React.FC<HelpAndSupportScreenProps> = ({ onBack, onNavigateSupportCenter }) => {
  // Staggered entry transitions
  const screenFade = useRef(new Animated.Value(0)).current;
  const searchBarSlide = useRef(new Animated.Value(0)).current;
  const gridCardsStagger = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const bottomSupportAnim = useRef(new Animated.Value(0)).current;
  const chatBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(screenFade, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(searchBarSlide, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.stagger(
        50,
        gridCardsStagger.map((anim) =>
          Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true })
        )
      ),
      Animated.timing(bottomSupportAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [screenFade, searchBarSlide, gridCardsStagger, bottomSupportAnim]);

  const chatPressIn = () => {
    Animated.timing(chatBtnScale, { toValue: 0.96, duration: 80, useNativeDriver: true }).start();
  };

  const chatPressOut = () => {
    Animated.timing(chatBtnScale, { toValue: 1, duration: 120, useNativeDriver: true }).start();
  };

  // Stagger scale helper
  const getStaggerStyle = (animVal: Animated.Value) => ({
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
        title="Help & Support"
        showBack
        onBackPress={onBack}
        rightCustom={
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Help Center"
            accessibilityRole="button"
            activeOpacity={0.7}
            style={styles.headerRightPlaceholder}
          >
            <HelpIcon size={20} color={theme.colors.textDark} />
          </TouchableOpacity>
        }
      />

      {/* 2. SCROLL CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Group */}
        <View style={styles.titleGroup}>
          <Text style={styles.largeHeading}>How can we help?</Text>
          <Text style={styles.subtitle}>
            Find answers to your questions about driving with Rinzo.
          </Text>
        </View>

        {/* Search Input Box */}
        <Animated.View style={[styles.searchBarWrapper, getStaggerStyle(searchBarSlide)]}>
          <SearchIcon size={20} color="#8E8E93" />
          <TextInput
            placeholder="Search for help topics..."
            placeholderTextColor="#8E8E93"
            style={styles.searchInput}
            editable={false} // Interactive row, opens search details later
          />
        </Animated.View>

        {/* Route & Delivery Full Card */}
        <Animated.View style={getStaggerStyle(gridCardsStagger[0])}>
          <TappableCard
            onPress={() => {
              // TODO: Navigate to Route Help Screen
            }}
          >
            <View style={styles.iconSquareBg}>
              <CurvedRouteIcon size={20} color="#7C4DFF" />
            </View>
            <Text style={styles.cardHeading}>Route & Delivery</Text>
            <Text style={styles.cardSubtitle}>
              Live tracking, drop-off protocols, and navigation support.
            </Text>
          </TappableCard>
        </Animated.View>

        {/* Grid Category Wrap Cards */}
        <View style={styles.gridContainer}>
          
          {/* payments */}
          <Animated.View style={[getStaggerStyle(gridCardsStagger[1]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                // TODO: Navigate to Payment Help Screen
              }}
            >
              <View style={[styles.iconSquareBg, styles.goldIcon]}>
                <PaymentsIcon size={20} color="#D97706" />
              </View>
              <Text style={styles.cardHeading}>Payments</Text>
              <Text style={styles.cardSubtitle}>Earnings & weekly payouts.</Text>
            </TappableCard>
          </Animated.View>

          {/* Account */}
          <Animated.View style={[getStaggerStyle(gridCardsStagger[2]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                // TODO: Navigate to Account Help Screen
              }}
            >
              <View style={styles.iconSquareBg}>
                <ShieldIcon size={20} color="#7C4DFF" />
              </View>
              <Text style={styles.cardHeading}>Account</Text>
              <Text style={styles.cardSubtitle}>Profile & verification.</Text>
            </TappableCard>
          </Animated.View>

          {/* Vehicle */}
          <Animated.View style={[getStaggerStyle(gridCardsStagger[3]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                // TODO: Navigate to Vehicle Help Screen
              }}
            >
              <View style={styles.iconSquareBg}>
                <TruckIcon size={20} color="#7C4DFF" />
              </View>
              <Text style={styles.cardHeading}>Vehicle</Text>
              <Text style={styles.cardSubtitle}>Fleet management.</Text>
            </TappableCard>
          </Animated.View>

          {/* App Info */}
          <Animated.View style={[getStaggerStyle(gridCardsStagger[4]), { width: cardWidth }]}>
            <TappableCard
              onPress={() => {
                // TODO: Navigate to App Help Screen
              }}
            >
              <View style={[styles.iconSquareBg, styles.redIcon]}>
                <ToolsIcon size={20} color="#EF4444" />
              </View>
              <Text style={styles.cardHeading}>App Info</Text>
              <Text style={styles.cardSubtitle}>Fixing app issues.</Text>
            </TappableCard>
          </Animated.View>

        </View>

        {/* Premium Direct Support Panel Card */}
        <Animated.View
          style={[
            styles.supportCard,
            {
              opacity: bottomSupportAnim,
              transform: [
                {
                  scale: bottomSupportAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.supportHeadsetBg}>
            <HeadsetIcon size={26} color="#7C4DFF" />
          </View>
          
          <Text style={styles.supportCardTitle}>Need direct help?</Text>
          <Text style={styles.supportCardSubtitle}>
            Our support team is available 24/7 for urgent delivery issues.
          </Text>

          <Animated.View style={{ transform: [{ scale: chatBtnScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Start Live Chat"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPressIn={chatPressIn}
              onPressOut={chatPressOut}
              onPress={() => {
                if (onNavigateSupportCenter) {
                  onNavigateSupportCenter();
                }
              }}
              style={styles.chatButton}
            >
              <ChatIcon size={18} color="#7C4DFF" />
              <Text style={styles.chatButtonText}>Start Live Chat</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Footer Version Label */}
        <Text style={styles.footerVersionText}>LUXELOGISTICS DRIVER APP V4.2.0</Text>

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
    backgroundColor: '#FCFAFF', // Very light lavender
  },

  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: moderateScale(40),
  },
  titleGroup: {
    marginBottom: theme.spacing.md,
  },
  largeHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: theme.colors.textDark,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.textMedium,
    lineHeight: 22,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F5F1FA',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: theme.colors.textDark,
    marginLeft: 12,
    flex: 1,
  },
  cardLayout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  iconSquareBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goldIcon: {
    backgroundColor: '#FFF9E6',
  },
  redIcon: {
    backgroundColor: '#FFECEC',
  },
  cardHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
    lineHeight: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  supportCard: {
    backgroundColor: '#7C4DFF', // Premium purple card style
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  supportHeadsetBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportCardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  supportCardSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    height: 48,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chatButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#7C4DFF',
    marginLeft: 8,
  },
  footerVersionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    letterSpacing: 1.5,
    marginTop: 10,
    marginBottom: 20,
  },
  headerRightPlaceholder: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
