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
import { authService } from '../../../services/auth/authService';

const s = (size: number) => moderateScale(size, 0.3);

// 1. Svg Mail Icon for input prefix
const MailIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(18) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6l-10 7L2 6"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 2. Svg Lock Icon for input prefix
const LockIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(18) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 3. Svg Eye Icons for password visibility suffix
const EyeIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(20) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeOffIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(20) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 1l22 22"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface LoginEmailScreenProps {
  onLoginSuccess?: (session: any) => void;
  onNavigateToPhone?: () => void;
  onNavigateToForgotPassword?: (email: string) => void;
  onNavigateToSignUp?: () => void;
}

export const LoginEmailScreen: React.FC<LoginEmailScreenProps> = ({
  onLoginSuccess,
  onNavigateToPhone,
  onNavigateToForgotPassword,
  onNavigateToSignUp,
}) => {
  const [activeTab, setActiveTab] = useState<'otp' | 'email'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text: string) => {
    if (!text.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (text: string) => {
    if (!text) {
      return 'Password is required';
    }
    if (text.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError(validateEmail(text));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError(validatePassword(text));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    if (onLoginSuccess) {
      onLoginSuccess({
        token: 'mock-token',
        driverId: 'drv_9901',
        name: 'Hannan Khan',
        email: email || 'driver@rinzo.com',
        phone: '9876543210',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
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
          {/* 1. Banner Header with Text Overlay */}
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
                Please enter your details{`\n`}to get started
              </Text>
            </View>
          </View>

          {/* 2. Overlapping Card */}
          <View style={styles.card}>
            {/* Toggle Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setActiveTab('otp');
                  if (onNavigateToPhone) onNavigateToPhone();
                }}
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
                onPress={() => setActiveTab('email')}
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

            {/* General Errors banner if any */}
            {generalError ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{generalError}</Text>
              </View>
            ) : null}

            {/* Email Field */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <CustomInput
                placeholder="developer@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={handleEmailChange}
                error={emailError}
                prefix={<MailIcon />}
              />
            </View>

            {/* Password Field */}
            <View style={styles.fieldSection}>
              <Text style={styles.fieldLabel}>Password</Text>
              <CustomInput
                placeholder="••••••••"
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                onChangeText={handlePasswordChange}
                error={passwordError}
                prefix={<LockIcon />}
                suffix={
                  <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    activeOpacity={0.7}
                    style={styles.eyeBtn}
                  >
                    {isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />}
                  </TouchableOpacity>
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onNavigateToForgotPassword?.(email)}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordLink}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <CustomButton
              title="Login"
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginBtn}
            />

            {/* Or Divider */}
            <View style={styles.orDividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Footer Sign Up Link */}
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
    padding: s(16),
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
    marginBottom: s(16),
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
  errorBanner: {
    backgroundColor: theme.colors.errorLight,
    padding: s(10),
    borderRadius: theme.borderRadius.sm,
    marginBottom: s(12),
  },
  errorBannerText: {
    fontFamily: fontFamily.medium,
    fontSize: s(13),
    color: theme.colors.error,
    textAlign: 'center',
  },
  fieldSection: {
    marginBottom: s(8),
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginBottom: s(6),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: s(2),
  },
  forgotPasswordLink: {
    fontFamily: fontFamily.medium,
    fontSize: s(12),
    color: '#6B46DF',
  },
  eyeBtn: {
    padding: s(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    width: '100%',
    height: s(48),
    borderRadius: s(16),
    backgroundColor: '#6B46DF',
    marginTop: s(8),
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: s(12),
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
});

export default LoginEmailScreen;
