import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale, screenWidth } from '../../../utils/responsive';
import { CustomInput } from '../../../components/common/CustomInput';

const s = (size: number) => moderateScale(size, 0.3);

// 1. User Icon for Full Name prefix
const UserIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(18) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 004-4 4 4 0 00-4-4 4 4 0 00-4 4 4 4 0 004 4z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 2. Phone Icon
const PhoneIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(16) }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// 3. Envelope Icon for Email prefix
const MailIcon: React.FC<{ color?: string; size?: number }> = ({ color = '#6B46DF', size = s(16) }) => (
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

// 4. Lock SVG Icon for prefix
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

// 5. Svg Eye Icons for password visibility suffix
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

// 6. Custom Back Circle Button
const BackCircleBtn: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.backCircleBtn}>
    <Svg width={s(20)} height={s(20)} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke="#1C1C1E"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);

// 7. Checkbox component
const CheckBoxIcon: React.FC<{ checked: boolean; onPress?: () => void }> = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.checkboxContainer}>
    <Svg width={s(20)} height={s(20)} viewBox="0 0 24 24" fill="none">
      {checked ? (
        <>
          <Path
            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
            fill="#6B46DF"
          />
          <Path
            d="M7 12l3 3 7-7"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <Path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          stroke="#6B46DF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </Svg>
  </TouchableOpacity>
);

// Custom prefix with dropdown for phone number
const PhonePrefix = () => (
  <View style={styles.phonePrefixContainer}>
    <PhoneIcon />
    <Text style={styles.phoneCodeText}>+91</Text>
    <Svg width={s(8)} height={s(8)} viewBox="0 0 24 24" fill="none" style={styles.dropdownChevron}>
      <Path d="M6 9l6 6 6-6" stroke="#6E6A80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
    <View style={styles.phonePrefixDivider} />
  </View>
);

interface SignupScreenProps {
  onSignUpSuccess?: () => void;
  onBack?: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSignUpSuccess,
  onBack,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle hardware back dismiss
  useEffect(() => {
    const backAction = () => {
      if (onBack) {
        onBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onBack]);

  const handleCreateAccount = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onSignUpSuccess) {
        onSignUpSuccess();
      }
    }, 500); // direct navigation for prototype testing
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
          {/* Header Banner Section */}
          <View style={styles.headerBannerContainer}>
            <Image
              source={require('../../../assets/images/signup_rider.jpg')}
              style={styles.fullHeaderImage}
              resizeMode="contain"
            />

            {/* Back Circular Button */}
            <View style={styles.topBackRow}>
              <BackCircleBtn onPress={onBack} />
            </View>

            {/* Header Text Overlay */}
            <View style={styles.headerOverlayText}>
              <Text style={styles.welcomeTitle}>Create Your</Text>
              <Text style={[styles.welcomeTitle, { color: '#6B46DF' }]}>Account</Text>
              <Text style={styles.welcomeSubtitle}>
                Sign up to start delivering{'\n'}and earn with Rinzo.
              </Text>
            </View>
          </View>

          {/* White Card Container */}
          <View style={styles.card}>
            {/* Full Name input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <CustomInput
                placeholder="Enter your full name"
                autoCapitalize="words"
                value={fullName}
                onChangeText={setFullName}
                prefix={<UserIcon />}
                inputContainerStyle={styles.customInputContainer}
              />
            </View>

            {/* Phone Number input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <CustomInput
                placeholder="Enter your phone number"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                prefix={<PhonePrefix />}
                inputContainerStyle={styles.customInputContainer}
              />
            </View>

            {/* Email Address input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <CustomInput
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={emailAddress}
                onChangeText={setEmailAddress}
                prefix={<MailIcon />}
                inputContainerStyle={styles.customInputContainer}
              />
            </View>

            {/* Password input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Password</Text>
              <CustomInput
                placeholder="Create a password"
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                prefix={<LockIcon />}
                suffix={
                  <TouchableOpacity
                    onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                    activeOpacity={0.7}
                    style={styles.eyeBtn}
                  >
                    {isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />}
                  </TouchableOpacity>
                }
                inputContainerStyle={styles.customInputContainer}
              />
            </View>

            {/* Confirm Password input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Confirm Password</Text>
              <CustomInput
                placeholder="Confirm your password"
                secureTextEntry={isConfirmPasswordHidden}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                prefix={<LockIcon />}
                suffix={
                  <TouchableOpacity
                    onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                    activeOpacity={0.7}
                    style={styles.eyeBtn}
                  >
                    {isConfirmPasswordHidden ? <EyeOffIcon /> : <EyeIcon />}
                  </TouchableOpacity>
                }
                inputContainerStyle={styles.customInputContainer}
              />
            </View>

            {/* Checkbox agreement row */}
            <View style={styles.agreementRow}>
              <CheckBoxIcon
                checked={agreeChecked}
                onPress={() => setAgreeChecked(!agreeChecked)}
              />
              <Text style={styles.agreementText}>
                I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and{' '}
                <Text style={styles.linkText}>Privacy Policy</Text>
              </Text>
            </View>
          </View>

          {/* Action Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleCreateAccount}
              activeOpacity={0.8}
              style={styles.createBtn}
            >
              {isLoading ? (
                <Text style={styles.btnText}>Loading...</Text>
              ) : (
                <>
                  <Text style={styles.btnText}>Create Account</Text>
                  <Svg width={s(20)} height={s(20)} viewBox="0 0 24 24" fill="none" style={styles.btnIcon}>
                    <Path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Navigation Link */}
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.7}
            style={styles.footerLinkRow}
          >
            <Text style={styles.footerNoAccountText}>Already have an account? </Text>
            <Text style={styles.footerLinkText}>Login</Text>
          </TouchableOpacity>
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
    backgroundColor: '#ede7fbff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: s(36),
  },
  headerBannerContainer: {
    width: screenWidth,
    height: screenWidth * (910 / 1024),
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
  topBackRow: {
    position: 'absolute',
    top: s(16),
    left: s(16),
    zIndex: 10,
  },
  backCircleBtn: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerOverlayText: {
    position: 'absolute',
    top: s(72),
    left: s(24),
    width: '48%',
  },
  welcomeTitle: {
    fontFamily: fontFamily.bold,
    fontSize: s(22),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginTop: s(2),
  },
  welcomeSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    color: '#6E6A80',
    marginTop: s(4),
    lineHeight: s(17),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(24),
    padding: s(16),
    marginTop: s(-24),
    marginHorizontal: theme.spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
  },
  inputSection: {
    marginBottom: s(12),
  },
  fieldLabel: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginTop: s(-4),
    marginBottom: s(6),
    marginLeft: s(4),
  },
  eyeBtn: {
    padding: s(4),
  },
  customInputContainer: {
    backgroundColor: '#F6F0FC',
    borderColor: '#EADFF7',
    borderWidth: 1.5,
  },
  phonePrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: s(4),
  },
  phoneCodeText: {
    fontFamily: fontFamily.medium,
    fontSize: s(14),
    color: '#1C1C1E',
    marginLeft: s(8),
  },
  dropdownChevron: {
    marginLeft: s(4),
    marginRight: s(8),
  },
  phonePrefixDivider: {
    width: 1,
    height: s(20),
    backgroundColor: '#E5E7EB',
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(12),
    marginBottom: s(4),
    paddingHorizontal: s(4),
  },
  checkboxContainer: {
    marginRight: s(10),
  },
  agreementText: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: s(11),
    color: '#6E6A80',
    lineHeight: s(16),
  },
  linkText: {
    fontFamily: fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
  },
  actionRow: {
    marginTop: s(20),
    marginHorizontal: theme.spacing.md,
  },
  createBtn: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#6B46DF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: fontFamily.bold,
    fontSize: s(15),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  btnIcon: {
    marginLeft: s(8),
  },
  footerLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: s(20),
    paddingBottom: s(20),
  },
  footerNoAccountText: {
    fontFamily: fontFamily.regular,
    fontSize: s(13),
    color: '#6E6A80',
  },
  footerLinkText: {
    fontFamily: fontFamily.bold,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#6B46DF',
    fontSize: s(13),
  },
});

export default SignupScreen;
