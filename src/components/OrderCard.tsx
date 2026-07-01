import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { moderateScale, moderateVerticalScale } from '../utils/responsive';
const s = (size: number) => moderateScale(size, 0.3);
const vs = (size: number) => moderateVerticalScale(size, 0.3);
import { theme } from '../theme';
import { MapMarkerIcon } from './Icons';
import { Order } from '../data/mockData';

interface OrderCardProps {
  order: Order;
  onPrimaryPress?: (order: Order) => void;
  onSecondaryPress?: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPrimaryPress,
  onSecondaryPress,
}) => {
  const isPickup = order.type === 'pickup';

  return (
    <View style={styles.card}>
      {/* Top section: Profile & Details */}
      <View style={styles.topRow}>
        <Image source={{ uri: order.customerAvatar }} style={styles.avatar} />
        
        <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
          <View style={styles.nameRow}>
            <Text style={styles.customerName}>{order.customerName}</Text>
            {order.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{order.badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitle}>
            {order.orderNumber} • {order.serviceType}
          </Text>
        </View>

        <View style={styles.rightInfo}>
          <Text style={styles.timeText}>{order.time}</Text>
          {order.infoText && <Text style={styles.infoText}>{order.infoText}</Text>}
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image source={require('../assets/images/map.png')} style={styles.mapImage} />
        <View style={styles.distanceBadge}>
          <MapMarkerIcon color={theme.colors.primary} size={8} />
          <Text style={styles.distanceText}>{order.distanceText}</Text>
        </View>
      </View>

      {/* Button Action Row */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
          activeOpacity={0.8}
          onPress={() => onPrimaryPress?.(order)}
        >
          <Text style={styles.primaryButtonText}>
            {isPickup ? 'Start Pickup' : 'Start Delivery'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryButton,
            {
              borderColor: isPickup ? theme.colors.primaryLight : theme.colors.textDark,
              borderWidth: 1,
            },
          ]}
          activeOpacity={0.7}
          onPress={() => onSecondaryPress?.(order)}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              { color: isPickup ? theme.colors.primary : theme.colors.textDark },
            ]}
          >
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: theme.colors.borderLight,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: s(48),
    height: s(48),
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.borderLight,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xxs,
  },
  customerName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  badge: {
    backgroundColor: theme.colors.errorLight,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xxs,
    borderRadius: theme.borderRadius.xs,
    marginLeft: theme.spacing.xs,
  },
  badgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.heavy,
    color: theme.colors.error,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
  },
  rightInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xxs,
  },
  infoText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textMedium,
  },
  mapContainer: {
    height: vs(110),
    width: '100%',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    position: 'relative',
  },
  mapImage: {
    width: '150%',
    height: '120%',
    resizeMode: 'cover',
  },
  distanceBadge: {
    position: 'absolute',
    bottom: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.cardBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xxs,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.small,
  },
  distanceText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginLeft: theme.spacing.xxs,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    height: s(44),
    borderRadius: theme.borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  primaryButtonText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
  secondaryButton: {
    flex: 1,
    height: s(44),
    borderRadius: theme.borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
