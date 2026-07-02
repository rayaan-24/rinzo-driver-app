import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Polygon, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';
import { SignalIcon } from '../../../components/Icons';

interface OrderTransitScreenProps {
  order: Order;
  onBack: () => void;
  onViewOrderPress?: () => void;
  onNavigateToPickup: (order: Order) => void;
}

export const OrderTransitScreen: React.FC<OrderTransitScreenProps> = ({
  order,
  onBack,
  onViewOrderPress,
  onNavigateToPickup,
}) => {
  const insets = useSafeAreaInsets();

  const handleCall = () => {
    Alert.alert(
      'Calling Customer',
      `Connecting call to ${order.customerName} (${order.phoneNumber || '+1 (555) 019-2831'})...`,
      [{ text: 'OK' }]
    );
  };

  const handleNavigate = () => {
    onNavigateToPickup(order);
  };

  // Custom Live signal pill badge for Header right-side
  const liveBadge = (
    <View style={styles.liveBadge}>
      <SignalIcon color="#8664EC" size={12} />
      <Text style={styles.liveText}>LIVE</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header
        title="Order Transit"
        showBack={true}
        onBackPress={onBack}
        rightCustom={liveBadge}
      />

      {/* 2. Map Container (Absolute Fill underneath overlays) */}
      <View style={styles.mapContainer}>
        <Image
          source={require('../../../assets/images/map.png')}
          style={styles.mapImage}
        />

        {/* Floating Pick-up Location Card */}
        <View style={styles.floatingCard}>
          <View style={styles.nodeIconBox}>
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Circle cx="6" cy="12" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
              <Circle cx="18" cy="6" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
              <Circle cx="18" cy="18" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
              <Path
                d="M8.5 10.5l7-3.5M8.5 13.5l7 3.5"
                stroke="#8664EC"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </Svg>
          </View>
          <View style={styles.floatingTextContainer}>
            <Text style={styles.floatingLabel}>PICK-UP LOCATION</Text>
            <Text style={styles.floatingVal}>Customer Home</Text>
          </View>
        </View>

        {/* Bottom Sheet Card */}
        <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Info row */}
          <View style={styles.infoRow}>
            <View style={styles.etaContainer}>
              <Text style={styles.infoLabel}>Estimated Arrival</Text>
              <View style={styles.etaTextRow}>
                <Text style={styles.etaValBig}>12</Text>
                <Text style={styles.etaValMins}> mins</Text>
              </View>
            </View>

            <View style={styles.distanceContainer}>
              <View style={styles.distBadge}>
                <Svg width="12" height="14" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
                    fill="#8664EC"
                  />
                </Svg>
                <Text style={styles.distText}>4.2 km</Text>
              </View>
              <Text style={styles.trafficText}>Traffic: Moderate</Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleNavigate}
            activeOpacity={0.8}
          >
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <Polygon
                points="3 11 22 2 13 21 11 13 3 11"
                stroke={theme.colors.cardBg}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.primaryBtnText}>Navigate to Pickup Point</Text>
          </TouchableOpacity>

          {/* Secondary Action Buttons Row */}
          <View style={styles.secondaryBtnRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={onViewOrderPress || onBack}
              activeOpacity={0.7}
            >
              <Svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <Rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke={theme.colors.textDark}
                  strokeWidth="2"
                />
                <Path
                  d="M7 8h10M7 12h10M7 16h6"
                  stroke={theme.colors.textDark}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={styles.secondaryBtnText}>View Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <Svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  stroke={theme.colors.textDark}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.secondaryBtnText}>Call Customer</Text>
            </TouchableOpacity>
          </View>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE8FF',
    borderWidth: 1,
    borderColor: '#DCD0FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  liveText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#8664EC',
    marginLeft: 6,
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
  floatingCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    zIndex: 10,
  },
  nodeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingTextContainer: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  floatingLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    fontWeight: theme.typography.fontWeight.heavy,
    color: theme.colors.textMedium,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  floatingVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  etaContainer: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    marginBottom: 4,
  },
  etaTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  etaValBig: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 32,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    lineHeight: 32,
  },
  etaValMins: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  distanceContainer: {
    alignItems: 'flex-end',
  },
  distBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  distText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginLeft: 4,
  },
  trafficText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  primaryBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  primaryBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    marginLeft: 8,
  },
  secondaryBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    ...theme.shadows.small,
  },
  secondaryBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginLeft: 6,
  },
});
export default OrderTransitScreen;
