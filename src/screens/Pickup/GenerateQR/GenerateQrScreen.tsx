import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface GenerateQrScreenProps {
  order: Order;
  onBack: () => void;
  onConfirm: () => void;
}

interface BagData {
  id: string;
  name: string;
  qrCode: string;
  service: string;
  weight: string;
  status: 'printed' | 'ready' | 'pending';
}

export const GenerateQrScreen: React.FC<GenerateQrScreenProps> = ({
  order: _order,
  onBack,
  onConfirm,
}) => {

  // Bags printing state
  const [bags, setBags] = useState<BagData[]>([
    {
      id: '1',
      name: 'Bag 1',
      qrCode: '#QR-8821',
      service: 'Wash & Fold',
      weight: '2.5 kg',
      status: 'printed',
    },
    {
      id: '2',
      name: 'Bag 2',
      qrCode: '#QR-8822',
      service: 'Delicate Cycle',
      weight: '1.2 kg',
      status: 'ready',
    },
    {
      id: '3',
      name: 'Bag 3',
      qrCode: '#QR-Pending',
      service: 'Dry Clean',
      weight: '-- kg',
      status: 'pending',
    },
  ]);

  // Derived counts for Overview card (based on 12-item scaling representation in screenshot)
  const readyCount = bags.filter((b) => b.status === 'ready').length; // 1 or 0

  // Map representation to 12 items to match picture values exactly:
  // Initial: Generated = 4 (printed 2 + ready 2), printed = 2, pending = 6 (ready 2 will be modeled dynamically!)
  // If printedCount increases, printed increases, ready decreases.
  const displayGenerated = readyCount > 0 ? '4/12' : '6/12';
  const displayPrinted = readyCount > 0 ? '2/12' : '4/12';
  const displayPending = '6/12';

  // Segment widths in flex:
  // Initial: Generated (not printed) = 2, Printed = 2, Pending = 6, but total is 12.
  // We model: [flexGenerated (purple), flexPrinted (gold), flexPending (light grey)]
  const flexGenerated = readyCount > 0 ? 2 : 2;
  const flexPrinted = readyCount > 0 ? 2 : 4;
  const flexPending = 6;

  const handlePrintBag = (bagId: string, bagName: string) => {
    setBags((prev) =>
      prev.map((b) => (b.id === bagId ? { ...b, status: 'printed' } : b))
    );
    Alert.alert(
      'Printing Label',
      `${bagName} QR code label has been sent to connected Bluetooth printer TP-202.`,
      [{ text: 'OK' }]
    );
  };

  const handlePrintAll = () => {
    setBags((prev) =>
      prev.map((b) => (b.status === 'ready' ? { ...b, status: 'printed' } : b))
    );
    Alert.alert(
      'All Labels Printed',
      'All generated QR laundry bag labels have been sent to Bluetooth printer.',
      [{ text: 'OK' }]
    );
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'printed':
        return {
          bg: '#FEF3C7',
          color: '#D97706',
          text: 'PRINTED',
        };
      case 'ready':
        return {
          bg: '#EFE8FF',
          color: '#8664EC',
          text: 'READY TO PRINT',
        };
      default:
        return {
          bg: '#F3F4F6',
          color: '#9CA3AF',
          text: 'PENDING',
        };
    }
  };

  const renderBagIcon = (status: string) => {
    const isPending = status === 'pending';
    return (
      <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <Rect x="2" y="2" width="20" height="20" rx="4" fill={isPending ? '#F3F4F6' : '#F5EFFF'} />
        <Rect x="6" y="6" width="4" height="4" fill={isPending ? '#9CA3AF' : '#8664EC'} />
        <Rect x="14" y="6" width="4" height="4" fill={isPending ? '#9CA3AF' : '#8664EC'} />
        <Rect x="6" y="14" width="4" height="4" fill={isPending ? '#9CA3AF' : '#8664EC'} />
        <Path d="M14 14h2v2h-2z" fill={isPending ? '#9CA3AF' : '#8664EC'} />
        <Path d="M16 16h2v2h-2z" fill={isPending ? '#9CA3AF' : '#8664EC'} />
        <Path d="M14 18h2v2h-2z" fill={isPending ? '#9CA3AF' : '#8664EC'} />
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header
        title="Generate QR Labels"
        showBack={true}
        onBackPress={onBack}
        rightCustom={
          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2C2C" strokeWidth="2">
              <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </Svg>
          </TouchableOpacity>
        }
      />

      {/* 2. Scrollable Body Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Prompts */}
        <Text style={styles.titleText}>Generate QR Labels</Text>
        <Text style={styles.subtitleText}>Every laundry bag receives its own QR.</Text>

        {/* 3. Progress Overview Card */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewColumnsRow}>
            {/* Column 1: Generated */}
            <View style={styles.overviewCol}>
              <Text style={[styles.overviewColVal, { color: '#8664EC' }]}>
                {displayGenerated}
              </Text>
              <Text style={styles.overviewColLabel}>GENERATED</Text>
            </View>

            <View style={styles.overviewDivider} />

            {/* Column 2: Printed */}
            <View style={styles.overviewCol}>
              <Text style={[styles.overviewColVal, { color: '#D97706' }]}>
                {displayPrinted}
              </Text>
              <Text style={styles.overviewColLabel}>PRINTED</Text>
            </View>

            <View style={styles.overviewDivider} />

            {/* Column 3: Pending */}
            <View style={styles.overviewCol}>
              <Text style={styles.overviewColVal}>
                {displayPending}
              </Text>
              <Text style={styles.overviewColLabel}>PENDING</Text>
            </View>
          </View>

          {/* Segmented Multi-Color Progress Line */}
          <View style={styles.segmentedProgressLine}>
            <View style={[styles.progressSegment, { flex: flexGenerated, backgroundColor: '#8664EC' }]} />
            <View style={[styles.progressSegment, { flex: flexPrinted, backgroundColor: '#D97706' }]} />
            <View style={[styles.progressSegment, { flex: flexPending, backgroundColor: '#E5E7EB' }]} />
          </View>
        </View>

        {/* 4. Bag Cards List */}
        {bags.map((bag) => {
          const badge = getBadgeStyle(bag.status);
          const isReady = bag.status === 'ready';
          const isPending = bag.status === 'pending';

          return (
            <View key={bag.id} style={styles.bagCard}>
              <View style={styles.bagIconContainer}>
                {renderBagIcon(bag.status)}
              </View>

              <View style={styles.bagDetailsBox}>
                <View style={styles.bagTitleRow}>
                  <Text style={styles.bagTitleText}>{bag.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.statusBadgeText, { color: badge.color }]}>
                      {badge.text}
                    </Text>
                  </View>
                </View>

                <Text style={styles.bagSubtitleText}>
                  {bag.qrCode} • {bag.service}
                </Text>

                <View style={styles.weightRow}>
                  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.2" style={{ marginRight: 4 }}>
                    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <Circle cx="12" cy="7" r="4" />
                  </Svg>
                  <Text style={styles.weightText}>{bag.weight}</Text>
                </View>
              </View>

              {/* Printing Button on the Right */}
              {isReady ? (
                <TouchableOpacity
                  style={styles.printBtnActive}
                  onPress={() => handlePrintBag(bag.id, bag.name)}
                  activeOpacity={0.8}
                >
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <Path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    <Path d="M6 14h12v8H6z" />
                  </Svg>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.printBtnDisabled,
                    isPending && { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' },
                  ]}
                >
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isPending ? '#E5E7EB' : '#AEAEB2'} strokeWidth="2.5">
                    <Path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                    <Path d="M6 14h12v8H6z" />
                  </Svg>
                </View>
              )}
            </View>
          );
        })}

        {/* 5. Connected Printer Bar */}
        <View style={styles.printerStatusBar}>
          <View style={styles.printerIconCircle}>
            <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <Path d="M6.5 6.5l11 11L12 22V2l5.5 5.5-11 11" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
          <View style={styles.printerDetails}>
            <Text style={styles.printerTitleText}>Connected to TP-202</Text>
            <View style={styles.printerMetricsRow}>
              {/* Battery level */}
              <View style={styles.metricItem}>
                <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" style={{ marginRight: 2 }}>
                  <Rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                  <Path d="M22 11v2" />
                </Svg>
                <Text style={styles.metricText}>85%</Text>
              </View>
              {/* Signal strength */}
              <View style={[styles.metricItem, { marginLeft: 8 }]}>
                <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 2 }}>
                  <Path d="M12 20h.01M8 20a4 4 0 018 0M4 20a8 8 0 0116 0" strokeLinecap="round" />
                </Svg>
                <Text style={styles.metricText}>Strong</Text>
              </View>
            </View>
          </View>
          <View style={styles.greenActiveDot} />
        </View>

        {/* 6. Action Submit Buttons */}
        {/* Print All Labels */}
        <TouchableOpacity
          style={styles.printAllBtn}
          onPress={handlePrintAll}
          activeOpacity={0.8}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" style={{ marginRight: 8 }}>
            <Path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
            <Path d="M6 14h12v8H6z" />
          </Svg>
          <Text style={styles.printAllBtnText}>Print All Labels</Text>
        </TouchableOpacity>

        {/* Continue to Navigate */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onConfirm}
          activeOpacity={0.7}
        >
          <Text style={styles.continueBtnText}>Continue to Navigate</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
  },
  bellButton: {
    padding: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 40,
  },
  titleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 20,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 4,
    paddingHorizontal: theme.spacing.xs,
  },
  subtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  overviewCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
  },
  overviewColumnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  overviewCol: {
    flex: 1,
    alignItems: 'center',
  },
  overviewColVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  overviewColLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
  },
  overviewDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F0F0F5',
  },
  segmentedProgressLine: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  progressSegment: {
    height: '100%',
  },
  bagCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
  },
  bagIconContainer: {
    marginRight: theme.spacing.sm,
  },
  bagDetailsBox: {
    flex: 1,
  },
  bagTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  bagTitleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: 6,
  },
  statusBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
  },
  bagSubtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    marginBottom: 4,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
  },
  printBtnActive: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  printBtnDisabled: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FCFCFE',
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printerStatusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E2B4B', // Dark indigo status bar
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
    ...theme.shadows.small,
  },
  printerIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#52458F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  printerDetails: {
    flex: 1,
  },
  printerTitleText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  printerMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    color: '#AEAEB2',
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
  },
  greenActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981', // active green indicator dot
    marginLeft: theme.spacing.sm,
  },
  printAllBtn: {
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
  printAllBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  continueBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#8664EC',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  continueBtnText: {
    color: '#8664EC',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
export default GenerateQrScreen;
