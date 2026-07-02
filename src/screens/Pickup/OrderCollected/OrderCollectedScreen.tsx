import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface OrderCollectedScreenProps {
  order: Order;
  onBack: () => void;
  onConfirm: () => void;
}

export const OrderCollectedScreen: React.FC<OrderCollectedScreenProps> = ({
  order,
  onBack,
  onConfirm,
}) => {
  const handleViewOrder = () => {
    Alert.alert(
      'Order Invoice',
      `Opening invoice details for Order #${order.orderNumber}...`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <Header
        title="Rinzo Deliver"
        showBack={true}
        onBackPress={onBack}
        leftCustom={
          <View style={styles.headerLeftIcon}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
              <Path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h1M15 18H9M19 18h2a1 1 0 001-1v-5l-3-4h-5v10M19 14h3" />
              <Circle cx="6.5" cy="18.5" r="2.5" />
              <Circle cx="16.5" cy="18.5" r="2.5" />
            </Svg>
          </View>
        }
        rightCustom={
          <Image
            source={{ uri: order.customerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' }}
            style={styles.headerAvatar}
          />
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Concentric Illustration Graphic */}
        <View style={styles.graphicContainer}>
          <View style={styles.outerCircle}>
            <Svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              {/* Concentric checkmark background circle */}
              <Circle cx="50" cy="50" r="42" fill="#E6DFFF" />

              {/* Driver body / jacket (purple shade) */}
              <Path d="M40 75v-18c0-2 2-4 4-4h12c2 0 4 2 4 4v18" fill="#8664EC" />
              {/* Driver collar */}
              <Path d="M44 53l6 4 6-4" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Driver face / head */}
              <Circle cx="50" cy="42" r="8" fill="#FFDBB5" />
              {/* Driver cap */}
              <Path d="M42 38a8 8 0 0116 0h-16z" fill="#8664EC" />
              <Path d="M50 34h10v2H50z" fill="#7152D9" />

              {/* Driver legs */}
              <Path d="M43 75v12h5V75h-5z" fill="#2E205E" />
              <Path d="M52 75v12h5V75h-5z" fill="#2E205E" />

              {/* Laundry bag on left side */}
              <Circle cx="30" cy="72" r="12" fill="#4C349C" />
              <Path d="M28 60c0 3 4 5 4 5s3-2 3-5-2-4-4-4-3 1-3 4z" fill="#4C349C" />
              {/* Bag details / tie */}
              <Path d="M28 61c2 1 3-1 4 0" stroke="#FFFFFF" strokeWidth="1" />

              {/* Large green checkmark overlay */}
              <Circle cx="70" cy="70" r="16" fill="#34D399" />
              <Path d="M65 70l3.5 3.5 6.5-6.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </View>

        {/* 3. Texts */}
        <Text style={styles.titleText}>Order Collected Successfully</Text>
        <Text style={styles.subtitleText}>
          The items have been verified and secured in the delivery vehicle.
        </Text>

        {/* 4. Order Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
            <View style={styles.transitBadge}>
              <Text style={styles.transitBadgeText}>IN TRANSIT</Text>
            </View>
          </View>

          <View style={styles.separator} />

          {/* Customer info */}
          <View style={styles.summaryRow}>
            <View style={styles.rowLabelBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
                <Circle cx="12" cy="8" r="4" />
                <Path d="M5.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
              </Svg>
              <Text style={styles.rowLabelText}>Customer</Text>
            </View>
            <Text style={styles.rowValText}>{order.customerName}</Text>
          </View>

          {/* Order ID info */}
          <View style={styles.summaryRow}>
            <View style={styles.rowLabelBox}>
              <Text style={styles.hashSymbol}>#</Text>
              <Text style={styles.rowLabelText}>Order ID</Text>
            </View>
            <Text style={styles.rowValText}>{order.orderNumber}</Text>
          </View>

          {/* Items Count info */}
          <View style={styles.summaryRow}>
            <View style={styles.rowLabelBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
                <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
              </Svg>
              <Text style={styles.rowLabelText}>Items Count</Text>
            </View>
            <Text style={styles.rowValText}>11 items</Text>
          </View>

          {/* Pickup Time info */}
          <View style={styles.summaryRow}>
            <View style={styles.rowLabelBox}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2">
                <Circle cx="12" cy="12" r="10" />
                <Path d="M12 6v6l4 2" />
              </Svg>
              <Text style={styles.rowLabelText}>Pickup Time</Text>
            </View>
            <Text style={styles.rowValText}>10:45 AM, Today</Text>
          </View>
        </View>

        {/* 5. Action Buttons */}
        {/* Generate QR Labels Button */}
        <TouchableOpacity
          style={styles.generateBtn}
          onPress={onConfirm}
          activeOpacity={0.8}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" style={{ marginRight: 8 }}>
            <Rect x="3" y="3" width="7" height="7" />
            <Rect x="14" y="3" width="7" height="7" />
            <Rect x="3" y="14" width="7" height="7" />
            <Path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 19h2M19 14h2" />
          </Svg>
          <Text style={styles.generateBtnText}>Generate QR Labels</Text>
        </TouchableOpacity>

        {/* View Order Button */}
        <TouchableOpacity
          style={styles.viewOrderBtn}
          onPress={handleViewOrder}
          activeOpacity={0.7}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2" style={{ marginRight: 8 }}>
            <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <Circle cx="12" cy="12" r="3" />
          </Svg>
          <Text style={styles.viewOrderBtnText}>View Order</Text>
        </TouchableOpacity>

        {/* Bottom Warning/Info message */}
        <View style={styles.warningContainer}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="2">
            <Circle cx="12" cy="12" r="10" />
            <Path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          </Svg>
          <Text style={styles.warningText}>
            Labels are required for sorting at the processing center.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
  },
  headerLeftIcon: {
    marginRight: 6,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    alignItems: 'center',
    paddingBottom: 40,
  },
  graphicContainer: {
    marginVertical: 20,
  },
  outerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F3EDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
  },
  transitBadge: {
    backgroundColor: '#FFF2E6',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  transitBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#D97706',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  rowLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabelText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    marginLeft: theme.spacing.sm,
  },
  hashSymbol: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#AEAEB2',
    width: 16,
    textAlign: 'center',
  },
  rowValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  generateBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    width: '100%',
    ...theme.shadows.medium,
  },
  generateBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  viewOrderBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#8664EC',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    width: '100%',
    ...theme.shadows.small,
  },
  viewOrderBtnText: {
    color: '#8664EC',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  warningText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: '#AEAEB2',
    marginLeft: 6,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '84%',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 24,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#EFE8FF',
  },
  modalTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  modalDesc: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xs,
  },
  qrContainer: {
    backgroundColor: '#FAF8FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    marginBottom: theme.spacing.lg,
  },
  modalPrintBtn: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  modalPrintBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.cardBg,
  },
  modalCancelBtn: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#8664EC',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#8664EC',
  },
});
export default OrderCollectedScreen;
