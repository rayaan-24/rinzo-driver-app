import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Switch,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { driverData } from '../../../data/profile';
import { moderateScale } from '../../../utils/responsive';

// ==========================================
// OUTLINED SVG ICONS (Satisfying pixel perfect)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = '#1F1F1F' }) => (
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

const EditIcon = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 20 H 21 M 16.5 3.5 L 20.5 7.5 L 7 21 H 3 V 17 L 16.5 3.5 Z"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 18 8 A 6 6 0 0 0 6 8 C 6 15 3 17 3 17 H 21 C 21 17 18 15 18 8 Z M 13.73 21 A 2 2 0 0 1 10.27 21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MoonIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GlobeIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 2 12 H 22 M 12 2 A 15.3 15.3 0 0 1 12 22 A 15.3 15.3 0 0 1 12 2"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

const FingerprintIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 A 10 10 0 0 0 2 12 M 12 6 A 6 6 0 0 0 6 12 M 12 10 A 2 2 0 0 0 10 12 M 8 15 A 7.5 7.5 0 0 0 16 15 M 5 18 A 11 11 0 0 0 19 18 M 12 14 V 22 M 15 11 C 15 9.5 13.5 8 12 8 C 10.5 8 9 9.5 9 11"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

const LockIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 11 H 5 C 3.9 11 3 11.9 3 13 V 20 C 3 21.1 3.9 22 5 22 H 19 C 20.1 22 21 21.1 21 20 V 13 C 21 11.9 20.1 11 19 11 Z M 7 11 V 7 A 5 5 0 0 1 17 7 V 11"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 16 V 12 M 12 8 H 12.01"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 9.09 9 A 3 3 0 0 1 15 9 C 15 12 12 12 12 12 M 12 17 H 12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ size = 16, color = '#8E8E8E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 9 5 L 15 12 L 9 19"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LogoutIcon = ({ size = 20, color = '#D92D20' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 9 21 H 5 C 3.9 21 3 20.1 3 19 V 5 C 3 3.9 3.9 3 5 3 H 9 M 16 17 L 21 12 L 16 7 M 21 12 H 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ==========================================
// SETTINGS ROW SCALE FEEDBACK CONTAINER
// ==========================================

interface TappableRowProps {
  onPress?: () => void;
  children: React.ReactNode;
}

const TappableRow: React.FC<TappableRowProps> = ({ onPress, children }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.timing(scaleValue, { toValue: 0.97, duration: 100, useNativeDriver: true }).start();
  };
  const pressOut = () => {
    Animated.timing(scaleValue, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        accessible={true}
        activeOpacity={0.85}
        onPressIn={pressIn}
        onPressOut={pressOut}
        onPress={onPress}
        style={styles.rowWrapper}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface SettingsScreenProps {
  onBack: () => void;
  onNavigateHelp?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onNavigateHelp }) => {
  // Sync profiles
  const avatarImage = driverData.avatar;
  const driverName = driverData.name;
  const employeeId = driverData.employeeId;

  // Switches state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  // Reanimated staggered entrance animations
  const headerFade = useRef(new Animated.Value(0)).current;
  const profileFade = useRef(new Animated.Value(0)).current;
  const prefsFade = useRef(new Animated.Value(0)).current;
  const securityFade = useRef(new Animated.Value(0)).current;
  const aboutFade = useRef(new Animated.Value(0)).current;
  const logoutFade = useRef(new Animated.Value(0)).current;

  // Recoil scale for buttons
  const backScale = useRef(new Animated.Value(1)).current;
  const editScale = useRef(new Animated.Value(1)).current;
  const logoutScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(headerFade, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(profileFade, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(prefsFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(securityFade, { toValue: 1, duration: 350, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(aboutFade, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(logoutFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, [headerFade, profileFade, prefsFade, securityFade, aboutFade, logoutFade]);

  const pressIn = (scale: Animated.Value) => {
    Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  };
  const pressOut = (scale: Animated.Value) => {
    Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentWrapper}>
        
        {/* 1. STICKY HEADER */}
        <Animated.View style={[styles.headerContainer, { opacity: headerFade }]}>
          <Animated.View style={{ transform: [{ scale: backScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Go Back"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPressIn={() => pressIn(backScale)}
              onPressOut={() => pressOut(backScale)}
              onPress={onBack}
              style={styles.headerButton}
            >
              <ArrowLeftIcon size={22} color="#1F1F1F" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerRightPlaceholder} />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. PROFILE HERO SECTION */}
          <Animated.View style={[styles.profileHeroSection, { opacity: profileFade }]}>
            <View style={styles.avatarShadowContainer}>
              <View style={styles.avatarOutlineWrapper}>
                <Image source={avatarImage} style={styles.avatarImage} />
              </View>
              <Animated.View style={[styles.editButtonContainer, { transform: [{ scale: editScale }] }]}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel="Edit Profile Image"
                  activeOpacity={0.8}
                  onPressIn={() => pressIn(editScale)}
                  onPressOut={() => pressOut(editScale)}
                  style={styles.editButton}
                >
                  <EditIcon size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <Text style={styles.profileName}>{driverName}</Text>
            <Text style={styles.profileId}>Fleet Member • ID #{employeeId}</Text>
          </Animated.View>

          {/* 3. SECTION 1: PREFERENCES */}
          <Animated.View style={[styles.sectionWrapper, { opacity: prefsFade }]}>
            <Text style={styles.sectionLabel}>PREFERENCES</Text>
            <View style={styles.settingsCard}>
              
              {/* Row 1: Notifications */}
              <View style={styles.rowWrapperNoPress}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <BellIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Notifications</Text>
                    <Text style={styles.rowSubtitle}>Alerts, updates, and reminders</Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#D1D1D6', true: '#7C4DFF' }}
                  thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
                />
              </View>
              <View style={styles.rowDivider} />

              {/* Row 2: Dark Mode */}
              <View style={styles.rowWrapperNoPress}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <MoonIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Dark Mode</Text>
                    <Text style={styles.rowSubtitle}>Adjust app theme</Text>
                  </View>
                </View>
                <Switch
                  value={false}
                  disabled={true}
                  trackColor={{ false: '#E5E5EA', true: '#7C4DFF' }}
                  thumbColor={Platform.OS === 'android' ? '#F4F3F8' : undefined}
                />
              </View>
              <View style={styles.rowDivider} />

              {/* Row 3: Language */}
              <TappableRow>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <GlobeIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Language</Text>
                    <Text style={styles.rowSubtitle}>English (US)</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color="#8E8E93" />
              </TappableRow>

            </View>
          </Animated.View>

          {/* 4. SECTION 2: SECURITY */}
          <Animated.View style={[styles.sectionWrapper, { opacity: securityFade }]}>
            <Text style={styles.sectionLabel}>SECURITY</Text>
            <View style={styles.settingsCard}>

              {/* Row 1: Biometrics */}
              <View style={styles.rowWrapperNoPress}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <FingerprintIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Biometric Login</Text>
                    <Text style={styles.rowSubtitle}>Use Face ID or Fingerprint</Text>
                  </View>
                </View>
                <Switch
                  value={biometricsEnabled}
                  onValueChange={setBiometricsEnabled}
                  trackColor={{ false: '#D1D1D6', true: '#7C4DFF' }}
                  thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
                />
              </View>
              <View style={styles.rowDivider} />

              {/* Row 2: Change Password */}
              <TappableRow>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <LockIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Change Password</Text>
                    <Text style={styles.rowSubtitle}>Last changed 3 months ago</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color="#8E8E93" />
              </TappableRow>

            </View>
          </Animated.View>

          {/* 5. SECTION 3: ABOUT */}
          <Animated.View style={[styles.sectionWrapper, { opacity: aboutFade }]}>
            <Text style={styles.sectionLabel}>ABOUT</Text>
            <View style={styles.settingsCard}>

              {/* Row 1: About App */}
              <TappableRow>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <InfoIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>About App</Text>
                    <Text style={styles.rowSubtitle}>Version 2.4.0</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color="#8E8E93" />
              </TappableRow>
              <View style={styles.rowDivider} />

              {/* Row 2: Support */}
              <TappableRow onPress={onNavigateHelp}>
                <View style={styles.rowLeft}>
                  <View style={styles.iconCircle}>
                    <HelpIcon size={20} color="#7C4DFF" />
                  </View>
                  <View style={styles.rowTextContainer}>
                    <Text style={styles.rowTitle}>Help & Support</Text>
                    <Text style={styles.rowSubtitle}>Contact fleet assistance</Text>
                  </View>
                </View>
                <ChevronRightIcon size={16} color="#8E8E93" />
              </TappableRow>

            </View>
          </Animated.View>

          {/* 6. LOGOUT BUTTON */}
          <Animated.View style={[styles.logoutWrapper, { opacity: logoutFade, transform: [{ scale: logoutScale }] }]}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Logout"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPressIn={() => pressIn(logoutScale)}
              onPressOut={() => pressOut(logoutScale)}
              style={styles.logoutButton}
            >
              <LogoutIcon size={20} color="#D92D20" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>

        </ScrollView>
      </View>
    </View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FCFAFF', // Light lavender theme style background
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#FCFAFF',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F5',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1F1F1F',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: moderateScale(110), // Prevent tab bottom overlap
  },
  profileHeroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatarShadowContainer: {
    position: 'relative',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: theme.spacing.md,
  },
  avatarOutlineWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  editButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#7C4DFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1F1F1F',
    marginBottom: 4,
  },
  profileId: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  sectionWrapper: {
    marginBottom: theme.spacing.xl,
  },
  sectionLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#8E8E93',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3,
  },
  rowWrapper: {
    flexDirection: 'row',
    height: 76,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  rowWrapperNoPress: {
    flexDirection: 'row',
    height: 76,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3EFFF', // Light purple tint circle background
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rowTextContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: 10,
  },
  rowTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#1F1F1F',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginHorizontal: 20,
  },
  logoutWrapper: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F7CACA', // Light red border outline
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D92D20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.semibold,
    color: '#D92D20',
    marginLeft: 10,
  },
});
