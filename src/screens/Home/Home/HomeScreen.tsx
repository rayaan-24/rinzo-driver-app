import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { moderateScale } from '../../../utils/responsive';
const s = (size: number) => moderateScale(size, 0.3);
import { theme } from '../../../theme';
import { StatsCard } from '../../../components/StatsCard';
import { SwipeButton } from '../../../components/SwipeButton';
import { OrderCard } from '../../../components/OrderCard';
import { Header } from '../../../components/Header';
import {
  mockDriverStats,
  mockPickupOrders,
  mockDeliveryOrders,
  Order,
} from '../../../data/mockData';

interface HomeScreenProps {
  onSelectOrder: (order: Order) => void;
  onStartPickup: (order: Order) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectOrder,
  onStartPickup,
}) => {
  const [isOnline, setIsOnline] = useState(mockDriverStats.isOnline);
  const [stats, setStats] = useState(mockDriverStats);

  const offlineAnim = useRef(new Animated.Value(isOnline ? 0 : 1)).current;

  useEffect(() => {
    Animated.spring(offlineAnim, {
      toValue: isOnline ? 0 : 1,
      useNativeDriver: true,
      stiffness: 180,
      damping: 18,
    }).start();
  }, [isOnline, offlineAnim]);

  const handleSwipe = (online: boolean) => {
    setIsOnline(online);
    setStats((prev) => ({
      ...prev,
      isOnline: online,
    }));
  };

  const handlePrimaryPress = (order: Order) => {
    onStartPickup(order);
  };

  const handleSecondaryPress = (order: Order) => {
    onSelectOrder(order);
  };

  const headerLeftComponent = (
    <View style={styles.headerLeft}>
      <Image source={{ uri: stats.driverAvatar }} style={styles.avatar} />
      <View style={styles.headerTextContainer}>
        <Text style={styles.greeting}>Good Morning, Driver ≡ƒæï</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isOnline
                  ? theme.colors.success
                  : theme.colors.textMedium,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {isOnline ? 'Online' : 'Offline'} ΓÇó {stats.onlineHours}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header leftCustom={headerLeftComponent} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

      {/* 2. Stats Section */}
      <View style={styles.statsContainer}>
        <StatsCard
          label="Assigned"
          value={stats.assigned}
          valueColor={theme.colors.primary}
        />
        <StatsCard
          label="Completed"
          value={stats.completed}
          valueColor={theme.colors.success}
        />
        <StatsCard
          label="Pending"
          value={stats.pending}
          valueColor={theme.colors.primary}
        />
      </View>

      {/* 3. Swipe Slider Section */}
      <View style={styles.swipeContainer}>
        <SwipeButton onSwipe={handleSwipe} isOnline={isOnline} />
      </View>

      {isOnline ? (
        <Animated.View
          style={{
            opacity: offlineAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: offlineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          }}
        >
          {/* 4. Pickup Orders Header & List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pickup Orders</Text>
            <TouchableOpacity>
              <Text style={styles.sectionActionText}>View All</Text>
            </TouchableOpacity>
          </View>

          {mockPickupOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPrimaryPress={handlePrimaryPress}
              onSecondaryPress={handleSecondaryPress}
            />
          ))}

          {/* 5. Delivery Orders Header & List */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Orders</Text>
            <Text style={styles.sectionCountText}>2 pending</Text>
          </View>

          {mockDeliveryOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPrimaryPress={handlePrimaryPress}
              onSecondaryPress={handleSecondaryPress}
            />
          ))}
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.emptyStateCard,
            {
              opacity: offlineAnim,
              transform: [
                {
                  translateY: offlineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 0],
                  }),
                },
                {
                  scale: offlineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.96, 1.0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.emptyIconCircle}>
            <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
              <Path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.5M5 12.5a10.94 10.94 0 015.83-2.84M8.5 16a4.91 4.91 0 013.5-1.5M12 20a1 1 0 100-2 1 1 0 000 2z" />
            </Svg>
          </View>
          <Text style={styles.emptyHeading}>You're Offline</Text>
          <Text style={styles.emptySubtitle}>
            Turn on your availability to receive upcoming delivery requests and start earning.
          </Text>
          <TouchableOpacity
            style={styles.emptyGoOnlineBtn}
            onPress={() => handleSwipe(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.emptyGoOnlineText}>Go Online</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xs,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: s(44),
    height: s(44),
    borderRadius: theme.borderRadius.circle,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerTextContainer: {
    marginLeft: theme.spacing.sm,
  },
  greeting: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#4B2BB0', // Vibrant header purple matching design
    marginBottom: s(2),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: s(8),
    height: s(8),
    borderRadius: theme.borderRadius.circle,
    marginRight: s(6),
  },
  statusText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
  signalBtn: {
    backgroundColor: 'transparent',
    padding: theme.spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  swipeContainer: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  sectionActionText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  sectionCountText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
  emptyStateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: s(36),
    paddingHorizontal: s(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
  },
  emptyIconCircle: {
    width: s(72),
    height: s(72),
    borderRadius: s(36),
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(16),
  },
  emptyHeading: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(18),
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: s(8),
  },
  emptySubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: s(12),
    color: theme.colors.textMedium,
    textAlign: 'center',
    lineHeight: s(18),
    paddingHorizontal: s(12),
    marginBottom: s(24),
  },
  emptyGoOnlineBtn: {
    width: '100%',
    height: s(48),
    borderRadius: s(24),
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  emptyGoOnlineText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(14),
    fontWeight: 'bold',
  },
});
