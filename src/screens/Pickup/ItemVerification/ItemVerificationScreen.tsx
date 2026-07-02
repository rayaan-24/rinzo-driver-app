import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface ItemVerificationScreenProps {
  order: Order;
  onBack: () => void;
  onConfirm: () => void;
}

interface ItemData {
  id: string;
  name: string;
  condition: string;
  conditionType: 'attention' | 'good' | 'stain' | 'none';
  count: number;
  verified: boolean;
  hasAttachments?: boolean;
}

export const ItemVerificationScreen: React.FC<ItemVerificationScreenProps> = ({
  order,
  onBack,
  onConfirm,
}) => {
  const insets = useSafeAreaInsets();

  // Verification Item list state
  const [items, setItems] = useState<ItemData[]>([
    {
      id: '1',
      name: 'Shirts',
      condition: 'Needs Attention',
      conditionType: 'attention',
      count: 5,
      verified: true,
    },
    {
      id: '2',
      name: 'Pants',
      condition: 'Good Condition',
      conditionType: 'good',
      count: 3,
      verified: true,
      hasAttachments: true,
    },
    {
      id: '3',
      name: 'Sarees',
      condition: 'Stain Found',
      conditionType: 'stain',
      count: 2,
      verified: false,
    },
    {
      id: '4',
      name: 'Blankets',
      condition: 'Not yet verified',
      conditionType: 'none',
      count: 1,
      verified: false,
    },
  ]);

  // Compute progress ratio
  const verifiedCount = items.filter((item) => item.verified).length;
  const progressRatio = verifiedCount / items.length; // e.g. 0.50

  const progressAnim = useRef(new Animated.Value(0.5)).current; // Init 50% (2/4 checked)

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressRatio,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [progressRatio, progressAnim]);

  const toggleVerify = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, verified: !item.verified } : item
      )
    );
  };

  const adjustCount = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: Math.max(1, item.count + delta) } : item
      )
    );
  };

  const handleSupportCall = () => {
    Alert.alert('Support Chat', 'Connecting with supervisor support chat...', [{ text: 'OK' }]);
  };

  const handleConfirmVerification = () => {
    Alert.alert(
      'Verification Confirmed',
      'All item verifications have been submitted successfully!',
      [{ text: 'OK', onPress: onConfirm }]
    );
  };

  const getConditionStyle = (type: string) => {
    switch (type) {
      case 'attention':
        return { dotColor: '#D97706', textColor: '#D97706' }; // Gold
      case 'good':
        return { dotColor: '#8664EC', textColor: '#8664EC' }; // Purple
      case 'stain':
        return { dotColor: '#DC2626', textColor: '#DC2626' }; // Red
      default:
        return { dotColor: '#AEAEB2', textColor: '#AEAEB2' }; // Grey
    }
  };

  const renderItemIcon = (name: string) => {
    switch (name) {
      case 'Shirts':
        return (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2">
            <Path d="M20.38 3.46L16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2L3.62 3.46a2 2 0 00-2.62.92l-1 2a2 2 0 00.92 2.62L3 10v10a2 2 0 002 2h14a2 2 0 002-2V10l2.08-1a2 2 0 00.92-2.62l-1-2a2 2 0 00-2.62-.92z" />
          </Svg>
        );
      case 'Pants':
        return (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2">
            <Path d="M6 2h12v3L15 22H9L6 5V2zM9 22V10h6v12" />
          </Svg>
        );
      case 'Sarees':
        return (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2">
            <Path d="M12 2v4M12 6c3 0 5 2 5 5v11H7V11c0-3 2-5 5-5zM2 13h20" />
          </Svg>
        );
      default:
        return (
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2">
            <Path d="M2 4v16M22 14v6M2 18h20M6 8h4M2 10h20" />
          </Svg>
        );
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header title="Welcome, Driver" showBack={true} onBackPress={onBack} />

      {/* 2. Scrollable Verification List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Customer & Order ID Card */}
        <View style={styles.summaryCard}>
          <View style={styles.orderIdHeader}>
            <View>
              <Text style={styles.orderIdLabel}>ORDER ID</Text>
              <Text style={styles.orderIdVal}>{order.orderNumber}</Text>
            </View>
            <View style={styles.premiumWashBadge}>
              <Text style={styles.premiumWashBadgeText}>Premium Wash</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.customerRow}>
            <View style={styles.avatarCircleBox}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Circle cx="12" cy="8" r="4" />
                <Path d="M5.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" strokeLinecap="round" />
              </Svg>
            </View>
            <View style={styles.customerDetailsBox}>
              <Text style={styles.customerNameText}>{order.customerName}</Text>
              <Text style={styles.customerAddressText}>42nd Street, Emerald Hills</Text>
            </View>
          </View>
        </View>

        {/* Verification Progress Meter */}
        <View style={styles.progressMeterSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabelText}>Verification Progress</Text>
            <Text style={styles.progressPercentText}>
              {Math.round(progressRatio * 100)}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>

        {/* Item List Header */}
        <Text style={styles.listHeaderTitle}>Item Verification</Text>

        {/* Cards mapping */}
        {items.map((item) => {
          const styleConfig = getConditionStyle(item.conditionType);
          return (
            <View key={item.id} style={styles.itemCard}>
              {/* Item Info row */}
              <View style={styles.itemCardHeader}>
                <View style={styles.itemIconCircle}>
                  {renderItemIcon(item.name)}
                </View>
                <View style={styles.itemCardDetails}>
                  <Text style={styles.itemNameText}>{item.name}</Text>
                  <View style={styles.conditionRow}>
                    <View
                      style={[
                        styles.conditionDot,
                        { backgroundColor: styleConfig.dotColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.conditionText,
                        { color: styleConfig.textColor },
                      ]}
                    >
                      {item.condition}
                    </Text>
                  </View>
                </View>

                {/* Checkbox Trigger */}
                <TouchableOpacity
                  onPress={() => toggleVerify(item.id)}
                  activeOpacity={0.8}
                >
                  {item.verified ? (
                    <Svg width="22" height="22" viewBox="0 0 24 24" fill="#8664EC">
                      <Rect width="24" height="24" rx="6" fill="#8664EC" />
                      <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#FFFFFF" />
                    </Svg>
                  ) : (
                    <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <Rect
                        x="1"
                        y="1"
                        width="22"
                        height="22"
                        rx="5"
                        stroke="#D1D5DB"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    </Svg>
                  )}
                </TouchableOpacity>
              </View>

              {/* Quantity Counter Block */}
              <View style={styles.counterRow}>
                <View style={styles.counterControlGroup}>
                  <TouchableOpacity
                    style={styles.adjustBtnMinus}
                    onPress={() => adjustCount(item.id, -1)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.adjustTextMinus}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.counterValText}>
                    {item.count < 10 ? `0${item.count}` : item.count}
                  </Text>

                  <TouchableOpacity
                    style={styles.adjustBtnPlus}
                    onPress={() => adjustCount(item.id, 1)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.adjustTextPlus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        {/* Large bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Headset Support Bubble */}
      <TouchableOpacity
        style={[styles.floatingSupportHeadset, { bottom: insets.bottom + 76 }]}
        onPress={handleSupportCall}
        activeOpacity={0.85}
      >
        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
          <Path
            d="M3 18v-6a9 9 0 0118 0v6M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>

      {/* 3. Bottom Action Submit button */}
      <View style={[styles.submitContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmVerification}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Verification</Text>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
            <Path
              d="M22 11.08V12a10 10 0 11-5.93-9.14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FC', // Soft background layout color
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: '#F0F0F3',
  },
  orderIdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderIdLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  orderIdVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  premiumWashBadge: {
    backgroundColor: '#EFE8FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  premiumWashBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#8664EC',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: theme.spacing.md,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircleBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerDetailsBox: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  customerNameText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  customerAddressText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
  },
  progressMeterSection: {
    marginBottom: theme.spacing.lg,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabelText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  progressPercentText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EFE8FF',
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8664EC',
    borderRadius: 3,
  },
  listHeaderTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.md,
  },
  itemCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: '#F0F0F3',
  },
  itemCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  itemIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9F6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCardDetails: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  itemNameText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conditionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  conditionText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
  },
  counterRow: {
    backgroundColor: '#F8F8FC',
    borderRadius: 8,
    padding: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterControlGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8FC',
    borderRadius: 8,
    padding: 3,
  },
  adjustBtnMinus: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#EFE8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustTextMinus: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  counterValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    paddingHorizontal: 16,
  },
  adjustBtnPlus: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustTextPlus: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.cardBg,
  },
  attachmentRow: {
    flexDirection: 'row',
  },
  photoBoxPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F8F8FC',
    marginLeft: 6,
  },
  floatingSupportHeadset: {
    position: 'absolute',
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
    zIndex: 99,
  },
  submitContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(249, 249, 252, 0.94)', // Backdrop color simulating blur overlay
    paddingHorizontal: theme.spacing.md,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
    zIndex: 10,
  },
  confirmButton: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  confirmButtonText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 8,
  },
});
export default ItemVerificationScreen;
