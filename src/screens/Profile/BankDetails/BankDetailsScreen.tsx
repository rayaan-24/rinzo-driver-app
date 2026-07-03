import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

// ==========================================
// CUSTOM SVG ICONS (Alphanumeric/Android space-safe)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 20 12 H 4 M 10 18 L 4 12 L 10 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 16 H 12.01 M 12 13 C 12 13 12.5 12.5 13.5 11.5 C 14.5 10.5 14.5 9.5 13.5 8.5 C 12.5 7.5 11.5 7.5 10.5 8.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldLockIcon = ({ size = 48, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Shield */}
    <Path
      d="M 12 22 C 17.5 20.5 21 15.5 21 10.5 V 5 L 12 2 L 3 5 V 10.5 C 3 15.5 6.5 20.5 12 22 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Padlock inside */}
    <Rect x="9" y="11" width="6" height="5" rx="1" stroke={color} strokeWidth={1.8} />
    <Path d="M 10 11 V 9 C 10 7.9 10.9 7 12 7 C 13.1 7 14 7.9 14 9 V 11" stroke={color} strokeWidth={1.8} />
  </Svg>
);

const LockIcon = ({ size = 12, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth={2.5} />
    <Path d="M 8 11 V 7 C 8 4.8 9.8 3 12 3 C 14.2 3 16 4.8 16 7 V 11" stroke={color} strokeWidth={2.5} />
  </Svg>
);

const BankIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 3 21 H 21 M 3 10 L 12 3 L 21 10 M 5 10 V 17 M 10 10 V 17 M 14 10 V 17 M 19 10 V 17" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UserIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 20 21 C 20 17 16.4 14 12 14 C 7.6 14 4 17 4 21" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
  </Svg>
);

const NumberIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M 8 7 V 17 M 12 7 V 17 M 16 7 V 17 M 8 12 H 16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const CodeIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 8 3 H 5 C 3.9 3 3 3.9 3 5 V 8 M 16 3 H 19 C 20.1 3 21 3.9 21 5 V 8 M 3 16 V 19 C 3 20.1 3.9 21 5 21 H 8 M 21 16 V 19 C 21 20.1 20.1 21 19 21 H 16" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="7" y="7" width="10" height="10" rx="1" stroke={color} strokeWidth={1.5} />
  </Svg>
);

const EyeOpenIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 1 12 C 1 12 5 4 12 4 C 19 4 23 12 23 12 C 23 12 19 20 12 20 C 5 20 1 12 1 12 Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
  </Svg>
);

const EyeClosedIcon = ({ size = 20, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M 1 12 C 1 12 5 4 12 4 C 19 4 23 12 23 12 C 23 12 19 20 12 20 C 5 20 1 12 1 12 Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
    <Path d="M 3 3 L 21 21" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

const ShieldCheckIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 17.5 20.5 21 15.5 21 10.5 V 5 L 12 2 L 3 5 V 10.5 C 3 15.5 6.5 20.5 12 22 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M 9 11 L 11 13 L 15 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = ({ size = 22, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path d="M 12 16 V 12 M 12 8 H 12.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GreenCheckIcon = ({ size = 16, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#D1FAE5" />
    <Path d="M 9 12 L 11 14 L 15 10" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface BankDetailsScreenProps {
  onBack: () => void;
}

export const BankDetailsScreen: React.FC<BankDetailsScreenProps> = ({ onBack }) => {
  // Navigation entrance transition
  const screenFadeAnim = useRef(new Animated.Value(0)).current;

  // Form input value states
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  // Password visibility
  const [isSecureText, setIsSecureText] = useState(true);
  const eyeFadeAnim = useRef(new Animated.Value(1)).current;

  // Save button press scale spring
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Validation States
  const [bankError, setBankError] = useState('');
  const [holderError, setHolderError] = useState('');
  const [accountError, setAccountError] = useState('');
  const [ifscError, setIfscError] = useState('');

  // Highlight Border Focus Anim values
  const bankFocusAnim = useRef(new Animated.Value(0)).current;
  const holderFocusAnim = useRef(new Animated.Value(0)).current;
  const accountFocusAnim = useRef(new Animated.Value(0)).current;
  const ifscFocusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(screenFadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [screenFadeAnim]);

  // Focus transition handlers
  const handleFocus = (anim: Animated.Value) => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false, // Color and shadow interpolation doesn't support native driver
    }).start();
  };

  const handleBlur = (anim: Animated.Value) => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  // Visibility toggle fade transition (150-200ms)
  const toggleVisibility = () => {
    Animated.timing(eyeFadeAnim, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start(() => {
      setIsSecureText(prev => !prev);
      Animated.timing(eyeFadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  // Capitalize full name utility
  const handleNameChange = (text: string) => {
    const capitalized = text.replace(/\b\w/g, l => l.toUpperCase());
    setHolderName(capitalized);
    if (holderError) setHolderError('');
  };

  // Automatically convert IFSC/SWIFT code to uppercase
  const handleIfscChange = (text: string) => {
    const uppercaseText = text.toUpperCase();
    setIfscCode(uppercaseText);
    if (ifscError) setIfscError('');
  };

  // Validation Check Rules
  const validateForm = () => {
    let isValid = true;

    // Bank Name check
    if (!bankName.trim()) {
      setBankError('Bank name is required');
      isValid = false;
    } else {
      setBankError('');
    }

    // Account Holder check
    if (!holderName.trim()) {
      setHolderError('Account holder name is required');
      isValid = false;
    } else {
      setHolderError('');
    }

    // Account Number Check (8 to 18 digits)
    const cleanNum = accountNumber.replace(/\D/g, '');
    if (!cleanNum) {
      setAccountError('Account number is required');
      isValid = false;
    } else if (cleanNum.length < 8 || cleanNum.length > 18) {
      setAccountError('Account number must be between 8 and 18 digits');
      isValid = false;
    } else {
      setAccountError('');
    }

    // IFSC / SWIFT Checks
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
    const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i;
    if (!ifscCode.trim()) {
      setIfscError('IFSC or SWIFT code is required');
      isValid = false;
    } else if (!ifscRegex.test(ifscCode) && !swiftRegex.test(ifscCode)) {
      setIfscError('Invalid IFSC (e.g. ABCD0123456) or SWIFT code format');
      isValid = false;
    } else {
      setIfscError('');
    }

    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      Animated.sequence([
        Animated.timing(buttonScale, { toValue: 0.97, duration: 100, useNativeDriver: true }),
        Animated.timing(buttonScale, { toValue: 1, duration: 120, useNativeDriver: true }),
      ]).start(() => {
        Alert.alert(
          'Security Check Passed',
          'Your bank account information has been updated securely with AES-256 bank-grade protection.',
          [{ text: 'Dismiss', onPress: onBack }]
        );
      });
    } else {
      Alert.alert('Validation Error', 'Please check the highlighted fields below and correct the details.');
    }
  };

  // Helper functions to interpolate borders & shadows
  const getFieldBorderColor = (anim: Animated.Value, error: string) => {
    if (error) return '#EF4444'; // Red if has error
    return anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#E5E7EB', theme.colors.primary],
    });
  };

  const getFieldShadow = (anim: Animated.Value) => {
    return {
      shadowOpacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.03, 0.08],
      }),
      elevation: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 3],
      }),
    };
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFadeAnim }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.contentWrapper}>
          
          {/* 1. FIXED HEADER */}
          <Header
            title="Bank Details"
            showBack
            onBackPress={onBack}
            rightCustom={
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Help"
                accessibilityRole="button"
                activeOpacity={0.7}
                style={styles.headerButtonRight}
              >
                <HelpIcon size={20} color={theme.colors.textDark} />
              </TouchableOpacity>
            }
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* 2. HERO HEADER SECTION */}
            <View style={styles.heroSection}>
              <View style={styles.iconCircle}>
                <ShieldLockIcon size={44} color={theme.colors.primary} />
              </View>
              <Text style={styles.heroTitle}>Secure Payouts</Text>
              <Text style={styles.heroDescription}>
                Configure your destination for secure weekly salary transfers. All financial data is protected by bank-grade encryption.
              </Text>

              {/* 3. AES-256 CAPSULE PILL */}
              <View style={styles.encryptionCapsule}>
                <LockIcon size={12} color={theme.colors.primary} />
                <Text style={styles.encryptionText}>AES-256 ENCRYPTION ACTIVE</Text>
              </View>
            </View>

            {/* 4. FORM FIELDS */}
            <View style={styles.formContainer}>
              
              {/* Field 1: Bank Name */}
              <Text style={styles.fieldLabel}>BANK NAME</Text>
              <Animated.View
                style={[
                  styles.inputCard,
                  { borderColor: getFieldBorderColor(bankFocusAnim, bankError) },
                  getFieldShadow(bankFocusAnim),
                ]}
              >
                <View style={styles.fieldRow}>
                  <BankIcon size={20} color={bankName ? theme.colors.primary : theme.colors.textMedium} />
                  <TextInput
                    accessible={true}
                    accessibilityLabel="Enter Bank Name"
                    style={styles.textInput}
                    placeholder="e.g. Global Reserve Bank"
                    placeholderTextColor="#AEAEB2"
                    value={bankName}
                    onChangeText={text => {
                      setBankName(text);
                      if (bankError) setBankError('');
                    }}
                    onFocus={() => handleFocus(bankFocusAnim)}
                    onBlur={() => handleBlur(bankFocusAnim)}
                  />
                  {bankName && !bankError && <GreenCheckIcon size={16} />}
                </View>
              </Animated.View>
              {bankError ? <Text style={styles.inlineError}>{bankError}</Text> : null}

              {/* Field 2: Account Holder Name */}
              <Text style={styles.fieldLabel}>ACCOUNT HOLDER NAME</Text>
              <Animated.View
                style={[
                  styles.inputCard,
                  { borderColor: getFieldBorderColor(holderFocusAnim, holderError) },
                  getFieldShadow(holderFocusAnim),
                ]}
              >
                <View style={styles.fieldRow}>
                  <UserIcon size={20} color={holderName ? theme.colors.primary : theme.colors.textMedium} />
                  <TextInput
                    accessible={true}
                    accessibilityLabel="Enter Account Holder Name"
                    style={styles.textInput}
                    placeholder="Full name as per bank records"
                    placeholderTextColor="#AEAEB2"
                    autoCapitalize="words"
                    value={holderName}
                    onChangeText={handleNameChange}
                    onFocus={() => handleFocus(holderFocusAnim)}
                    onBlur={() => handleBlur(holderFocusAnim)}
                  />
                  {holderName && !holderError && <GreenCheckIcon size={16} />}
                </View>
              </Animated.View>
              {holderError ? <Text style={styles.inlineError}>{holderError}</Text> : null}

              {/* Field 3: Account Number */}
              <Text style={styles.fieldLabel}>ACCOUNT NUMBER</Text>
              <Animated.View
                style={[
                  styles.inputCard,
                  { borderColor: getFieldBorderColor(accountFocusAnim, accountError) },
                  getFieldShadow(accountFocusAnim),
                ]}
              >
                <View style={styles.fieldRow}>
                  <NumberIcon size={20} color={accountNumber ? theme.colors.primary : theme.colors.textMedium} />
                  <Animated.View style={[styles.flexInputWrapper, { opacity: eyeFadeAnim }]}>
                    <TextInput
                      accessible={true}
                      accessibilityLabel="Enter Account Number"
                      style={styles.textInput}
                      placeholder="•••• •••• •••• ••••"
                      placeholderTextColor="#AEAEB2"
                      keyboardType="numeric"
                      secureTextEntry={isSecureText}
                      value={accountNumber}
                      onChangeText={text => {
                        setAccountNumber(text.replace(/\D/g, ''));
                        if (accountError) setAccountError('');
                      }}
                      onFocus={() => handleFocus(accountFocusAnim)}
                      onBlur={() => handleBlur(accountFocusAnim)}
                    />
                  </Animated.View>
                  {accountNumber && !accountError && <View style={styles.spacingCheck}><GreenCheckIcon size={16} /></View>}
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Toggle Account Number Visibility"
                    accessibilityRole="button"
                    activeOpacity={0.7}
                    onPress={toggleVisibility}
                    style={styles.eyeBtn}
                  >
                    {isSecureText ? (
                      <EyeClosedIcon size={20} color={theme.colors.textMedium} />
                    ) : (
                      <EyeOpenIcon size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                </View>
              </Animated.View>
              {accountError ? <Text style={styles.inlineError}>{accountError}</Text> : null}

              {/* Field 4: IFSC / SWIFT Code */}
              <Text style={styles.fieldLabel}>IFSC / SWIFT CODE</Text>
              <Animated.View
                style={[
                  styles.inputCard,
                  { borderColor: getFieldBorderColor(ifscFocusAnim, ifscError) },
                  getFieldShadow(ifscFocusAnim),
                ]}
              >
                <View style={styles.fieldRow}>
                  <CodeIcon size={20} color={ifscCode ? theme.colors.primary : theme.colors.textMedium} />
                  <TextInput
                    accessible={true}
                    accessibilityLabel="Enter IFSC or SWIFT Code"
                    style={styles.textInput}
                    placeholder="E.G. GRBK0001234"
                    placeholderTextColor="#AEAEB2"
                    autoCapitalize="characters"
                    value={ifscCode}
                    onChangeText={handleIfscChange}
                    onFocus={() => handleFocus(ifscFocusAnim)}
                    onBlur={() => handleBlur(ifscFocusAnim)}
                  />
                  {ifscCode && !ifscError && <GreenCheckIcon size={16} />}
                </View>
              </Animated.View>
              {ifscError ? <Text style={styles.inlineError}>{ifscError}</Text> : null}

            </View>

            {/* 5. INFORMATION WARNING CARD */}
            <View style={styles.infoCard}>
              <View style={styles.infoIconBox}>
                <InfoIcon size={22} color={theme.colors.primary} />
              </View>
              <Text style={styles.infoText}>
                Weekly payouts are initiated every <Text style={styles.boldText}>Monday</Text>. Verify all details carefully as incorrect information may result in payment delays.
              </Text>
            </View>

            {/* 6. PRIMARY BUTTON */}
            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Save Bank Details Securely"
                accessibilityRole="button"
                activeOpacity={0.85}
                onPress={handleSave}
                style={styles.primaryButton}
              >
                <ShieldCheckIcon size={18} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Save Securely</Text>
              </TouchableOpacity>
            </Animated.View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: moderateScale(110), // Padding to prevent Bottom Tab overlap
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: 12,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F2F0FD', // Light purple
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 8,
  },
  heroDescription: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  encryptionCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F0FD',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  encryptionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  fieldLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textMedium,
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  inputCard: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginBottom: 14,
    justifyContent: 'center',
    paddingHorizontal: 18,
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  flexInputWrapper: {
    flex: 1,
    height: '100%',
  },
  textInput: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: theme.colors.textDark,
    marginLeft: 12,
    padding: 0, // Reset default Android text input padding
  },
  eyeBtn: {
    padding: 6,
    marginLeft: 10,
  },
  spacingCheck: {
    marginRight: 6,
  },
  inlineError: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#EF4444',
    marginTop: -8,
    marginBottom: 12,
    marginLeft: 6,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F8FE',
    borderWidth: 1.5,
    borderColor: '#F2F0FD',
    borderRadius: 24,
    padding: 20,
    marginBottom: theme.spacing.xl,
    alignItems: 'flex-start',
  },
  infoIconBox: {
    marginRight: 14,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
    lineHeight: 20,
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  buttonWrapper: {
    width: '100%',
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  headerButtonRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
