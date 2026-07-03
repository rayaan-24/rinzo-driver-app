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
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale, screenWidth } from '../../../utils/responsive';
import { CustomButton } from '../../../components/common/CustomButton';
import { CustomInput } from '../../../components/common/CustomInput';

const s = (size: number) => moderateScale(size, 0.3);

// 1. Lock SVG Icon for prefix
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

// 2. Svg Eye Icons for password visibility suffix
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

// 3. Back Circle Button
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

// 4. Checklist pill checkbox component
const CheckIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <Svg width={s(16)} height={s(16)} viewBox="0 0 24 24" fill="none">
    {checked ? (
      <>
        <Path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          fill="#6B46DF"
        />
        <Path
          d="M7.5 12l3 3 6-6"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <Path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="#E5E7EB"
          strokeWidth="2"
        />
        <Path
          d="M7.5 12l3 3 6-6"
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </Svg>
);

interface CreateNewPasswordScreenProps {
  onResetSuccess?: () => void;
  onBack?: () => void;
}

export const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  onResetSuccess,
  onBack,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Requirement Validations
  const hasEightChars = newPassword.length >= 8;
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const hasMixedCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);

  const satisfiedCount = [hasEightChars, hasNumber, hasSpecialChar, hasMixedCase].filter(Boolean).length;

  let strengthLabel = 'Weak';
  let strengthColor = '#EF4444'; // Red
  let strengthProgress = 0.25;

  if (newPassword.length === 0) {
    strengthLabel = 'Weak';
    strengthColor = '#E5E7EB';
    strengthProgress = 0.05;
  } else if (satisfiedCount === 2) {
    strengthLabel = 'Medium';
    strengthColor = '#F59E0B'; // Orange
    strengthProgress = 0.5;
  } else if (satisfiedCount === 3) {
    strengthLabel = 'Good';
    strengthColor = '#3B82F6'; // Blue
    strengthProgress = 0.75;
  } else if (satisfiedCount === 4) {
    strengthLabel = 'Strong';
    strengthColor = '#10B981'; // Green
    strengthProgress = 1.0;
  }

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

  const handleResetPassword = () => {
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onResetSuccess) {
        onResetSuccess();
      }
    }, 300);
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
          {/* Top Header Section with new Rider Banner */}
          <View style={styles.headerBannerContainer}>
            <Image
              source={require('../../../assets/images/create_password_rider.jpg')}
              style={styles.fullHeaderImage}
              resizeMode="contain"
            />

            {/* Back Circular Button */}
            <View style={styles.topBackRow}>
              <BackCircleBtn onPress={onBack} />
            </View>

            {/* Header Text Overlay */}
            <View style={styles.headerOverlayText}>
              <Text style={styles.welcomeTitle}>Create New</Text>
              <Text style={[styles.welcomeTitle, { color: '#6B46DF' }]}>Password</Text>
              <Text style={styles.welcomeSubtitle}>
                Your new password must be different from previous one.
              </Text>
            </View>
          </View>

          {/* White Card Container */}
          <View style={styles.card}>
            {/* New Password input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>New Password</Text>
              <CustomInput
                placeholder="Enter new password"
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                value={newPassword}
                onChangeText={setNewPassword}
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

            {/* Dynamic Password Strength Progress block */}
            <View style={styles.strengthBlock}>
              <View style={styles.strengthRow}>
                <Text style={styles.strengthText}>Password strength</Text>
                <Text style={[styles.strengthRating, { color: strengthColor }]}>{strengthLabel}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${strengthProgress * 100}%`,
                      backgroundColor: strengthColor,
                    },
                  ]}
                />
              </View>
            </View>

            {/* Confirm New Password input */}
            <View style={styles.inputSection}>
              <Text style={styles.fieldLabel}>Confirm New Password</Text>
              <CustomInput
                placeholder="Re-enter password"
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

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* 3. Security Requirements Block */}
          <View style={styles.requirementsSection}>
            <Text style={styles.requirementsTitle}>Security Requirements</Text>
            
            <View style={styles.gridRow}>
              {/* Rule 1 */}
              <View style={styles.gridPill}>
                <CheckIcon checked={hasEightChars} />
                <Text style={styles.pillText}>8+ Characters</Text>
              </View>
              {/* Rule 2 */}
              <View style={styles.gridPill}>
                <CheckIcon checked={hasNumber} />
                <Text style={styles.pillText}>1 Number</Text>
              </View>
            </View>

            <View style={styles.gridRow}>
              {/* Rule 3 */}
              <View style={styles.gridPill}>
                <CheckIcon checked={hasSpecialChar} />
                <Text style={styles.pillText}>1 Special Character</Text>
              </View>
              {/* Rule 4 */}
              <View style={styles.gridPill}>
                <CheckIcon checked={hasMixedCase} />
                <Text style={styles.pillText}>Mixed Case</Text>
              </View>
            </View>
          </View>

          {/* Reset Password Action Button */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={handleResetPassword}
              activeOpacity={0.8}
              style={styles.resetBtn}
            >
              {isLoading ? (
                <Text style={styles.btnText}>Loading...</Text>
              ) : (
                <>
                  <Text style={styles.btnText}>Reset Password</Text>
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
    paddingBottom: s(12),
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
    marginTop: s(-2),
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
    padding: s(12),
    marginTop: 0,
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
    marginTop: s(6),
    marginBottom: s(6),
    marginLeft: s(4),
  },
  eyeBtn: {
    padding: s(4),
  },
  strengthBlock: {
    marginTop: s(-14),
    marginBottom: s(6),
  },
  strengthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(6),
  },
  strengthText: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    color: '#7C7985',
    marginLeft: s(4),
  },
  strengthRating: {
    fontFamily: fontFamily.bold,
    fontSize: s(12),
    fontWeight: theme.typography.fontWeight.bold,
  },
  progressBarBg: {
    height: s(4),
    backgroundColor: '#F3F4F6',
    borderRadius: s(2),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: s(2),
  },
  requirementsSection: {
    marginTop: s(8),
    marginHorizontal: theme.spacing.md,
  },
  requirementsTitle: {
    fontFamily: fontFamily.bold,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    marginBottom: s(6),
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(6),
  },
  gridPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: s(14),
    paddingHorizontal: s(10),
    paddingVertical: s(6),
    marginHorizontal: s(4),
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  pillText: {
    fontFamily: fontFamily.medium,
    fontSize: s(12),
    color: '#1C1C1E',
    marginLeft: s(8),
  },
  actionRow: {
    marginTop: s(10),
    marginHorizontal: theme.spacing.md,
  },
  resetBtn: {
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
  errorText: {
    fontFamily: fontFamily.regular,
    fontSize: s(12),
    color: '#EF4444',
    marginTop: s(4),
    textAlign: 'center',
  },
  customInputContainer: {
    backgroundColor: '#F6F0FC',
    borderColor: '#EADFF7',
    borderWidth: 1.5,
  },
});

export default CreateNewPasswordScreen;
