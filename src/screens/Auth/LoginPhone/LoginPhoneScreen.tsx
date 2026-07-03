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
import { CustomInput } from '../../../components/common/CustomInput';

const s = (size: number) => moderateScale(size, 0.3);

// Custom country code prefix component with India flag
const CountryPrefix = () => (
  <View style={styles.countryPrefixContainer}>
    <Text style={styles.flagEmoji}>🇮🇳</Text>
    <Text style={styles.countryCodeText}>+91</Text>
    <Svg width={s(10)} height={s(6)} viewBox="0 0 10 6" fill="none" style={styles.chevron}>
      <Path
        d="M1 1L5 5L9 1"
        stroke="#7C7985"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    <View style={styles.divider} />
  </View>
);

interface LoginPhoneScreenProps {
  onSendOTP?: (phoneNumber: string) => void;
  onNavigateToEmail?: () => void;
  onNavigateToSignUp?: () => void;
  onBack?: () => void;
}

export const LoginPhoneScreen: React.FC<LoginPhoneScreenProps> = ({
  onSendOTP,
  onNavigateToEmail,
  onNavigateToSignUp,
}) => {
  const [activeTab, setActiveTab] = useState<'otp' | 'email'>('otp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const keypadY = useRef(new Animated.Value(300)).current;
  const phoneInputRef = useRef<TextInput>(null);

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
        phoneInputRef.current?.blur();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isKeypadVisible]);

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/[^0-9]/g, '');
    if (cleaned.length === 0) {
      return 'Phone number is required';
    }
    if (cleaned.length !== 10) {
      return 'Please enter a valid 10-digit phone number';
    }
    return '';
  };

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);
    if (error) {
      setError(validatePhone(cleaned));
    }
  };

  const handleCustomKeyPress = (key: string) => {
    if (key === 'dismiss') {
      setIsKeypadVisible(false);
      phoneInputRef.current?.blur();
    } else if (key === 'backspace') {
      setPhoneNumber((prev) => prev.slice(0, -1));
    } else {
      if (phoneNumber.length < 10) {
        setPhoneNumber((prev) => prev + key);
      }
    }
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

  const handleSubmit = () => {
    setError('');
    if (onSendOTP) {
      onSendOTP(phoneNumber || '9876543210');
    }
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
        >
          {/* 1. Full Banner Header with Text Overlay */}
          <View style={styles.headerBannerContainer}>
            <Image
              source={require('../../../assets/images/rider.jpg')}
              style={styles.fullHeaderImage}
              resizeMode="contain"
            />

            {/* Overlay Text Column on Left */}
            <View style={styles.headerOverlayText}>
              <Image
                source={require('../../../assets/images/rinzo_wordmark.png')}
                style={styles.wordmarkImage}
                resizeMode="contain"
              />
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>
                Please enter your details to get started
              </Text>
            </View>
          </View>

          {/* 2. White Card Container */}
          <View style={[styles.card, isKeypadVisible && { marginBottom: s(16) }]}>
            {/* Login Toggle Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('otp')}
                style={[styles.tabBtn, activeTab === 'otp' && styles.activeTabBtn]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'otp' && styles.activeTabText,
                  ]}
                >
                  Login with OTP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setActiveTab('email');
                  if (onNavigateToEmail) onNavigateToEmail();
                }}
                style={[styles.tabBtn, activeTab === 'email' && styles.activeTabBtn]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'email' && styles.activeTabText,
                  ]}
                >
                  Login with Email
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <CustomInput
                ref={phoneInputRef}
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                error={error}
                prefix={<CountryPrefix />}
                showSoftInputOnFocus={false}
                onFocus={() => setIsKeypadVisible(true)}
              />
              <Text style={styles.helperText}>
                We’ll send you a 6-digit OTP to verify your number
              </Text>
            </View>

            {/* Submit Button */}
            <CustomButton
              title="Get OTP"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.getOtpBtn}
            />

            {/* 3. Or Divider */}
            <View style={styles.orDividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* 4. Footer Sign Up Link */}
            <TouchableOpacity
              onPress={onNavigateToSignUp}
              activeOpacity={0.7}
              style={styles.signUpRow}
            >
              <Text style={styles.noAccountText}>Don't have an account? </Text>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F5EEFD',
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
    justifyContent: 'center',
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
  headerOverlayText: {
    position: 'absolute',
    left: s(20),
    top: s(88),
    width: s(185),
  },
  wordmarkImage: {
    width: s(140),
    height: s(30),
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: s(14),
    padding: 0,
    marginBottom: s(36),
  },
  tabBtn: {
    flex: 1,
    paddingVertical: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(14),
  },
  activeTabBtn: {
    backgroundColor: '#6B46DF',
  },
  tabText: {
    fontFamily: fontFamily.medium,
    fontSize: s(13),
    fontWeight: theme.typography.fontWeight.medium,
    color: '#6B7280',
  },
  activeTabText: {
    fontFamily: fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  inputSection: {
    marginBottom: s(10),
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: s(15),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginBottom: s(8),
  },
  countryPrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: s(8),
  },
  flagEmoji: {
    fontSize: s(16),
    marginRight: s(4),
  },
  countryCodeText: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
  },
  chevron: {
    marginHorizontal: s(6),
  },
  divider: {
    width: 1,
    height: s(20),
    backgroundColor: '#E5E7EB',
    marginLeft: s(4),
    marginRight: s(4),
  },
  helperText: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    color: '#7C7985',
    marginTop: s(8),
    marginBottom: s(16),
  },
  getOtpBtn: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#6B46DF',
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: s(24),
    marginHorizontal: theme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontFamily: fontFamily.medium,
    fontSize: s(13),
    color: '#9CA3AF',
    marginHorizontal: s(12),
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: s(10),
    marginHorizontal: theme.spacing.md,
  },
  noAccountText: {
    fontFamily: fontFamily.regular,
    fontSize: s(14),
    color: '#7C7985',
  },
  signUpLink: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
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
});

export default LoginPhoneScreen;
