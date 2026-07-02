import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path, Polygon, Rect, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface PickupDetailsScreenProps {
  order: Order;
  onBack: () => void;
  onStartPickup: (order: Order) => void;
}

export const PickupDetailsScreen: React.FC<PickupDetailsScreenProps> = ({
  order,
  onBack,
  onStartPickup,
}) => {
  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header title="Order Details" showBack={true} onBackPress={onBack} />

      {/* 2. Scrollable Body */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Section */}
        <View style={styles.mapCard}>
          <Image
            source={require('../../../assets/images/map.png')}
            style={styles.mapImage}
          />
          {/* Overlaid Navigate Pill Button */}
          <TouchableOpacity style={styles.mapNavigateBtn} activeOpacity={0.8}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <Polygon
                points="3 11 22 2 13 21 11 13 3 11"
                stroke={theme.colors.cardBg}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text style={styles.mapNavigateText}>Navigate</Text>
          </TouchableOpacity>
        </View>

        {/* Customer & Order ID Card */}
        <View style={styles.card}>
          <View style={styles.orderIdHeader}>
            <View>
              <Text style={styles.orderIdLabel}>ORDER ID</Text>
              <Text style={styles.orderIdVal}>{order.orderNumber}</Text>
            </View>
            <View style={styles.activePickupBadge}>
              <View style={styles.activePickupDot} />
              <Text style={styles.activePickupText}>Active Pickup</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.customerRow}>
            <Image source={{ uri: order.customerAvatar }} style={styles.customerAvatar} />
            <View style={styles.customerDetails}>
              <Text style={styles.customerName}>{order.customerName}</Text>
              <View style={styles.addressRow}>
                <Svg width="12" height="14" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
                    fill={theme.colors.textMedium}
                  />
                </Svg>
                <Text style={styles.addressText}>
                  42nd Street, Emerald Hills
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.phoneBtn} activeOpacity={0.7}>
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
          </View>
        </View>

        {/* Pickup Window Card */}
        <View style={styles.card}>
          <View style={styles.pickupWindowRow}>
            <View style={styles.clockIconBox}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
            <View style={styles.pickupTextContent}>
              <Text style={styles.pickupWindowLabel}>Pickup Window</Text>
              <Text style={styles.pickupWindowVal}>10:00 - 11:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Laundry Type & Est. Weight Row */}
        <View style={styles.splitRow}>
          {/* Laundry Type Card */}
          <View style={[styles.card, styles.splitCard]}>
            <Text style={styles.splitCardLabel}>Laundry Type</Text>
            <View style={styles.splitCardValRow}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="2"
                  ry="2"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                />
                <Path d="M5 8h19" stroke={theme.colors.primary} strokeWidth="2" />
                <Circle cx="12" cy="15" r="4" stroke={theme.colors.primary} strokeWidth="2" />
              </Svg>
              <Text style={styles.splitCardValText}>Wash & Iron</Text>
            </View>
          </View>

          {/* Est. Weight Card */}
          <View style={[styles.card, styles.splitCard]}>
            <Text style={styles.splitCardLabel}>Est. Weight</Text>
            <View style={styles.splitCardValRow}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M5 2h14v5c0 2-2 3-4 5 2 2 4 3 4 5v5H5v-5c0-2 2-3 4-5-2-2-4-3-4-5V2z"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.splitCardValText}>8.5 kg (3 Bags)</Text>
            </View>
          </View>
        </View>

        {/* Services & Instructions Card */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>SERVICES REQUESTED</Text>
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Steam Press</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Fabric Softener</Text>
            </View>
          </View>

          <Text style={[styles.sectionLabel, { marginTop: theme.spacing.md }]}>INSTRUCTIONS</Text>
          <Text style={styles.instructionText}>
            “Handle delicates with care”
          </Text>
        </View>

        {/* Order Status Card */}
        <View style={styles.card}>
          <Text style={styles.orderStatusTitle}>Order Status</Text>
          
          <View style={styles.timelineRow}>
            {/* Timeline connection lines */}
            <View style={styles.timelineBgLine} />
            <View style={[styles.timelineBgLine, styles.timelineActiveLine]} />

            {/* Step 1: Assigned */}
            <View style={styles.timelineStep}>
              <View style={[styles.timelineNode, styles.nodeActive]}>
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M20 6L9 17l-5-5"
                    stroke={theme.colors.cardBg}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.timelineTextActive}>Assigned</Text>
            </View>

            {/* Step 2: Pickup */}
            <View style={styles.timelineStep}>
              <View style={[styles.timelineNode, styles.nodeActive]}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"
                    stroke={theme.colors.cardBg}
                    strokeWidth="2"
                    fill="none"
                  />
                  <Circle cx="5.5" cy="18.5" r="2.5" fill={theme.colors.cardBg} />
                  <Circle cx="18.5" cy="18.5" r="2.5" fill={theme.colors.cardBg} />
                </Svg>
              </View>
              <Text style={styles.timelineTextActive}>Pickup</Text>
              <View style={styles.activeStepDot} />
            </View>

            {/* Step 3: Processing */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineNodeInactive}>
                <View style={styles.nodeInnerDot} />
              </View>
              <Text style={styles.timelineTextInactive}>Processing</Text>
            </View>

            {/* Step 4: Delivery */}
            <View style={styles.timelineStep}>
              <View style={styles.timelineNodeInactive}>
                <View style={styles.nodeInnerDot} />
              </View>
              <Text style={styles.timelineTextInactive}>Delivery</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons (inline with the scroll content) */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.primaryActionBtn, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.8}
            onPress={() => onStartPickup(order)}
          >
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <Path
                d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5C4 22 6 21 7.5 19.5M12 2C6 2 2 6 2 12c0 2.5 1 4.5 2.5 6l11-11"
                stroke={theme.colors.cardBg}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Path
                d="M14.5 3.5l6 6-12 12-6-6 12-12z"
                stroke={theme.colors.cardBg}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
            <Text style={styles.primaryActionText}>Start Pickup</Text>
          </TouchableOpacity>

          <View style={styles.secondaryActionRow}>
            <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.7}>
              <Text style={styles.secondaryActionText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.7}>
              <Text style={styles.secondaryActionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryActionBtn} activeOpacity={0.7}>
              <Text style={styles.secondaryActionText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: theme.spacing.xl }} />
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
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  mapCard: {
    height: 180,
    width: '100%',
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    position: 'relative',
    ...theme.shadows.medium,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapNavigateBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    ...theme.shadows.small,
  },
  mapNavigateText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.cardBg,
    marginLeft: 6,
  },
  card: {
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
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.heavy,
    color: theme.colors.primary,
    marginBottom: 2,
  },
  orderIdVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  activePickupBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  activePickupDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  activePickupText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
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
  customerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEEEEE',
  },
  customerDetails: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  customerName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
    marginLeft: 4,
    flexShrink: 1,
  },
  phoneBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupWindowRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupTextContent: {
    marginLeft: theme.spacing.sm,
  },
  pickupWindowLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  pickupWindowVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  splitCard: {
    flex: 1,
    marginHorizontal: 0,
  },
  splitCardLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: theme.spacing.xs,
  },
  splitCardValRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  splitCardValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginLeft: 6,
    flexShrink: 1,
  },
  sectionLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMedium,
    marginBottom: theme.spacing.sm,
    letterSpacing: 0.5,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  chipText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
  },
  instructionText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    fontStyle: 'italic',
    color: theme.colors.textMedium,
  },
  orderStatusTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.md,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xs,
    position: 'relative',
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  timelineNode: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    zIndex: 2,
  },
  nodeActive: {
    backgroundColor: theme.colors.primary,
  },
  timelineNodeInactive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    zIndex: 2,
  },
  nodeInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AEAEB2',
  },
  timelineTextActive: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    textAlign: 'center',
  },
  timelineTextInactive: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
  activeStepDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    marginTop: 4,
  },
  timelineBgLine: {
    position: 'absolute',
    top: 13,
    left: '12.5%',
    right: '12.5%',
    height: 2,
    backgroundColor: '#E5E5EA',
    zIndex: 1,
  },
  timelineActiveLine: {
    right: '62.5%', // active from node 1 (12.5%) to node 2 (37.5%)
    backgroundColor: theme.colors.primary,
  },
  actionContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    width: '100%',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  primaryActionText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    marginLeft: 8,
  },
  secondaryActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryActionBtn: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    ...theme.shadows.small,
  },
  secondaryActionText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
});
export default PickupDetailsScreen;
