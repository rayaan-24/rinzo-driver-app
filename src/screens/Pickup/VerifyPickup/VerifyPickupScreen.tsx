import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface VerifyPickupScreenProps {
  order: Order;
  onBack: () => void;
  onConfirm: () => void;
}

export const VerifyPickupScreen: React.FC<VerifyPickupScreenProps> = ({
  order,
  onBack,
  onConfirm,
}) => {
  const [otp, setOtp] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Settling timeout to let navigation finish before autofocusing keyboard
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    Alert.alert(
      'Calling Customer',
      `Connecting call to ${order.customerName} (${order.phoneNumber || '+1 (555) 019-2831'})...`,
      [{ text: 'OK' }]
    );
  };

  const handleVerify = () => {
    if (otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP code.', [
        { text: 'OK' },
      ]);
      return;
    }
    Alert.alert(
      'Pickup Verified',
      'OTP code matches successfully. Order is now active!',
      [{ text: 'OK', onPress: onConfirm }]
    );
  };

  const handleWrongNumber = () => {
    Alert.alert(
      'Wrong Number?',
      'Please contact support to update the customer phone number or send a new code.',
      [{ text: 'OK' }]
    );
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Section */}
      <Header
        title="Verify Pickup"
        showBack={true}
        onBackPress={onBack}
        rightCustom={
          <Image
            source={{ uri: order.customerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60' }}
            style={styles.headerAvatar}
          />
        }
      />

      <TouchableWithoutFeedback onPress={focusInput}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        {/* 2. Shield Padlock Graphic */}
        <View style={styles.graphicContainer}>
          <View style={styles.outerCircle}>
            <View style={styles.innerShieldCard}>
              <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  fill="#FFFFFF"
                  opacity="0.2"
                />
                <Path
                  d="M12 2s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Rect x="8" y="11" width="8" height="6" rx="1.5" fill="#FFFFFF" />
                <Path
                  d="M10 11V8.5a2 2 0 114 0V11"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </View>
        </View>

        {/* 3. Text Prompts */}
        <Text style={styles.titleText}>OTP Verification</Text>
        <Text style={styles.subtitleText}>
          Enter the 4-digit code sent to the customer
        </Text>

        {/* 4. OTP Inputs Section with absolute overlay input to capture native touches */}
        <View style={styles.otpContainer}>
          <View style={styles.otpInputsRow} pointerEvents="none">
            {Array.from({ length: 4 }).map((_, i) => {
              const digit = otp[i] || '';
              const isActive = otp.length === i || (otp.length === 4 && i === 3);
              return (
                <View
                  key={i}
                  style={[
                    styles.otpBox,
                    isActive && styles.otpBoxActive,
                  ]}
                >
                  <Text style={styles.otpDigitText}>{digit}</Text>
                </View>
              );
            })}
          </View>

          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={4}
            style={styles.absoluteInput}
            caretHidden
            selectionColor="transparent"
          />
        </View>

        {/* 5. Summary Info Cards */}
        {/* Card 1: Customer */}
        <View style={styles.infoCard}>
          <View style={styles.cardIconBox}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2">
              <Circle cx="12" cy="8" r="4" />
              <Path d="M5.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" strokeLinecap="round" />
            </Svg>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.cardLabel}>Customer</Text>
            <Text style={styles.cardValue}>{order.customerName}</Text>
          </View>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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

        {/* Card 2: Order ID */}
        <View style={styles.infoCard}>
          <View style={[styles.cardIconBox, { backgroundColor: '#FFF7E6' }]}>
            <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
              <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <Path d="M5 8h14" />
              <Circle cx="12" cy="15" r="4" />
            </Svg>
          </View>
          <View style={styles.cardDetails}>
            <View style={styles.orderLabelRow}>
              <Text style={styles.cardLabel}>Order ID</Text>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>PREMIUM</Text>
              </View>
            </View>
            <Text style={styles.cardValue}>{order.orderNumber}</Text>
          </View>
        </View>

        {/* 6. Verify Button & Trigger Links */}
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyBtnText}>Verify Pickup</Text>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
            <Path
              d="M22 11.08V12a10 10 0 11-5.93-9.14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleWrongNumber} activeOpacity={0.7}>
          <Text style={styles.wrongNumberText}>Wrong Number?</Text>
        </TouchableOpacity>

        {/* Bottom Warning Alert */}
        <View style={styles.warningContainer}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
            <Circle cx="12" cy="12" r="10" />
            <Path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          </Svg>
          <Text style={styles.warningText}>
            Order cannot proceed until OTP is verified.
          </Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFE',
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
  innerShieldCard: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
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
  otpInputsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  otpBoxActive: {
    borderColor: '#8664EC',
    backgroundColor: '#F5F0FF',
    borderWidth: 2,
  },
  otpDigitText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  otpContainer: {
    position: 'relative',
    width: 240,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  absoluteInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.01,
    color: 'transparent',
    backgroundColor: 'transparent',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F3',
    ...theme.shadows.small,
  },
  cardIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetails: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  cardLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  cardValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  callBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: '#8664EC',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 6,
    marginLeft: 6,
  },
  premiumBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.cardBg,
  },
  verifyBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: theme.spacing.md,
    width: '100%',
    ...theme.shadows.medium,
  },
  verifyBtnText: {
    color: theme.colors.cardBg,
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 6,
  },
  wrongNumberText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 36,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  warningText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: '#DC2626',
    marginLeft: 6,
    textAlign: 'center',
  },
});
export default VerifyPickupScreen;
