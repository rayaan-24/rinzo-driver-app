import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Path, Circle, Polygon, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface OrderTransitScreenProps {
  order: Order;
  onBack: () => void;
  onViewOrderPress?: () => void;
  onNavigateToPickup: (order: Order) => void;
  isTransitToFranchise?: boolean;
  showAcceptedBanner?: boolean;
  onAcceptNewOrder?: () => void;
}

const { width, height } = Dimensions.get('window');
const CIRCUMFERENCE = 2 * Math.PI * 45; // 282.7

export const OrderTransitScreen: React.FC<OrderTransitScreenProps> = ({
  order,
  onBack,
  onViewOrderPress,
  onNavigateToPickup,
  isTransitToFranchise = false,
  showAcceptedBanner = false,
  onAcceptNewOrder,
}) => {
  const insets = useSafeAreaInsets();

  // Animation values for timeline progress & pulsing circle
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // New Order Assigned state triggers
  const [showNewOrderPopup, setShowNewOrderPopup] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(height)).current;
  const timerStrokeAnim = useRef(new Animated.Value(1)).current;

  // 1. Initial mounting animations for In Transit timeline
  useEffect(() => {
    if (isTransitToFranchise) {
      // Animate progress line to 50% (between Pickup and In Transit)
      Animated.timing(progressAnim, {
        toValue: 0.5,
        duration: 1200,
        useNativeDriver: false,
      }).start();

      // Loop scale pulse animation for In Transit active node
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isTransitToFranchise, progressAnim, pulseAnim]);

  // 3. 5-Second Dispatch screen trigger to launch New Order Assigned bottom sheet
  useEffect(() => {
    let popupTimeout: NodeJS.Timeout;
    if (isTransitToFranchise) {
      popupTimeout = setTimeout(() => {
        // Slide up sheet
        setShowNewOrderPopup(true);
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          // Buzz once fully entered
          Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
          ]).start();
        });
      }, 5000);
    }
    return () => {
      clearTimeout(popupTimeout);
    };
  }, [isTransitToFranchise, slideUpAnim, shakeAnim]);

  // 4. 60-Second countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showNewOrderPopup) {
      // Animate circular SVG outline from 1 to 0 over 60 seconds
      Animated.timing(timerStrokeAnim, {
        toValue: 0,
        duration: 60000,
        useNativeDriver: false,
      }).start();

      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowNewOrderPopup(false);
            handleAcceptNewOrder();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNewOrderPopup, timerStrokeAnim]);

  const handleCall = () => {
    showCustomDialog(
      'Calling Contact',
      `Connecting call to ${isTransitToFranchise ? 'Franchise Central Support' : order.customerName}...`
    );
  };

  const handleMessage = () => {
    showCustomDialog(
      'Support Chat',
      `Opening message thread with ${isTransitToFranchise ? 'Franchise Dispatcher' : order.customerName}...`
    );
  };

  const handleNavigate = () => {
    onNavigateToPickup(order);
  };

  const handleAcceptNewOrder = () => {
    setShowNewOrderPopup(false);
    showCustomDialog(
      'Order Accepted',
      'You have accepted order #RD-7822 for Sarah Jenkins. Navigation updated to pickup location.',
      () => {
        onAcceptNewOrder?.();
      }
    );
  };

  // Custom Success Dialog Alert Modal states (for theme alignment)
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState('');
  const [dialogDesc, setDialogDesc] = React.useState('');
  const [dialogOnClose, setDialogOnClose] = React.useState<(() => void) | undefined>(undefined);

  const showCustomDialog = (title: string, desc: string, onClose?: () => void) => {
    setDialogTitle(title);
    setDialogDesc(desc);
    setDialogOnClose(() => onClose);
    setDialogVisible(true);
  };

  // Interpolate SVG dash offset from 0 (circumference) to circumference (fully empty)
  const strokeDashoffset = timerStrokeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  // ----------------------------------------------------
  // TRANSIT-TO-FRANCHISE MODE LAYOUT
  // ----------------------------------------------------
  if (isTransitToFranchise) {
    // Custom header with "En Route" stacked label + Avatar
    const customHeaderRight = (
      <View style={styles.customHeaderRight}>
        <View style={styles.headerTextCol}>
          <Text style={styles.activeDutyText}>Active Duty</Text>
          <Text style={styles.enRouteText}>En Route</Text>
        </View>
        <Image
          source={{ uri: order.driverAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
          style={styles.headerAvatar}
        />
      </View>
    );

    // Calculate line width dynamically
    const progressWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View style={styles.container}>
        {/* 1. Header Section */}
        <Header
          title="Dispatch"
          showBack={true}
          onBackPress={onBack}
          rightCustom={customHeaderRight}
        />

        {/* 2. Map Section with Floating Overlay Indicators */}
        <View style={styles.mapContainer}>
          {/* Map background image */}
          <Image
            source={require('../../../assets/images/map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />

          {/* Styled purple route overlay paths */}
          <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {/* Route Line */}
            <Path
              d="M 70 480 L 130 520 L 220 540 L 320 460"
              stroke="#8664EC"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.8"
            />
            {/* Start Node */}
            <Circle cx="70" cy="480" r="7" fill="#8664EC" stroke="#FFFFFF" strokeWidth="2" />
            {/* End Node */}
            <Circle cx="320" cy="460" r="7" fill="#8664EC" stroke="#FFFFFF" strokeWidth="2" />
          </Svg>

          {/* Floating Pill Cards */}
          {/* ETA Card */}
          <View style={[styles.floatingPill, { left: 16 }]}>
            <View style={styles.floatingPillIconCircle}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Circle cx="12" cy="12" r="10" />
                <Path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
            <View>
              <Text style={styles.floatingPillLabel}>ETA</Text>
              <Text style={styles.floatingPillVal}>12 mins</Text>
            </View>
          </View>

          {/* Distance Card */}
          <View style={[styles.floatingPill, { right: 16 }]}>
            <View style={styles.floatingPillIconCircle}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                <Circle cx="12" cy="10" r="3" />
              </Svg>
            </View>
            <View>
              <Text style={styles.floatingPillLabel}>DISTANCE</Text>
              <Text style={styles.floatingPillVal}>2.4 km</Text>
            </View>
          </View>
        </View>

        {/* 3. Bottom Sheet Overlay Card */}
        <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 16 }]}>
          {/* Horizontal Grab Bar indicator */}
          <View style={styles.grabBar} />

          {/* Details & Contacts row */}
          <View style={styles.detailsRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.titleBadgeRow}>
                <Text style={styles.sheetTitleText}>Franchise Central</Text>
                <View style={styles.premiumBadge}>
                  <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                </View>
              </View>
              <Text style={styles.sheetSubtitleText}>
                Order #{order.orderNumber} • 12 Items
              </Text>
            </View>

            {/* Contacts Buttons Row */}
            <View style={styles.contactsBoxRow}>
              <TouchableOpacity
                style={styles.contactCircleBtn}
                onPress={handleCall}
                activeOpacity={0.7}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </Svg>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactCircleBtn, { marginLeft: 10 }]}
                onPress={handleMessage}
                activeOpacity={0.7}
              >
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. Animated Progress Timeline Track */}
          <View style={styles.timelineContainer}>
            {/* The Background Line Track */}
            <View style={styles.timelineTrackBg}>
              <Animated.View style={[styles.timelineTrackFill, { width: progressWidth }]} />
            </View>

            {/* Nodes Container */}
            <View style={styles.nodesContainer}>
              {/* Node 1: Pickup (Checked tick) */}
              <View style={styles.nodeItem}>
                <View style={styles.nodeCircleChecked}>
                  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                    <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>
                <Text style={[styles.nodeText, { color: '#8664EC', fontFamily: theme.typography.fontFamily.bold, fontWeight: 'bold' }]}>
                  Pickup
                </Text>
              </View>

              {/* Node 2: In Transit (Pulsing Concentric Circle) */}
              <View style={styles.nodeItem}>
                <View style={styles.nodeWrapper}>
                  {/* Concentric Pulse Scale Ring */}
                  <Animated.View
                    style={[
                      styles.nodeConcentricRing,
                      { transform: [{ scale: pulseAnim }] },
                    ]}
                  />
                  <View style={styles.nodeCircleTransit} />
                </View>
                <Text style={[styles.nodeText, { color: '#8664EC', fontFamily: theme.typography.fontFamily.bold, fontWeight: 'bold' }]}>
                  In Transit
                </Text>
              </View>

              {/* Node 3: Delivered (Inactive Gray) */}
              <View style={styles.nodeItem}>
                <View style={styles.nodeCircleInactive} />
                <Text style={styles.nodeText}>Delivered</Text>
              </View>
            </View>
          </View>

          {/* 5. Dispatch Action Buttons */}
          <TouchableOpacity
            style={styles.continueSubmitBtn}
            onPress={handleNavigate}
            activeOpacity={0.8}
          >
            <Text style={styles.continueSubmitText}>Continue</Text>
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" style={{ marginLeft: 6 }}>
              <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
              <Circle cx="12" cy="10" r="3" />
            </Svg>
          </TouchableOpacity>

          <Text style={styles.bottomCaptionPrompt}>
            Arrived? Tap the button above to update dispatcher
          </Text>
        </View>

        {/* 6. SLIDE UP OVERLAY: NEW ORDER ASSIGNED POPUP */}
        {showNewOrderPopup && (
          <View style={StyleSheet.absoluteFillObject}>
            {/* Dim Backdrop behind popup but under Header */}
            <View style={[styles.dimOverlay, { top: insets.top + 50 }]} />

            {/* Sliding Panel */}
            <Animated.View
              style={[
                styles.slidingOrderPanel,
                {
                  transform: [
                    { translateY: slideUpAnim },
                    { translateX: shakeAnim },
                  ],
                  bottom: 0,
                },
              ]}
            >
              <View style={styles.grabBar} />

              <View style={styles.newOrderHeader}>
                <Text style={styles.newOrderTitle}>
                  🚨 New Order Assigned
                </Text>
                <Text style={styles.newOrderSubtitle}>
                  PLEASE RESPOND WITHIN 60 SECONDS{'\n'}otherwise it will auto assign
                </Text>
              </View>

              {/* Circular SVG Timer Animation */}
              <View style={styles.circularTimerContainer}>
                <Svg width="110" height="110" viewBox="0 0 100 100">
                  {/* Background Track Ring */}
                  <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#EFE8FF"
                    strokeWidth="5"
                    fill="none"
                  />
                  {/* Animated Progress Ring */}
                  <AnimatedCircle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#8664EC"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </Svg>
                <View style={styles.timerTextContainer}>
                  <Text style={styles.timerCountText}>{countdown} SEC</Text>
                </View>
              </View>

              {/* Details card list */}
              {/* Customer Row */}
              <View style={styles.whitePopupCard}>
                <View style={styles.userIconCircle}>
                  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                    <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <Circle cx="12" cy="7" r="4" />
                  </Svg>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.cardInfoLabel}>Customer</Text>
                  <Text style={styles.cardInfoVal}>Sarah Jenkins</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.cardRightLabel}>Premium</Text>
                  <Text style={styles.cardRightVal}>★ 4.9</Text>
                </View>
              </View>

              {/* Locations Row */}
              <View style={styles.whitePopupCardColumn}>
                <View style={styles.locNodeRow}>
                  <View style={styles.locDotCirclePurple} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.locLabelText}>Pickup</Text>
                    <Text style={styles.locValText}>Rinzo Central Hub</Text>
                  </View>
                </View>
                <View style={styles.dottedLineConnect} />
                <View style={styles.locNodeRow}>
                  <View style={styles.locRingCirclePurple} />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.locLabelText}>Drop-off</Text>
                    <Text style={styles.locValText}>North Hills Residential</Text>
                  </View>
                </View>
              </View>

              {/* Grid block info */}
              <View style={styles.gridInfoRow}>
                <View style={styles.gridInfoCardLeft}>
                  <Text style={styles.gridLabelText}>Distance</Text>
                  <Text style={styles.gridValueText}>4.2 km</Text>
                  <Text style={[styles.gridLabelText, { marginTop: 8 }]}>Est. Time</Text>
                  <Text style={styles.gridValueText}>12 mins</Text>
                </View>

                {/* Map thumbnail live preview */}
                <View style={styles.gridInfoCardRight}>
                  <Image
                    source={require('../../../assets/images/map.png')}
                    style={styles.miniMapImage}
                    resizeMode="cover"
                  />
                  <Svg style={StyleSheet.absoluteFillObject}>
                    {/* Glowing neon paths route */}
                    <Path
                      d="M 20 20 L 70 50 L 90 90"
                      stroke="#8664EC"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Pulse point */}
                    <Circle cx="90" cy="90" r="4" fill="#8664EC" />
                  </Svg>
                  <View style={styles.livePreviewBadge}>
                    <Text style={styles.livePreviewText}>LIVE PREVIEW</Text>
                  </View>
                </View>
              </View>

              {/* Accept Order Action Button */}
              <TouchableOpacity
                style={styles.acceptOrderBtn}
                onPress={handleAcceptNewOrder}
                activeOpacity={0.8}
              >
                <View style={styles.checkIconWhiteCircle}>
                  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="4">
                    <Path d="M20 6L9 17l-5-5" />
                  </Svg>
                </View>
                <Text style={styles.acceptOrderBtnText}>Accept Order</Text>
              </TouchableOpacity>

              <Text style={styles.declinesNoticeText}>
                Your performance score is impacted by declines.
              </Text>
            </Animated.View>
          </View>
        )}

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
  }

  // ----------------------------------------------------
  // BASE MODE LAYOUT (EN ROUTE TO PICKUP POINT)
  // ----------------------------------------------------
  const liveBadge = (
    <View style={styles.liveBadge}>
      <Svg width="8" height="8" viewBox="0 0 24 24" fill="none" style={{ marginRight: 2 }}>
        <Circle cx="12" cy="12" r="10" fill="#8664EC" />
      </Svg>
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

        <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
          {/* Route path to customer pickup point */}
          <Path
            d="M 120 540 Q 240 380 300 240"
            stroke="#8664EC"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.8"
          />
          <Circle cx="300" cy="240" r="6" fill="#8664EC" stroke="#FFFFFF" strokeWidth="2" />
        </Svg>

        {/* Floating Cards Container */}
        <View style={styles.floatingCardsContainer}>
          {showAcceptedBanner && (
            <View style={styles.acceptedBannerCard}>
              <View style={styles.bannerIconCircle}>
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                  <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.bannerTitleText}>Order Accepted</Text>
                <Text style={styles.bannerSubtext}>Navigation updated to pickup location.</Text>
              </View>
            </View>
          )}

          <View style={styles.popupLocationCard}>
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

// Create animated component for circle
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
    marginLeft: 4,
  },
  customHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextCol: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  activeDutyText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  enRouteText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: '#8664EC',
    fontWeight: 'bold',
    lineHeight: 14,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  floatingPill: {
    position: 'absolute',
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
    zIndex: 10,
  },
  floatingPillIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  floatingPillLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
  },
  floatingPillVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: theme.colors.textDark,
    fontWeight: 'bold',
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
  grabBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  sheetTitleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  premiumBadge: {
    backgroundColor: '#8664EC',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 6,
  },
  premiumBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sheetSubtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
  },
  contactsBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FCFCFE',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  timelineContainer: {
    position: 'relative',
    height: 54,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 18,
  },
  timelineTrackBg: {
    position: 'absolute',
    top: 15,
    left: width * 0.1,
    right: width * 0.1,
    height: 3,
    backgroundColor: '#E5E7EB',
    borderRadius: 1.5,
  },
  timelineTrackFill: {
    height: '100%',
    backgroundColor: '#8664EC',
    borderRadius: 1.5,
  },
  nodesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  nodeItem: {
    alignItems: 'center',
    width: width * 0.22,
  },
  nodeCircleChecked: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...theme.shadows.small,
  },
  nodeWrapper: {
    position: 'relative',
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  nodeConcentricRing: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5EFFF',
    borderWidth: 1,
    borderColor: '#8664EC',
    opacity: 0.8,
  },
  nodeCircleTransit: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#8664EC',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...theme.shadows.small,
  },
  nodeCircleInactive: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E5E7EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 10,
    ...theme.shadows.small,
  },
  nodeText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
  },
  continueSubmitBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    width: '100%',
    ...theme.shadows.medium,
  },
  continueSubmitText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  bottomCaptionPrompt: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    textAlign: 'center',
    marginBottom: 4,
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
  dimOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 15,
  },
  slidingOrderPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height * 0.85,
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#DCD0FF',
    zIndex: 20,
  },
  newOrderHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  newOrderTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
    textAlign: 'center',
  },
  newOrderSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 15,
  },
  circularTimerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 120,
    marginBottom: 16,
  },
  timerTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCountText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  whitePopupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
  },
  whitePopupCardColumn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
  },
  userIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfoLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
  },
  cardInfoVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  cardRightLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    textAlign: 'right',
  },
  cardRightVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    textAlign: 'right',
  },
  locNodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locDotCirclePurple: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8664EC',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    ...theme.shadows.small,
  },
  locRingCirclePurple: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8664EC',
    backgroundColor: '#FFFFFF',
    ...theme.shadows.small,
  },
  locLabelText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
  },
  locValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  dottedLineConnect: {
    width: 1,
    height: 14,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#AEAEB2',
    marginLeft: 4,
    marginVertical: 2,
  },
  gridInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  gridInfoCardLeft: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
  },
  gridInfoCardRight: {
    width: '48%',
    height: 105,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
  },
  gridLabelText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
  },
  gridValueText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  livePreviewBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  livePreviewText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 7,
    fontWeight: 'bold',
    color: '#130F26',
  },
  acceptOrderBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    ...theme.shadows.medium,
  },
  checkIconWhiteCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  acceptOrderBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
  },
  declinesNoticeText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
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
  miniMapImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.65, // faded to keep route path contrast high
  },
  floatingCardsContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  acceptedBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8664EC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    ...theme.shadows.medium,
  },
  bannerIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bannerSubtext: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10.5,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 1,
  },
  popupLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.medium,
  },
});

export default OrderTransitScreen;
