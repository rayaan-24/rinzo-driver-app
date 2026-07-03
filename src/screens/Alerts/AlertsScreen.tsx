import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Header } from '../../components/Header';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../theme';
import { driverData } from '../../data/profile';
import { moderateScale } from '../../utils/responsive';

// ==========================================
// OUTLINED SVG ICONS (Alerts layout matching)
// ==========================================

const SettingsIcon = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.5 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.5 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
      fill={color}
    />
  </Svg>
);

const RoutePinIcon = ({ size = 20, color = '#D92D20' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
      fill={color}
    />
  </Svg>
);

const MapRouteIcon = ({ size = 18, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.27-.36.48v15.12c0 .22.14.42.36.48l.14.02L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.27.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.1V5.1l6 2.1V19z"
      fill={color}
    />
  </Svg>
);

const WalletBillIcon = ({ size = 18, color = '#D97706' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
      fill={color}
    />
  </Svg>
);

const StarBadgeIcon = ({ size = 18, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 12 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      fill={color}
    />
  </Svg>
);

const RefreshHistoryIcon = ({ size = 18, color = '#0284C7' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
      fill={color}
    />
  </Svg>
);

const ShieldCheckIcon = ({ size = 18, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-2-9l1.41 1.41L15.67 10 17 11.41l-5.59 5.59L8.5 14.12 10 12.7z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// MOCK DATA STRUCTURE
// ==========================================

type AlertCategory = 'route' | 'earnings' | 'system';

interface AlertItem {
  id: string;
  category: AlertCategory;
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const initialAlerts: AlertItem[] = [
  {
    id: '1',
    category: 'route',
    title: 'Road Closure Ahead',
    description: 'Main St is closed due to construction. A faster alternative route is available',
    timestamp: '2m ago',
    isUnread: true,
    icon: 'route-pin',
    iconBg: '#FEE2E2',
    iconColor: '#D92D20',
  },
  {
    id: '2',
    category: 'route',
    title: 'New Stop Added',
    description: 'Your route has been optimized with a priority drop-off at 442 Park Ave.',
    timestamp: '1h ago',
    isUnread: false,
    icon: 'map-route',
    iconBg: '#F2F2F7',
    iconColor: '#8E8E93',
  },
  {
    id: '3',
    category: 'earnings',
    title: 'Weekly Payout Processed',
    description: 'Your earnings of $1,240.50 for the period Oct 12-19 have been sent to...',
    timestamp: '4h ago',
    isUnread: true,
    icon: 'wallet-bill',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    id: '4',
    category: 'earnings',
    title: 'Bonus Goal Reached',
    description: 'Great job! You earned an extra $50 for completing 25 deliveries with 5-...',
    timestamp: 'Yesterday',
    isUnread: false,
    icon: 'star-badge',
    iconBg: '#F2F2F7',
    iconColor: '#8E8E93',
  },
  {
    id: '5',
    category: 'system',
    title: 'App Update Available',
    description: 'Version 2.4.1 is out. Please update to ensure the best map performance...',
    timestamp: '2d ago',
    isUnread: false,
    icon: 'refresh-history',
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
  },
  {
    id: '6',
    category: 'system',
    title: 'Account Verified',
    description: 'Your document renewal has been approved. You\'re set to drive for...',
    timestamp: '3d ago',
    isUnread: false,
    icon: 'shield-check',
    iconBg: '#F2F2F7',
    iconColor: '#8E8E93',
  },
];

const categoryLabelMap = {
  route: 'ROUTE ALERTS',
  earnings: 'EARNINGS',
  system: 'SYSTEM UPDATES',
};

// ==========================================
// TACTILE ANIMATED CARD PRESS WRAPPER
// ==========================================

interface TappableCardProps {
  onPress: () => void;
  children: React.ReactNode;
}

const TappableCard: React.FC<TappableCardProps> = ({ onPress, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.alertCard}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// SCREEN IMPLEMENTATION
// ==========================================

export const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [activeChip, setActiveChip] = useState<'All' | 'Route Alerts' | 'Earnings' | 'System'>('All');

  // Entrance animations
  const screenFade = useRef(new Animated.Value(0)).current;
  const headerFade = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;

  // Staggered items entrance animated values
  const animatedValuesRef = useRef<Animated.Value[]>([]);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(screenFade, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(headerFade, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]),
      Animated.timing(contentFade, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [screenFade, headerFade, contentFade]);

  // Filter local data
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      if (activeChip === 'All') return true;
      if (activeChip === 'Route Alerts') return alert.category === 'route';
      if (activeChip === 'Earnings') return alert.category === 'earnings';
      if (activeChip === 'System') return alert.category === 'system';
      return true;
    });
  }, [alerts, activeChip]);

  // Stagger entry trigger on filter refresh
  useEffect(() => {
    animatedValuesRef.current = filteredAlerts.map(() => new Animated.Value(0));
    const anims = animatedValuesRef.current.map((anim, index) => {
      return Animated.sequence([
        Animated.delay(index * 50),
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]);
    });
    Animated.parallel(anims).start();
  }, [filteredAlerts]);

  // Clear list locally
  const handleClearAll = () => {
    setAlerts([]);
  };

  // Helper render method for alert icons
  const getAlertIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'route-pin':
        return <RoutePinIcon size={20} color={color} />;
      case 'map-route':
        return <MapRouteIcon size={18} color={color} />;
      case 'wallet-bill':
        return <WalletBillIcon size={18} color={color} />;
      case 'star-badge':
        return <StarBadgeIcon size={18} color={color} />;
      case 'refresh-history':
        return <RefreshHistoryIcon size={18} color={color} />;
      case 'shield-check':
        return <ShieldCheckIcon size={18} color={color} />;
      default:
        return <StarBadgeIcon size={18} color={color} />;
    }
  };

  // Group filtered alerts by category to structure section blocks
  const categorizedGroups = useMemo(() => {
    const groups: { [key in AlertCategory]?: AlertItem[] } = {};
    filteredAlerts.forEach((alert) => {
      if (!groups[alert.category]) {
        groups[alert.category] = [];
      }
      groups[alert.category]?.push(alert);
    });
    return groups;
  }, [filteredAlerts]);

  // We maintain a flat count of index references across groups to match staggered array references
  let globalItemIndex = 0;

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFade }]}>
      
      {/* 1. STICKY HEADER */}
      <Animated.View style={{ opacity: headerFade }}>
        <Header
          leftCustom={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.avatarOutline}>
                <Image source={driverData.avatar} style={styles.avatarImage} />
              </View>
              <Text style={styles.headerTitle}>Rinzo Driver</Text>
            </View>
          }
          rightCustom={
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Settings"
              accessibilityRole="button"
              activeOpacity={0.7}
              style={styles.settingsTouchBox}
            >
              <SettingsIcon size={20} color={theme.colors.textDark} />
            </TouchableOpacity>
          }
        />
      </Animated.View>

      {/* 2. MAIN SCROLLABLE LIST CONTAINER */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={{ opacity: contentFade }}>
          
          {/* Header Title Info Block */}
          <View style={styles.titleSectionRow}>
            <View style={styles.titleTextCol}>
              <Text style={styles.mainTitleText}>Alerts</Text>
              <Text style={styles.subtitleText}>Stay updated with your delivery journey</Text>
            </View>
            {alerts.length > 0 && (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Clear All alerts"
                accessibilityRole="button"
                activeOpacity={0.7}
                onPress={handleClearAll}
              >
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Scrollable Filter Chips Row */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsScrollView}
            contentContainerStyle={styles.chipsScrollContent}
          >
            {(['All', 'Route Alerts', 'Earnings', 'System'] as const).map((chip) => {
              const isActive = activeChip === chip;
              return (
                <TouchableOpacity
                  key={chip}
                  accessible={true}
                  accessibilityLabel={`${chip} filter chip`}
                  accessibilityRole="button"
                  activeOpacity={0.8}
                  onPress={() => setActiveChip(chip)}
                  style={[styles.chipItem, isActive ? styles.chipActive : styles.chipInactive]}
                >
                  <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Section Alerts Listings */}
          {alerts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications available.</Text>
            </View>
          ) : filteredAlerts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No alerts match the selected category.</Text>
            </View>
          ) : (
            (['route', 'earnings', 'system'] as AlertCategory[]).map((categoryKey) => {
              const items = categorizedGroups[categoryKey];
              if (!items || items.length === 0) return null;

              return (
                <View key={categoryKey} style={styles.sectionContainer}>
                  <Text style={styles.sectionHeading}>
                    {categoryLabelMap[categoryKey]}
                  </Text>

                  {items.map((item) => {
                    const itemIndex = globalItemIndex++;
                    const itemAnim = animatedValuesRef.current[itemIndex] || new Animated.Value(1);

                    const cardAnimStyle = {
                      opacity: itemAnim,
                      transform: [
                        {
                          translateY: itemAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [20, 0],
                          }),
                        },
                      ],
                    };

                    return (
                      <Animated.View key={item.id} style={[styles.cardSpacingWrapper, cardAnimStyle]}>
                        <TappableCard
                          onPress={() => {
                            // TODO: Navigate to Alert Details (Route handling not modified per guidelines)
                          }}
                        >
                          {/* Left circular Icon container */}
                          <View style={[styles.iconCircleBg, { backgroundColor: item.iconBg }]}>
                            {getAlertIcon(item.icon, item.iconColor)}
                          </View>

                          {/* Center Text Descriptions */}
                          <View style={styles.cardContentCol}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                          </View>

                          {/* Right Timestamp / Dot status details */}
                          <View style={styles.cardRightCol}>
                            <Text style={styles.timeText}>{item.timestamp}</Text>
                            {item.isUnread && <View style={styles.unreadDot} />}
                          </View>
                        </TappableCard>
                      </Animated.View>
                    );
                  })}
                </View>
              );
            })
          )}

        </Animated.View>
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
    backgroundColor: '#FCFAFF', // Light lavender background style
  },
  avatarOutline: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    backgroundColor: theme.colors.borderLight,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.typography.fontSize.md,
    color: '#7C4DFF', // Branded purple headers
    marginLeft: 12,
  },
  settingsTouchBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: moderateScale(110), // Bottom Tab bar safe padding
  },
  titleSectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  titleTextCol: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  mainTitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  subtitleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.textMedium,
  },
  clearAllText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#7C4DFF',
    paddingTop: 8,
  },
  chipsScrollView: {
    marginBottom: 20,
  },
  chipsScrollContent: {
    paddingRight: theme.spacing.md,
  },
  chipItem: {
    height: 38,
    borderRadius: 19,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: '#7C4DFF', // Selected chip fill
  },
  chipInactive: {
    backgroundColor: '#E5E5EA', // Inactive chip fill
  },
  chipText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  chipTextInactive: {
    color: '#3A3A3C',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: theme.colors.textMedium,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  cardSpacingWrapper: {
    marginBottom: 12,
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    alignItems: 'center',
  },
  iconCircleBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContentCol: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  cardDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
    lineHeight: 18,
  },
  cardRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 70,
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#8E8E93',
    marginBottom: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C4DFF', // Unread purple dot indicator
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
});
