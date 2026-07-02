import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
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

  const handleSubmit = () => {
    const validationError = validatePhone(phoneNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSendOTP) {
        onSendOTP(phoneNumber);
      }
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Full Banner Header with Text Overlay */}
          <View style={styles.headerBannerContainer}>
            {/* Background Illustration Asset containing leaves, city, clouds, pin & scooter courier */}
            <Image
              source={require('../../../assets/images/login_full_header.jpg')}
              style={styles.fullHeaderImage}
              resizeMode="cover"
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
          <View style={styles.card}>
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
                placeholder="Enter your phone number"
                keyboardType="number-pad"
                maxLength={10}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                error={error}
                prefix={<CountryPrefix />}
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
          </View>

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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
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
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  headerBannerContainer: {
    width: screenWidth - theme.spacing.md * 2,
    height: s(240),
    position: 'relative',
    justifyContent: 'center',
    marginTop: s(10),
    overflow: 'hidden',
    borderRadius: s(16),
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
    left: s(12),
    top: s(20),
    width: s(185),
  },
  wordmarkImage: {
    width: s(140),
    height: s(30),
    marginLeft: -s(6),
  },
  welcomeTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginTop: s(14),
  },
  welcomeSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: s(13),
    color: '#6E6A80',
    marginTop: s(6),
    lineHeight: s(19),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    padding: s(20),
    marginTop: -s(10),
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
    padding: s(4),
    marginBottom: s(20),
  },
  tabBtn: {
    flex: 1,
    paddingVertical: s(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(10),
  },
  activeTabBtn: {
    backgroundColor: '#6B46DF',
  },
  tabText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: s(13),
    fontWeight: theme.typography.fontWeight.medium,
    color: '#6B7280',
  },
  activeTabText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  inputSection: {
    marginBottom: s(10),
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamily.bold,
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
    fontFamily: theme.typography.fontFamily.bold,
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
    fontFamily: theme.typography.fontFamily.regular,
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
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: s(13),
    color: '#9CA3AF',
    marginHorizontal: s(12),
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: s(10),
  },
  noAccountText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: s(14),
    color: '#7C7985',
  },
  signUpLink: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
  },
});

export default LoginPhoneScreen;
