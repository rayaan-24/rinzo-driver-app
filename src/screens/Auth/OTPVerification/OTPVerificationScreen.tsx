import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
  Easing,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale, screenWidth } from '../../../utils/responsive';
import { CustomButton } from '../../../components/common/CustomButton';

const s = (size: number) => moderateScale(size, 0.3);

// Circular Back Button Icon
const BackCircleBtn = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={styles.backCircleBtn}
  >
    <Svg width={s(18)} height={s(18)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19L8 12L15 5"
        stroke="#1C1C1E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);

// Edit Pencil Icon
const EditPencilIcon = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.editPencilBtn}>
    <Svg width={s(16)} height={s(16)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
        stroke="#6B46DF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43739 22.1213 4.00001C22.1213 4.56263 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
        stroke="#6B46DF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);

// Phone Icon
const PhoneIcon = () => (
  <Svg width={s(18)} height={s(18)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5901 20.9046 21.733 20.6407 21.8213C20.3769 21.9096 20.0974 21.9414 19.82 21.91C16.7428 21.5756 13.787 20.5252 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.50999 10.243 2.45952 7.27719 2.12999 4.18C2.0988 3.9026 2.13036 3.62312 2.22262 3.35921C2.31488 3.0953 2.46579 2.85293 2.66579 2.64771C2.86579 2.44249 3.09458 2.27899 3.34977 2.16738C3.60496 2.05577 3.88056 1.99859 4.15999 2H7.15999C7.64414 1.99525 8.11327 2.16709 8.48046 2.48421C8.84766 2.80133 9.08862 3.24233 9.15999 3.73C9.29302 4.74313 9.54084 5.73686 9.89999 6.69C10.0346 7.04505 10.0631 7.43161 9.98229 7.80287C9.90144 8.17413 9.71465 8.5147 9.43999 8.78L8.16999 10.05C9.58466 12.5386 11.6413 14.5953 14.13 16.01L15.4 14.74C15.6653 14.4653 16.0059 14.2786 16.3771 14.1977C16.7484 14.1169 17.1349 14.1454 17.49 14.28C18.4431 14.6392 19.4369 14.887 20.45 15.02C20.9431 15.0927 21.3888 15.3379 21.7067 15.7103C22.0246 16.0827 22.1947 16.5574 22.2 17.04L22 16.92Z"
      stroke="#6B46DF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Envelope Icon for Email change option
const MailIcon = () => (
  <Svg width={s(16)} height={s(16)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="#6B46DF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6l-10 7L2 6"
      stroke="#6B46DF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface OTPVerificationScreenProps {
  phoneNumber?: string;
  emailAddress?: string;
  verificationType?: 'phone' | 'email';
  onVerify?: (otp: string) => void;
  onChangePhone?: () => void;
  onResendOTP?: () => void;
  onBack?: () => void;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  phoneNumber = '+91 87777 34343',
  emailAddress = 'driver@rinzo.com',
  verificationType = 'phone',
  onVerify,
  onChangePhone,
  onResendOTP,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const keypadY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(keypadY, {
      toValue: isKeypadVisible ? 0 : 300,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isKeypadVisible]);

  useEffect(() => {
    const backAction = () => {
      if (isKeypadVisible) {
        setIsKeypadVisible(false);
        if (focusedIndex !== null) {
          inputRefs.current[focusedIndex]?.blur();
        }
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isKeypadVisible, focusedIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      // User pasted full OTP
      const pasted = cleaned.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      return;
    }

    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleCustomKeyPress = (key: string) => {
    if (key === 'dismiss') {
      setIsKeypadVisible(false);
      if (focusedIndex !== null) {
        inputRefs.current[focusedIndex]?.blur();
      }
      return;
    }

    const currentIdx = focusedIndex !== null ? focusedIndex : 0;
    const newOtp = [...otp];

    if (key === 'backspace') {
      if (otp[currentIdx] !== '') {
        newOtp[currentIdx] = '';
        setOtp(newOtp);
      } else if (currentIdx > 0) {
        newOtp[currentIdx - 1] = '';
        setOtp(newOtp);
        setFocusedIndex(currentIdx - 1);
        inputRefs.current[currentIdx - 1]?.focus();
      }
    } else {
      newOtp[currentIdx] = key;
      setOtp(newOtp);
      if (currentIdx < 5) {
        setFocusedIndex(currentIdx + 1);
        inputRefs.current[currentIdx + 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (onVerify) onVerify(code || '123456');
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const sSec = secs % 60;
    return `${m < 10 ? '0' : ''}${m} : ${sSec < 10 ? '0' : ''}${sSec}`;
  };

  const renderCustomKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['dismiss', '0', 'backspace'],
    ];

    return (
      <Animated.View
        pointerEvents={isKeypadVisible ? 'auto' : 'none'}
        style={[
          styles.keypadContainer,
          {
            transform: [{ translateY: keypadY }],
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99,
          },
        ]}
      >
        {keys.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.keypadRow}>
            {row.map((key, keyIdx) => {
              if (key === '') {
                return <View key={keyIdx} style={[styles.keypadKey, styles.keypadKeyEmpty]} />;
              }

              const isBackspace = key === 'backspace';
              const isDismiss = key === 'dismiss';

              return (
                <TouchableOpacity
                  key={keyIdx}
                  activeOpacity={0.6}
                  onPress={() => handleCustomKeyPress(key)}
                  style={[
                    styles.keypadKey,
                    (isBackspace || isDismiss) && styles.keypadKeyBackspace,
                  ]}
                >
                  {isBackspace ? (
                    <Svg width={s(24)} height={s(18)} viewBox="0 0 24 18" fill="none">
                      <Path
                        d="M21 2H9c-.7 0-1.3.4-1.7.9L2 9l5.3 6.1c.4.5 1 .9 1.7.9h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                        stroke="#1C1C1E"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <Path
                        d="M11 6l6 6M17 6l-6 6"
                        stroke="#1C1C1E"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </Svg>
                  ) : isDismiss ? (
                    <Svg width={s(24)} height={s(24)} viewBox="0 0 24 24" fill="none">
                      <Path
                        d="M18 15l-6 6-6-6M12 3v18"
                        stroke="#1C1C1E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Svg>
                  ) : (
                    <Text style={styles.keypadKeyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isKeypadVisible && { paddingBottom: s(280) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        >
          {/* Top Header Section */}
          <View style={styles.headerBannerContainer}>
            <Image
              source={require('../../../assets/images/rider.jpg')}
              style={styles.fullHeaderImage}
              resizeMode="contain"
            />

            {/* Back Button */}
            <View style={styles.topBackRow}>
              <BackCircleBtn onPress={onBack} />
            </View>

            {/* Header Text Overlay */}
            <View style={styles.headerOverlayText}>
              <Image
                source={require('../../../assets/images/rinzo_wordmark.png')}
                style={styles.wordmarkImage}
                resizeMode="contain"
              />
              <Text style={styles.welcomeTitle}>
                {verificationType === 'email' ? 'Verify Your' : 'Verify Your' + '\n' + 'Phone Number'}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {verificationType === 'email'
                  ? 'We\'ve sent a 6-digit\nverification code to'
                  : 'We\'ve sent a 6-digit verification code to'}
              </Text>
              <View style={styles.phoneRow}>
                <Text style={styles.phoneNumberText}>
                  {verificationType === 'email' ? emailAddress : phoneNumber}
                </Text>
                <EditPencilIcon onPress={onChangePhone} />
              </View>
            </View>
          </View>

          {/* White OTP Form Card */}
          <View style={[styles.card, isKeypadVisible && { marginBottom: s(16) }]}>
            {/* 6 OTP Boxes */}
            <View style={styles.otpBoxesRow}>
              {otp.map((digit, idx) => {
                const isFocused = focusedIndex === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={1}
                    onPress={() => inputRefs.current[idx]?.focus()}
                    style={[
                      styles.otpBox,
                      isFocused && styles.otpBoxFocused,
                      digit !== '' && styles.otpBoxFilled,
                    ]}
                  >
                    <TextInput
                      ref={(el) => {
                        inputRefs.current[idx] = el;
                      }}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, idx)}
                      onKeyPress={(e) => handleKeyPress(e, idx)}
                      onFocus={() => {
                        setFocusedIndex(idx);
                        setIsKeypadVisible(true);
                      }}
                      showSoftInputOnFocus={false}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={styles.otpInput}
                      caretHidden={true}
                    />
                    {isFocused && !digit && <View style={styles.blinkingCursor} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Expiry Countdown */}
            <Text style={styles.expiryText}>
              OTP expires in <Text style={styles.timerText}>{formatTimer(timer)}</Text>
            </Text>

            {/* Resend Divider */}
            <View style={styles.resendDividerRow}>
              <View style={styles.line} />
              <Text style={styles.resendDividerText}>Didn't receive OTP?</Text>
              <View style={styles.line} />
            </View>

            {/* Resend Button */}
            <TouchableOpacity
              onPress={onResendOTP}
              activeOpacity={0.7}
              style={styles.resendBtn}
            >
              <Text style={styles.resendIcon}>↻</Text>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>

            {/* Change contact detail box */}
            <TouchableOpacity
              onPress={onChangePhone}
              activeOpacity={0.8}
              style={styles.changePhoneBox}
            >
              <View style={styles.changePhoneLeft}>
                {verificationType === 'email' ? <MailIcon /> : <PhoneIcon />}
                <Text style={styles.changePhoneText}>
                  {verificationType === 'email' ? 'Change Email Address' : 'Change Phone Number'}
                </Text>
              </View>
              <Svg width={s(16)} height={s(16)} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M9 18L15 12L9 6"
                  stroke="#6B46DF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Verify OTP Action Button */}
            <CustomButton
              title="Verify OTP"
              onPress={handleVerify}
              loading={isLoading}
              disabled={false}
              style={styles.verifyBtn}
            />
          </View>
        </ScrollView>
        {renderCustomKeypad()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EAFD',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: theme.spacing.xl,
  },
  headerBannerContainer: {
    width: screenWidth,
    height: screenWidth * (857 / 1024),
    position: 'relative',
    overflow: 'hidden',
  },
  fullHeaderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  topBackRow: {
    position: 'absolute',
    left: s(16),
    top: s(16),
    zIndex: 10,
  },
  backCircleBtn: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerOverlayText: {
    position: 'absolute',
    left: s(20),
    top: s(88),
    width: s(190),
  },
  wordmarkImage: {
    width: s(130),
    height: s(28),
    marginLeft: 0,
  },
  welcomeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginTop: s(14),
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: s(13),
    color: '#6E6A80',
    marginTop: s(6),
    lineHeight: s(19),
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(4),
  },
  phoneNumberText: {
    fontFamily: fontFamily.bold,
    fontSize: s(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
    marginRight: s(6),
  },
  editPencilBtn: {
    padding: s(2),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    padding: s(20),
    marginTop: 0,
    marginHorizontal: theme.spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
  },
  otpBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(16),
    marginTop: s(4),
  },
  otpBox: {
    width: s(44),
    height: s(52),
    borderRadius: s(12),
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  otpBoxFocused: {
    borderColor: '#6B46DF',
    backgroundColor: '#FFFFFF',
  },
  otpBoxFilled: {
    borderColor: '#6B46DF',
    backgroundColor: '#FFFFFF',
  },
  otpInput: {
    fontSize: s(20),
    fontFamily: fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  blinkingCursor: {
    position: 'absolute',
    width: 2,
    height: s(20),
    backgroundColor: '#6B46DF',
  },
  expiryText: {
    fontFamily: fontFamily.regular,
    fontSize: s(13),
    color: '#7C7985',
    textAlign: 'center',
    marginBottom: s(20),
  },
  timerText: {
    fontFamily: fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
  },
  resendDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(12),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  resendDividerText: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    color: '#9CA3AF',
    marginHorizontal: s(10),
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(18),
  },
  resendIcon: {
    fontSize: s(16),
    color: '#6B46DF',
    marginRight: s(6),
  },
  resendText: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
  },
  changePhoneBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F0FC',
    borderRadius: s(14),
    paddingHorizontal: s(16),
    paddingVertical: s(14),
    marginBottom: s(20),
  },
  changePhoneLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhoneText: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
    marginLeft: s(10),
  },
  verifyBtn: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#6B46DF',
  },
  keypadContainer: {
    backgroundColor: '#EAECEF',
    borderTopLeftRadius: s(30),
    borderTopRightRadius: s(30),
    paddingHorizontal: s(16),
    paddingTop: s(20),
    paddingBottom: Platform.OS === 'ios' ? s(34) : s(16),
    width: '100%',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(10),
  },
  keypadKey: {
    flex: 1,
    height: s(50),
    backgroundColor: '#FFFFFF',
    borderRadius: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: s(6),
  },
  keypadKeyEmpty: {
    backgroundColor: 'transparent',
  },
  keypadKeyBackspace: {
    backgroundColor: 'transparent',
  },
  keypadKeyText: {
    fontFamily: fontFamily.medium,
    fontSize: s(22),
    fontWeight: '500',
    color: '#000000',
  },
  floatingBackRow: {
    paddingHorizontal: s(16),
    paddingTop: s(16),
    paddingBottom: s(0),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OTPVerificationScreen;
