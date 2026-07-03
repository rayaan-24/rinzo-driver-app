import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface BagData {
  id: string;
  name: string;
  qrCode: string;
  service: string;
  weight: string;
  status: 'printed' | 'ready' | 'pending';
}

interface LabelPreviewScreenProps {
  order: Order;
  bag: BagData;
  onBack: () => void;
}

const { width } = Dimensions.get('window');

export const LabelPreviewScreen: React.FC<LabelPreviewScreenProps> = ({
  order,
  bag,
  onBack,
}) => {
  const [showScanResult, setShowScanResult] = useState(false);

  // Custom themed dialog states
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDesc, setDialogDesc] = useState('');

  const showCustomDialog = (title: string, desc: string) => {
    setDialogTitle(title);
    setDialogDesc(desc);
    setDialogVisible(true);
  };

  const handlePrint = () => {
    showCustomDialog(
      'Label Printed',
      `Sticker tag for ${bag.name} (${bag.qrCode}) sent to connected Thermal Printer Z-100!`
    );
  };

  const handleShare = () => {
    showCustomDialog('Share Label', 'Opening native system share sheet...');
  };

  const handleRegenerate = () => {
    showCustomDialog(
      'Regenerating QR',
      'Re-generating unique cryptographic QR hash for this laundry bag...'
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <Header title="Label Preview" showBack={true} onBackPress={onBack} />

      {/* 2. Scrollable Body Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Printable Label Sticker Card */}
        <View style={styles.labelCard}>
          {/* Card Header Row */}
          <View style={styles.labelCardHeader}>
            <View>
              <Text style={styles.cardHeaderLabel}>ORDER ID</Text>
              <Text style={styles.cardHeaderVal}>{order.orderNumber}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.cardHeaderLabel}>DATE & TIME</Text>
              <Text style={styles.cardHeaderVal}>10:50 AM</Text>
            </View>
          </View>

          {/* Dotted QR Box - Clickable to simulate scanning */}
          <TouchableOpacity
            style={styles.qrDottedBox}
            activeOpacity={0.9}
            onPress={() => setShowScanResult(true)}
          >
            <View style={styles.qrInnerBackground}>
              <QRCode
                value={JSON.stringify({
                  orderNumber: order.orderNumber,
                  customerName: order.customerName,
                  bagCode: bag.qrCode,
                  service: bag.service,
                  weight: bag.weight,
                  items: ['Shirts (5)', 'Pants (3)', 'Sarees (2)', 'Blankets (1)'],
                })}
                size={120}
                color="#2c2c2c"
                backgroundColor="transparent"
              />
            </View>
            <Text style={styles.scanLabelPrompt}>Scan to verify bag contents</Text>
          </TouchableOpacity>

          {/* Details Section (Two Columns) */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              {/* Customer Column */}
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>Customer Name</Text>
                <Text style={styles.gridVal}>{order.customerName}</Text>
              </View>

              {/* Bag Count Column */}
              <View style={styles.gridColRight}>
                <Text style={styles.gridLabelRight}>Bag Count</Text>
                <Text style={styles.gridValRight}>
                  {bag.id === '1' ? '1' : bag.id === '2' ? '2' : '3'} of 3
                </Text>
              </View>
            </View>

            <View style={[styles.gridRow, { marginTop: 16 }]}>
              {/* Service Type Column */}
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>Service Type</Text>
                <View style={styles.serviceBadge}>
                  <Text style={styles.serviceBadgeText}>{bag.service}</Text>
                </View>
              </View>

              {/* Weight Column */}
              <View style={styles.gridColRight}>
                <Text style={styles.gridLabelRight}>Weight</Text>
                <Text style={styles.gridValRight}>{bag.weight}</Text>
              </View>
            </View>
          </View>

          {/* Bottom Watermark */}
          <View style={styles.watermarkContainer}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D1D1D6" strokeWidth="2.5" style={{ marginRight: 4 }}>
              <Circle cx="12" cy="12" r="10" />
              <Path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </Svg>
            <Text style={styles.watermarkText}>RINZO</Text>
          </View>
        </View>

        {/* 3. Action Buttons */}
        {/* Print Label */}
        <TouchableOpacity
          style={styles.printLabelBtn}
          onPress={handlePrint}
          activeOpacity={0.8}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" style={{ marginRight: 8 }}>
            <Path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
            <Path d="M6 14h12v8H6z" />
          </Svg>
          <Text style={styles.printLabelBtnText}>Print Label</Text>
        </TouchableOpacity>

        {/* Share & Regenerate Buttons */}
        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity
            style={styles.actionBtnShare}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2.5" style={{ marginRight: 6 }}>
              <Circle cx="18" cy="5" r="3" />
              <Circle cx="6" cy="12" r="3" />
              <Circle cx="18" cy="19" r="3" />
              <Path d="M8.59 13.51l5.83 3.4M14.42 7.09l-5.83 3.4" />
            </Svg>
            <Text style={styles.actionBtnShareText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtnRegen}
            onPress={handleRegenerate}
            activeOpacity={0.7}
          >
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2.5" style={{ marginRight: 6 }}>
              <Path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
            </Svg>
            <Text style={styles.actionBtnRegenText}>Regenerate</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Thermal Printer Status Bar */}
        <TouchableOpacity
          style={styles.printerStatusCapsule}
          activeOpacity={0.9}
          onPress={() => showCustomDialog('Printer Connection', 'Thermal Printer Z-100 is connected, online, and has 40% paper remaining.')}
        >
          <View style={styles.printerCircleIcon}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
              <Path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <Path d="M6 14h12v8H6z" />
            </Svg>
          </View>
          <View style={styles.printerStatusDetails}>
            <Text style={styles.printerTitle}>Thermal Printer Z-100</Text>
            <View style={styles.connectedRow}>
              <View style={styles.greenActiveDot} />
              <Text style={styles.connectedText}>CONNECTED</Text>
            </View>
          </View>

          <View style={styles.printerMetricCol}>
            <Text style={styles.metricValLabel}>PAPER</Text>
            <Text style={styles.metricValText}>40%</Text>
          </View>

          <View style={[styles.printerMetricCol, { marginLeft: 16 }]}>
            <Text style={styles.metricValLabel}>BATTERY</Text>
            <Text style={styles.metricValText}>85%</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* 5. Custom Themed Simulated QR Scanned Result Modal */}
      <Modal
        visible={showScanResult}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowScanResult(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Concentric Success Check Icon */}
            <View style={styles.modalIconOuterCircle}>
              <View style={styles.modalIconInnerCircle}>
                <Svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                  <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
            </View>

            <Text style={styles.modalTitle}>QR Code Scanned</Text>
            <Text style={styles.modalDesc}>
              Bag details successfully decrypted and verified against customer order contents.
            </Text>

            {/* Decrypted Bag Metadata Table */}
            <View style={styles.metaTable}>
              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Order Number</Text>
                <Text style={styles.tableValue}>{order.orderNumber}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Customer</Text>
                <Text style={styles.tableValue}>{order.customerName}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Bag ID / Tag</Text>
                <Text style={styles.tableValue}>{bag.qrCode}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Service Type</Text>
                <Text style={styles.tableValue}>{bag.service}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.tableLabel}>Weight</Text>
                <Text style={styles.tableValue}>{bag.weight}</Text>
              </View>

              {/* Items Breakdown list */}
              <View style={styles.itemsBreakdownBox}>
                <Text style={styles.breakdownTitle}>Verified Bag Contents:</Text>
                <View style={styles.breakdownItemsRow}>
                  <View style={styles.breakdownItemBadge}>
                    <Text style={styles.breakdownItemText}>Shirts (5)</Text>
                  </View>
                  <View style={styles.breakdownItemBadge}>
                    <Text style={styles.breakdownItemText}>Pants (3)</Text>
                  </View>
                  <View style={styles.breakdownItemBadge}>
                    <Text style={styles.breakdownItemText}>Sarees (2)</Text>
                  </View>
                  <View style={styles.breakdownItemBadge}>
                    <Text style={styles.breakdownItemText}>Blankets (1)</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.tableRow, { borderBottomWidth: 0, marginTop: 12 }]}>
                <Text style={styles.tableLabel}>Processing Hub</Text>
                <Text style={[styles.tableValue, { color: '#8664EC' }]}>HUB-MANHATTAN-N04</Text>
              </View>
            </View>

            {/* OK Dismiss Button */}
            <TouchableOpacity
              style={styles.modalDismissBtn}
              activeOpacity={0.8}
              onPress={() => setShowScanResult(false)}
            >
              <Text style={styles.modalDismissBtnText}>Close Verification</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Custom Themed Dialog Alert Modal */}
      <Modal
        visible={dialogVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {/* Concentric Success Circle Icon */}
            <View style={styles.modalIconOuterCircle}>
              <View style={styles.modalIconInnerCircle}>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                  <Path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            </View>

            {/* Modal texts */}
            <Text style={styles.modalTitle}>{dialogTitle}</Text>
            <Text style={styles.modalDesc}>{dialogDesc}</Text>

            {/* Modal OK Button */}
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.8}
              onPress={() => setDialogVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    alignItems: 'center',
    paddingBottom: 24,
  },
  labelCard: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    width: '100%',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: '#F0F0F3',
  },
  labelCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeaderLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardHeaderVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  qrDottedBox: {
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#AEAEB2',
    borderRadius: 16,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    marginBottom: 24,
  },
  qrInnerBackground: {
    backgroundColor: theme.colors.cardBg,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
    marginBottom: 12,
  },
  scanLabelPrompt: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
  gridContainer: {
    width: '100%',
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCol: {
    flex: 1.2,
  },
  gridColRight: {
    flex: 0.8,
    alignItems: 'flex-end',
  },
  gridLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: 4,
  },
  gridLabelRight: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: 4,
    textAlign: 'right',
  },
  gridVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  gridValRight: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    textAlign: 'right',
  },
  serviceBadge: {
    backgroundColor: '#F5EFFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  serviceBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: '#8664EC',
    fontWeight: 'bold',
  },
  watermarkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  watermarkText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    color: '#AEAEB2',
    letterSpacing: 2,
  },
  printLabelBtn: {
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
  printLabelBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing.lg,
  },
  actionBtnShare: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.44,
  },
  actionBtnShareText: {
    color: theme.colors.textDark,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  actionBtnRegen: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.44,
  },
  actionBtnRegenText: {
    color: theme.colors.textDark,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  printerStatusCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 20,
    padding: theme.spacing.md,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
  },
  printerCircleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  printerStatusDetails: {
    flex: 1,
  },
  printerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  connectedText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#10B981',
  },
  printerMetricCol: {
    alignItems: 'center',
  },
  metricValLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 8,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  metricValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
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
  modalIconOuterCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  modalIconInnerCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
    textAlign: 'center',
  },
  modalDesc: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  metaTable: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#F0F0F3',
    marginBottom: theme.spacing.md,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  tableLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  tableValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  itemsBreakdownBox: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  breakdownTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: 6,
  },
  breakdownItemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  breakdownItemBadge: {
    backgroundColor: '#EFE8FF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 4,
    marginBottom: 4,
  },
  breakdownItemText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    color: '#8664EC',
    fontWeight: 'bold',
  },
  modalDismissBtn: {
    width: '100%',
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#8664EC',
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDismissBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  modalButton: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  modalButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.cardBg,
  },
});
export default LabelPreviewScreen;
