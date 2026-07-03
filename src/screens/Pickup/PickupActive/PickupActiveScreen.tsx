import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface PickupActiveScreenProps {
  order: Order;
  onBack: () => void;
  onReachedPickup: (order: Order) => void;
}

export const PickupActiveScreen: React.FC<PickupActiveScreenProps> = ({
  order,
  onBack,
  onReachedPickup,
}) => {
  const insets = useSafeAreaInsets();

  // Animation values for timeline
  const progressAnim = useRef(new Animated.Value(0)).current;
  const scaleNode0 = useRef(new Animated.Value(0.5)).current;
  const scaleNode1 = useRef(new Animated.Value(0.5)).current;
  const scaleNode2 = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Run timeline mount animations
    Animated.sequence([
      // 1. Animate active progress line to the first node
      Animated.timing(progressAnim, {
        toValue: 0.1, // Checkpoint 1 (Pickup) is reached/complete
        duration: 700,
        useNativeDriver: false, // Animating layout width
      }),
      // 2. Spring scale active node 0 (Pickup)
      Animated.spring(scaleNode0, {
        toValue: 1.0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [progressAnim, scaleNode0]);

  const handleCall = () => {
    Alert.alert(
      'Calling Customer',
      `Connecting call to ${order.customerName} (${order.phoneNumber || '+1 (555) 019-2831'})...`,
      [{ text: 'OK' }]
    );
  };

  const handleChat = () => {
    Alert.alert(
      'Opening Chat',
      `Opening chat conversation with ${order.customerName}...`,
      [{ text: 'OK' }]
    );
  };

  const handleReachedPoint = () => {
    onReachedPickup(order);
  };

  // Header right en-route text + avatar widget
  const enRouteHeaderRight = (
    <View style={styles.headerRight}>
      <View style={styles.headerRightTextContainer}>
        <Text style={styles.dutyLabel}>Active Duty</Text>
        <Text style={styles.dutyValue}>En Route</Text>
      </View>
      <Image
        source={{ uri: order.driverAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' }}
        style={styles.headerAvatar}
      />
    </View>
  );

  // Interpolate progress animation width percentage
  const activeLineWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* 1. Standardized Header */}
      <Header
        title="Pickup"
        showBack={true}
        onBackPress={onBack}
        rightCustom={enRouteHeaderRight}
      />

      {/* 2. Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../../assets/images/map.png')}
          style={styles.mapImage}
        />

        {/* Floating ETA & Distance Cards */}
        <View style={styles.floatingBadgesRow}>
          {/* Card 1: ETA */}
          <View style={styles.metricCard}>
            <View style={styles.metricIconBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                />
                <Path
                  d="M12 6v6l4 2"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>ETA</Text>
              <Text style={styles.metricVal}>12 mins</Text>
            </View>
          </View>

          {/* Card 2: Distance */}
          <View style={styles.metricCard}>
            <View style={styles.metricIconBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                />
                <Circle cx="12" cy="10" r="3" stroke={theme.colors.primary} strokeWidth="2" />
              </Svg>
            </View>
            <View style={styles.metricTextContainer}>
              <Text style={styles.metricLabel}>DISTANCE</Text>
              <Text style={styles.metricVal}>2.4 km</Text>
            </View>
          </View>
        </View>

        {/* 3. Bottom Sheet Overlay */}
        <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.handleBar} />

          {/* Customer Title & Badge Row */}
          <View style={styles.customerRow}>
            <View style={styles.customerDetails}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.customerTitle}>Customer Home</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                </View>
              </View>
              <Text style={styles.orderSubtitle}>
                Order {order.orderNumber} • 12 Items
              </Text>
            </View>

            {/* Quick Contact Controls */}
            <View style={styles.contactRow}>
              <TouchableOpacity
                style={styles.contactBtn}
                onPress={handleCall}
                activeOpacity={0.7}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    stroke={theme.colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactBtn}
                onPress={handleChat}
                activeOpacity={0.7}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    stroke={theme.colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* Animated Progress Timeline */}
          <View style={styles.timelineContainer}>
            {/* Background Line bar */}
            <View style={styles.timelineBarBg} />
            {/* Animated Active Line bar */}
            <Animated.View
              style={[styles.timelineBarActive, { width: activeLineWidth }]}
            />

            {/* Checkpoint Nodes */}
            <View style={styles.nodesRow}>
              {/* Node 1: Pickup (Active/Checked) */}
              <View style={styles.nodeItem}>
                <Animated.View
                  style={[
                    styles.nodeCircle,
                    styles.nodeCircleActive,
                    { transform: [{ scale: scaleNode0 }] },
                  ]}
                >
                  <Svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M20 6L9 17l-5-5"
                      stroke={theme.colors.cardBg}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </Animated.View>
                <Text style={[styles.nodeLabel, styles.nodeLabelActive]}>Pickup</Text>
              </View>

              {/* Node 2: In Transit (Pending) */}
              <View style={styles.nodeItem}>
                <Animated.View
                  style={[
                    styles.nodeCircle,
                    styles.nodeCircleInactive,
                    { transform: [{ scale: scaleNode1 }] },
                  ]}
                >
                  <View style={styles.nodeInnerDot} />
                </Animated.View>
                <Text style={styles.nodeLabel}>In Transit</Text>
              </View>

              {/* Node 3: Delivered (Pending) */}
              <View style={styles.nodeItem}>
                <Animated.View
                  style={[
                    styles.nodeCircle,
                    styles.nodeCircleInactive,
                    { transform: [{ scale: scaleNode2 }] },
                  ]}
                >
                  <View style={styles.nodeInnerDot} />
                </Animated.View>
                <Text style={styles.nodeLabel}>Delivered</Text>
              </View>
            </View>
          </View>

          {/* Main Action Reached Point Button */}
          <TouchableOpacity
            style={styles.reachedBtn}
            onPress={handleReachedPoint}
            activeOpacity={0.8}
          >
            <Text style={styles.reachedBtnText}>Reached Pickup Point</Text>
            <Svg width="14" height="16" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
                fill={theme.colors.cardBg}
              />
            </Svg>
          </TouchableOpacity>

          {/* Helper Bottom Hint */}
          <Text style={styles.bottomHintText}>
            Arrived? Tap the button above to update dispatcher
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightTextContainer: {
    alignItems: 'flex-end',
    marginRight: theme.spacing.xs,
  },
  dutyLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
  },
  dutyValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  mapImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  floatingBadgesRow: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  metricCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    width: '47%',
  },
  metricIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricTextContainer: {
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.textMedium,
    marginBottom: 1,
  },
  metricVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.cardBg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    zIndex: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E5EA',
    alignSelf: 'center',
    marginBottom: 16,
  },
  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  customerDetails: {
    flex: 1,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  customerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  premiumBadge: {
    backgroundColor: '#8664EC',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  premiumBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.cardBg,
  },
  orderSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  contactRow: {
    flexDirection: 'row',
  },
  contactBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    ...theme.shadows.small,
  },
  timelineContainer: {
    height: 60,
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 20,
  },
  timelineBarBg: {
    position: 'absolute',
    left: '16%',
    right: '16%',
    height: 3,
    backgroundColor: '#E5E5EA',
    alignSelf: 'center',
    top: 22,
    zIndex: 1,
  },
  timelineBarActive: {
    position: 'absolute',
    left: '16%',
    height: 3,
    backgroundColor: '#8664EC',
    alignSelf: 'center',
    top: 22,
    zIndex: 2,
  },
  nodesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  nodeItem: {
    alignItems: 'center',
    flex: 1,
  },
  nodeCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  nodeCircleActive: {
    backgroundColor: '#8664EC',
  },
  nodeCircleInactive: {
    backgroundColor: '#E5E5EA',
  },
  nodeInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AEAEB2',
  },
  nodeLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
  nodeLabelActive: {
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  reachedBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...theme.shadows.medium,
  },
  reachedBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 6,
  },
  bottomHintText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
});
export default PickupActiveScreen;
