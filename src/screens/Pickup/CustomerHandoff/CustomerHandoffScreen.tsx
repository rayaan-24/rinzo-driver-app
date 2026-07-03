import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';

interface CustomerHandoffScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export const CustomerHandoffScreen: React.FC<CustomerHandoffScreenProps> = ({
  onBack,
  onConfirm,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Refs for OTP inputs auto-shifting focus
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
    // Only accept numeric inputs
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);
    setErrorMsg('');

    if (cleanText.length > 0 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const code = otp.join('');
    if (code.length < 4) {
      setErrorMsg('Please enter a complete 4-digit code.');
      return;
    }
    // Simulate valid OTP code
    setIsOtpVerified(true);
    setErrorMsg('');
  };

  // Custom Header Bell + Avatar Right Side
  const headerRightBlock = (
    <View style={styles.headerRightBlock}>
      <TouchableOpacity activeOpacity={0.7} style={styles.headerBell}>
        <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
          <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </Svg>
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
        style={styles.headerAvatar}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title="Rinzo"
        showBack={true}
        onBackPress={onBack}
        rightCustom={headerRightBlock}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Handoff Banner Image */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' }}
            style={styles.handoffImage}
            resizeMode="cover"
          />
          <View style={styles.secureHandoffBadge}>
            <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="3.5" style={{ marginRight: 4 }}>
              <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.secureHandoffText}>SECURE HANDOFF</Text>
          </View>
        </View>

        {/* 2. Customer Profile Details */}
        <View style={styles.customerCard}>
          <View style={styles.customerHeaderRow}>
            <View style={styles.avatarCircle}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <Circle cx="12" cy="7" r="4" />
              </Svg>
            </View>

            <View style={styles.customerInfoCol}>
              <View style={styles.customerTitleRow}>
                <Text style={styles.customerName}>Eleanor P. Shellstrop</Text>
                <View style={styles.vipBadge}>
                  <Text style={styles.vipText}>VIP</Text>
                </View>
              </View>
              <View style={styles.addressRow}>
                <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 4 }}>
                  <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                </Svg>
                <Text style={styles.addressText}>1069 Good Place Lane</Text>
              </View>
            </View>
          </View>

          {/* Package and Priority row capsules */}
          <View style={styles.capsuleRow}>
            <View style={styles.capsuleItem}>
              <Text style={styles.capsuleLabel}>PACKAGES</Text>
              <Text style={styles.capsuleValue}>03</Text>
            </View>
            <View style={styles.capsuleItem}>
              <Text style={styles.capsuleLabel}>PRIORITY</Text>
              <Text style={styles.capsuleValue}>High</Text>
            </View>
          </View>
        </View>

        {/* 3. Section 1: Verify Customer OTP */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>1</Text>
            </View>
            <Text style={styles.sectionTitle}>Verify Customer OTP</Text>
          </View>

          <Text style={styles.sectionSubtitle}>
            Please ask the customer for the 4-digit verification code sent to their mobile device.
          </Text>

          {/* OTP inputs row */}
          <View style={styles.otpRow}>
            {otp.map((val, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                style={[
                  styles.otpInput,
                  val.length > 0 && styles.otpInputFilled,
                  isOtpVerified && styles.otpInputDisabled,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={val}
                onChangeText={(text) => handleOtpChange(text, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                editable={!isOtpVerified}
                selectTextOnFocus
              />
            ))}
          </View>

          {errorMsg.length > 0 && <Text style={styles.errorText}>{errorMsg}</Text>}

          {/* Verify button */}
          <TouchableOpacity
            style={[styles.verifyBtn, isOtpVerified && styles.verifyBtnSuccess]}
            onPress={handleVerifyOtp}
            disabled={isOtpVerified}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyBtnText}>
              {isOtpVerified ? 'Code Verified' : 'Verify Code'}
            </Text>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" style={{ marginLeft: 6 }}>
              <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        </View>

        {/* 4. Section 2: Final Confirmation */}
        <View
          style={[
            styles.sectionCard,
            !isOtpVerified && styles.sectionDisabled,
          ]}
          pointerEvents={isOtpVerified ? 'auto' : 'none'}
        >
          <View style={styles.sectionHeader}>
            <View style={[styles.stepCircle, !isOtpVerified && styles.stepCircleDisabled]}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <Text style={[styles.sectionTitle, !isOtpVerified && styles.sectionTitleDisabled]}>
              Final Confirmation
            </Text>
          </View>

          {/* Total Bags row */}
          <View style={styles.confirmDataRow}>
            <Text style={styles.confirmDataLabel}>Total Bags Counted</Text>
            <Text style={styles.confirmDataValPurple}>03 Units</Text>
          </View>

          {/* Verification ID row */}
          <View style={styles.confirmDataRow}>
            <Text style={styles.confirmDataLabel}>Verification ID</Text>
            <Text style={styles.confirmDataValGrey}>LL-9928-XP</Text>
          </View>

          {/* Dashed garment bags info card */}
          <View style={styles.garmentCard}>
            <View style={styles.garmentIconCircle}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <Path d="M3 6h18M16 10a4 4 0 01-8 0" />
              </Svg>
            </View>
            <View style={styles.garmentTextCol}>
              <Text style={styles.garmentTitle}>Premium Garment Bags</Text>
              <Text style={styles.garmentSub}>Signature Velvet Finish</Text>
            </View>
          </View>

          {/* Final confirm action button */}
          <TouchableOpacity
            style={[styles.confirmBtn, !isOtpVerified && styles.confirmBtnDisabled]}
            disabled={!isOtpVerified}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text style={[styles.confirmBtnText, !isOtpVerified && styles.confirmBtnTextDisabled]}>
              Confirm Delivery
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  headerRightBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#EFE8FF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  imageCard: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F0F0F3',
    ...theme.shadows.small,
    marginBottom: 16,
  },
  handoffImage: {
    width: '100%',
    height: '100%',
  },
  secureHandoffBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
  },
  secureHandoffText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
    marginBottom: 16,
  },
  customerHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  customerInfoCol: {
    flex: 1,
  },
  customerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  customerName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginRight: 6,
  },
  vipBadge: {
    backgroundColor: '#F5EFFF',
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderWidth: 0.5,
    borderColor: '#D4C5FF',
  },
  vipText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  capsuleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  capsuleItem: {
    flex: 1,
    backgroundColor: '#FDFBFF',
    borderWidth: 1,
    borderColor: '#F3EFFF',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  capsuleLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 8,
    color: theme.colors.textMedium,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  capsuleValue: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
    marginBottom: 16,
  },
  sectionDisabled: {
    opacity: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepCircleDisabled: {
    backgroundColor: '#E5E7EB',
  },
  stepText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  sectionTitleDisabled: {
    color: '#8E8E93',
  },
  sectionSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    lineHeight: 16,
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  otpInput: {
    width: 50,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#F8F7FC',
    borderWidth: 1,
    borderColor: '#EFE8FF',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  otpInputFilled: {
    borderColor: '#8664EC',
    backgroundColor: '#FCFAFF',
  },
  otpInputDisabled: {
    borderColor: '#10B981',
    backgroundColor: '#F2FBF7',
    color: '#10B981',
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  verifyBtn: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  verifyBtnSuccess: {
    backgroundColor: '#10B981',
  },
  verifyBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
  },
  confirmDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F5F5F7',
  },
  confirmDataLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  confirmDataValPurple: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  confirmDataValGrey: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  garmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2D9FD',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 12,
    marginVertical: 14,
    backgroundColor: '#FCFAFF',
  },
  garmentIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  garmentTextCol: {
    flex: 1,
  },
  garmentTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  garmentSub: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
  },
  confirmBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  confirmBtnDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
  },
  confirmBtnTextDisabled: {
    color: '#9CA3AF',
  },
});

export default CustomerHandoffScreen;
