import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface FranchiseVerificationScreenProps {
  order: Order;
  onConfirm: () => void;
  onBack: () => void;
}

const CIRCLE_RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~201.06

export const FranchiseVerificationScreen: React.FC<FranchiseVerificationScreenProps> = ({
  order,
  onConfirm,
  onBack,
}) => {
  const insets = useSafeAreaInsets();

  // Animation values for percentage count-up
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [percent, setPercent] = useState(0);

  // Success dialog popup states
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDesc, setDialogDesc] = useState('');
  const [dialogOnClose, setDialogOnClose] = useState<(() => void) | undefined>(undefined);

  const showCustomDialog = (title: string, desc: string, onClose?: () => void) => {
    setDialogTitle(title);
    setDialogDesc(desc);
    setDialogOnClose(() => onClose);
    setDialogVisible(true);
  };

  useEffect(() => {
    // Animate scanner progress from 0 to 1 over 8 seconds
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start();

    // Listen to animated value to update text state
    const animId = progressAnim.addListener(({ value }) => {
      setPercent(Math.floor(value * 100));

      // Trigger automatic completion modal when reaching 100%
      if (value >= 0.999) {
        showCustomDialog(
          'Verification Completed',
          'All 12 packages have been scanned and authenticated successfully by the Franchise Central hub. Status updated to dispatched.',
          () => {
            onConfirm();
          }
        );
      }
    });

    return () => {
      progressAnim.removeListener(animId);
    };
  }, [progressAnim, onConfirm]);

  const handleContactFranchise = () => {
    showCustomDialog(
      'Calling Franchise',
      'Connecting call to Franchise Central Hub Desk support at +1 (555) 902-881...'
    );
  };

  // Interpolate SVG progress stroke offset
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  // Calculate dynamic scan metrics based on current percentage
  const totalBags = 12;
  const verifiedBags = Math.min(
    totalBags,
    Math.floor((percent / 100) * totalBags)
  );
  const pendingBags = totalBags - verifiedBags;

  // Custom Header Notification Bell Icon
  const headerRightBell = (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.bellBtn}
      onPress={() => showCustomDialog('Notifications', 'No new system notifications.')}
    >
      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header
        title="Rinzo"
        showBack={true}
        onBackPress={onBack}
        rightCustom={headerRightBell}
      />

      <View style={styles.scrollContent}>
        {/* 2. Scanning Graphic Container */}
        <View style={styles.graphicOuterCard}>
          <Image
            source={require('../../../assets/images/verification_scanner.png')}
            style={styles.scannerImage}
            resizeMode="cover"
          />

          {/* Floating Circle Progress bar intersecting bottom border */}
          <View style={styles.floatingProgressCircle}>
            <Svg width="76" height="76" viewBox="0 0 76 76">
              {/* Bg Track */}
              <Circle
                cx="38"
                cy="38"
                r={CIRCLE_RADIUS}
                stroke="#F2EFFF"
                strokeWidth="4"
                fill="#FFFFFF"
              />
              {/* Progress Line */}
              <AnimatedCircle
                cx="38"
                cy="38"
                r={CIRCLE_RADIUS}
                stroke="#8664EC"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 38 38)"
              />
            </Svg>
            <View style={styles.percentTextCol}>
              <Text style={styles.percentValue}>{percent}%</Text>
            </View>
          </View>
        </View>

        {/* 3. Waiting Text Headers */}
        <View style={styles.statusHeaders}>
          <Text style={styles.statusTitle}>Waiting for Verification</Text>
          <Text style={styles.statusDescription}>
            The franchise is verifying all QR labels for security.
          </Text>
        </View>

        {/* 4. Verification Status Metrics Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusCardHeader}>
            <Text style={styles.statusCardTitle}>Verification Status</Text>
            <View style={styles.timeBadge}>
              <Text style={styles.timeBadgeText}>
                🕒 {percent >= 100 ? 'Scanned' : '3 mins left'}
              </Text>
            </View>
          </View>

          {/* Verification counts row */}
          <View style={styles.metricsBoxRow}>
            <View style={styles.metricCapsulePurple}>
              <Text style={styles.metricLabel}>VERIFIED</Text>
              <Text style={styles.metricValueVerified}>
                {verifiedBags}<Text style={styles.metricValueTotal}>/{totalBags}</Text>
              </Text>
            </View>

            <View style={styles.metricCapsuleGrey}>
              <Text style={styles.metricLabel}>PENDING</Text>
              <Text style={styles.metricValuePending}>{pendingBags}</Text>
            </View>
          </View>
        </View>

        {/* 5. Order/Customer Reference Card */}
        <View style={styles.referenceCard}>
          <View style={styles.refRowSplit}>
            <View>
              <Text style={styles.refSubtext}>CUSTOMER</Text>
              <Text style={styles.refPrimaryText}>{order.customerName}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.refSubtext}>ORDER ID</Text>
              <Text style={styles.refOrderText}>#{order.orderNumber}</Text>
            </View>
          </View>

          <View style={styles.separatorLine} />

          <View style={styles.refBottomRow}>
            <View style={styles.refBottomItem}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555555" strokeWidth="2.5">
                <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </Svg>
              <Text style={styles.refBottomText}>{totalBags} Bags Total</Text>
            </View>

            <View style={styles.refBottomItem}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={[styles.refBottomText, { color: '#10B981', fontWeight: 'bold' }]}>
                Secure Scan
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 6. Contact Support Bottom Button */}
      <View style={[styles.bottomButtonContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={handleContactFranchise}
          activeOpacity={0.8}
        >
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
            <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </Svg>
          <Text style={styles.contactBtnText}>Contact Franchise</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Themed Success Alert Modal */}
      <Modal
        visible={dialogVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.dialogBackdrop}>
          <View style={styles.dialogCard}>
            <View style={styles.dialogIconOuter}>
              <View style={styles.dialogIconInner}>
                <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                  <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
            </View>

            <Text style={styles.dialogTitle}>{dialogTitle}</Text>
            <Text style={styles.dialogDesc}>{dialogDesc}</Text>

            <TouchableOpacity
              style={styles.dialogBtn}
              activeOpacity={0.8}
              onPress={() => {
                setDialogVisible(false);
                if (dialogOnClose) dialogOnClose();
              }}
            >
              <Text style={styles.dialogBtnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  graphicOuterCard: {
    height: 230,
    borderRadius: 28,
    overflow: 'visible',
    position: 'relative',
    backgroundColor: theme.colors.cardBg,
    ...theme.shadows.medium,
    marginBottom: 44,
  },
  scannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  floatingProgressCircle: {
    position: 'absolute',
    bottom: -32,
    alignSelf: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  percentTextCol: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  statusHeaders: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 6,
  },
  statusDescription: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
    marginBottom: 12,
  },
  statusCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusCardTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  timeBadge: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEF3C7',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  timeBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
  },
  metricsBoxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCapsulePurple: {
    flex: 1,
    backgroundColor: '#F5EFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 6,
  },
  metricCapsuleGrey: {
    flex: 1,
    backgroundColor: '#F4F4F6',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 6,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 8,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  metricValueVerified: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  metricValueTotal: {
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  metricValuePending: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  referenceCard: {
    backgroundColor: '#F7F6FB',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
  },
  refRowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refSubtext: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  refPrimaryText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  refOrderText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#EBEAEF',
    marginVertical: 12,
  },
  refBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refBottomText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textDark,
    marginLeft: 6,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FAF9FC',
  },
  contactBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dialogBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  dialogCard: {
    width: '84%',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 24,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#EFE8FF',
  },
  dialogIconOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  dialogIconInner: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  dialogDesc: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  dialogBtn: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  dialogBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.cardBg,
  },
});

export default FranchiseVerificationScreen;
