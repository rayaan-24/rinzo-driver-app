import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../../theme';
import { StatsCard } from '../../../components/StatsCard';
import { SwipeButton } from '../../../components/SwipeButton';
import { OrderCard } from '../../../components/OrderCard';
import { SignalIcon } from '../../../components/Icons';
import {
  mockDriverStats,
  mockPickupOrders,
  mockDeliveryOrders,
  Order,
} from '../../../data/mockData';

export const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(mockDriverStats.isOnline);
  const [stats, setStats] = useState(mockDriverStats);

  const handleSwipe = (online: boolean) => {
    setIsOnline(online);
    setStats((prev) => ({
      ...prev,
      isOnline: online,
    }));
  };

  const handlePrimaryPress = (order: Order) => {
    console.log(`Starting ${order.type} for ${order.customerName}`);
  };

  const handleSecondaryPress = (order: Order) => {
    console.log(`Viewing details for ${order.customerName}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: stats.driverAvatar }} style={styles.avatar} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Good Morning, Driver 👋</Text>
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
                {isOnline ? 'Online' : 'Offline'} • {stats.onlineHours}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.signalBtn} activeOpacity={0.8}>
          <SignalIcon color={theme.colors.primary} size={20} />
        </TouchableOpacity>
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 110, // Ensure bottom content is scrollable past floating bottom tab bar
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
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
    color: '#8664EC', // Purple color for "View All" link
  },
  sectionCountText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
});
