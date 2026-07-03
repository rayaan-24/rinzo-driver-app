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
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { personalData } from '../../../data/personalInformation';
import { moderateScale } from '../../../utils/responsive';
import { ImageManager } from '../../../utils/imageManager';
import { ImageActionSheet } from '../../../components/ImageActionSheet';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
// ==========================================

const ArrowLeftIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = theme.colors.textDark }) => (
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

const HelpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.textDark }) => (
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

const EditIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 11 4 H 4 C 2.9 4 2 4.9 2 6 V 20 C 2 21.1 2.9 22 4 22 H 18 C 19.1 22 20 21.1 20 20 V 13 M 18.5 2.5 C 19.33 1.67 20.67 1.67 21.5 2.5 C 22.33 3.33 22.33 4.67 21.5 5.5 L 12 15 L 8 16 L 9 12 L 18.5 2.5 Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#22C55E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 17.5 20.5 21 15.5 21 10.5 V 4.5 L 12 1.5 L 3 4.5 V 10.5 C 3 15.5 6.5 20.5 12 22 Z M 9 11.5 L 11 13.5 L 15.5 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 13.1 22 14 21.1 14 20 H 10 C 10 21.1 10.9 22 12 22 Z M 18 16 V 11 C 18 7.93 16.37 5.36 13.5 4.68 V 4 C 13.5 3.17 12.83 2.5 12 2.5 C 11.17 2.5 10.5 3.17 10.5 4 V 4.68 C 7.64 5.36 6 7.92 6 11 V 16 L 4 18 V 19 H 20 V 18 L 18 16 Z M 16 17 H 8 V 11 C 8 8.52 9.51 6.5 12 6.5 C 14.49 6.5 16 8.52 16 11 V 17 Z"
      fill="none"
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

const UserInfoIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 12 C 14.21 12 16 10.21 16 8 C 16 5.79 14.21 4 12 4 C 9.79 4 8 5.79 8 8 C 8 10.21 9.79 12 12 12 Z M 12 14 C 9.33 14 4 15.34 4 18 V 20 H 20 V 18 C 20 15.34 14.67 14 12 14 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LocationIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 C 7.58 2 4 5.58 4 10 C 4 16 12 22 12 22 C 12 22 20 16 20 10 C 20 5.58 16.42 2 12 2 Z M 12 13 C 10.34 13 9 11.66 9 10 C 9 8.34 10.34 7 12 7 C 13.66 7 15 8.34 15 10 C 15 11.66 13.66 13 12 13 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 10, color = '#22C55E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 20 6 L 9 17 L 4 12"
      stroke={color}
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ==========================================
// COMPONENT INTERFACE
// ==========================================

interface PersonalInformationScreenProps {
  avatarImage: any;
  onChangeAvatar: (source: any) => void;
  onBack: () => void;
}

const resolveImageSource = (source: any) => {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
};

export const PersonalInformationScreen: React.FC<PersonalInformationScreenProps> = ({
  avatarImage,
  onChangeAvatar,
  onBack,
}) => {
  const [alertsEnabled, setAlertsEnabled] = useState(personalData.alertsEnabled);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Animation values
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const itemsFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(screenFadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(itemsFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [screenFadeAnim, itemsFadeAnim]);

  const handleTakePhoto = async () => {
    setIsBottomSheetVisible(false);
    const uri = await ImageManager.takePhoto();
    if (uri) {
      onChangeAvatar(uri);
    }
  };

  const handleChooseFromGallery = async () => {
    setIsBottomSheetVisible(false);
    const uri = await ImageManager.chooseFromGallery();
    if (uri) {
      onChangeAvatar(uri);
    }
  };

  const handleRemovePhoto = () => {
    setIsBottomSheetVisible(false);
    onChangeAvatar(personalData.avatar);
  };

  const getAnimatedItemStyle = () => ({
    opacity: itemsFadeAnim,
    transform: [
      {
        translateY: itemsFadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  });

  const handlePressIn = () => {
    Animated.timing(buttonScaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(buttonScaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFadeAnim }]}>
      <View style={styles.contentWrapper}>
        {/* 1. HEADER */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Go Back"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.headerButton}
          >
            <ArrowLeftIcon size={22} color={theme.colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Help"
            accessibilityRole="button"
            activeOpacity={0.7}
            style={styles.headerButtonRight}
          >
            <HelpIcon size={20} color={theme.colors.textDark} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. PROFILE HERO SECTION */}
          <Animated.View style={[styles.profileHeroSection, getAnimatedItemStyle()]}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Change Profile Photo"
              accessibilityRole="button"
              activeOpacity={0.9}
              onPress={() => setIsBottomSheetVisible(true)}
              style={styles.avatarContainer}
            >
              <View style={styles.avatarBorder}>
                <Image source={resolveImageSource(avatarImage)} style={styles.avatarImage} />
              </View>
              <View style={styles.editButton}>
                <EditIcon size={13} color="#FFFFFF" />
              </View>
            </TouchableOpacity>

            <Text style={styles.driverName}>{personalData.name}</Text>

            {/* Badges */}
            <View style={styles.badgesRow}>
              <View style={styles.verifiedBadge}>
                <View style={styles.verifiedCheckWrapper}>
                  <CheckIcon size={7} color="#22C55E" />
                </View>
                <Text style={styles.verifiedText}>{personalData.badges[0]}</Text>
              </View>
              <View style={styles.goldBadge}>
                <Text style={styles.goldText}>{personalData.badges[1]}</Text>
              </View>
            </View>

            <Text style={styles.activeSinceText}>Active since {personalData.activeSince}</Text>
          </Animated.View>

          {/* 3. STATISTICS CARDS */}
          <Animated.View style={[styles.statsGridRow, getAnimatedItemStyle()]}>
            {/* Deliveries Card */}
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>DELIVERIES</Text>
              <Text style={styles.statValueDark}>{personalData.deliveries}</Text>
            </View>

            {/* Rating Card */}
            <View style={[styles.statCard, styles.purpleStatCard]}>
              <Text style={styles.statLabelPurple}>RATING</Text>
              <Text style={styles.statValueLight}>{personalData.rating} ★</Text>
            </View>
          </Animated.View>

          {/* 4. BASIC INFORMATION CARD */}
          <Animated.View style={[styles.infoCard, getAnimatedItemStyle()]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderIconBox}>
                <UserInfoIcon size={18} color={theme.colors.primary} />
              </View>
              <Text style={styles.cardHeaderTitle}>Basic Information</Text>
            </View>

            {/* Full Name field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>FULL NAME</Text>
              <View style={styles.readOnlyContainer}>
                <Text style={styles.readOnlyText}>{personalData.name}</Text>
              </View>
            </View>

            {/* Email Address field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
              <View style={styles.readOnlyContainer}>
                <Text style={styles.readOnlyText}>{personalData.email}</Text>
              </View>
            </View>

            {/* Phone Number field */}
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
              <View style={styles.readOnlyContainer}>
                <Text style={styles.readOnlyText}>{personalData.phone}</Text>
              </View>
            </View>
          </Animated.View>

          {/* 5. HOME BASE CARD */}
          <Animated.View style={[styles.infoCard, getAnimatedItemStyle()]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.cardHeaderIconBox}>
                <LocationIcon size={18} color={theme.colors.primary} />
              </View>
              <Text style={styles.cardHeaderTitle}>Home Base</Text>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>CURRENT ADDRESS</Text>
              <View style={styles.readOnlyContainerLarge}>
                <Text style={styles.addressText}>{personalData.address}</Text>
              </View>
            </View>
          </Animated.View>

          {/* 6. IDENTITY VERIFICATION ROW */}
          <Animated.View style={[styles.rowContainer, getAnimatedItemStyle()]}>
            <View style={styles.rowLeft}>
              <ShieldIcon size={20} color="#22C55E" />
              <Text style={styles.rowLabelText}>Identity Verified</Text>
            </View>
            <Text style={styles.rowConfirmedText}>CONFIRMED</Text>
          </Animated.View>
          <View style={styles.divider} />

          {/* 7. PROFILE UPDATE ALERTS ROW */}
          <Animated.View style={[styles.rowContainer, getAnimatedItemStyle()]}>
            <View style={styles.rowLeft}>
              <BellIcon size={20} color={theme.colors.textMedium} />
              <Text style={styles.rowLabelText}>Profile Update Alerts</Text>
            </View>
            <Switch
              accessible={true}
              accessibilityLabel="Toggle Profile Update Alerts"
              trackColor={{ false: '#E5E7EB', true: theme.colors.primary }}
              thumbColor="#FFFFFF"
              value={alertsEnabled}
              onValueChange={setAlertsEnabled}
            />
          </Animated.View>

          {/* 8. SAVE CHANGES BUTTON */}
          <Animated.View style={[getAnimatedItemStyle(), { transform: [{ scale: buttonScaleAnim }] }]}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Save Changes"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <Text style={styles.lastUpdatedText}>Last updated {personalData.lastUpdated}</Text>
          </Animated.View>
        </ScrollView>

      </View>

      {/* ACTION SHEET OVERLAY */}
      <ImageActionSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="Change Profile Photo"
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
        onRemovePhoto={handleRemovePhoto}
        showRemove={avatarImage !== personalData.avatar}
      />
    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    height: moderateScale(60),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerButtonRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: moderateScale(130), // Bottom Tab Bar spacing
  },
  profileHeroSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatarBorder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  driverName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(22),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F0',
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 999,
    marginRight: theme.spacing.xs,
  },
  verifiedCheckWrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  verifiedText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: '#22C55E',
    fontWeight: theme.typography.fontWeight.semibold,
  },
  goldBadge: {
    backgroundColor: '#F5F3FF',
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 999,
  },
  goldText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  activeSinceText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  statsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  purpleStatCard: {
    backgroundColor: theme.colors.primary,
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  statLabelPurple: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: '#D5C4FF',
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  },
  statValueDark: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(26),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  statValueLight: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(26),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardHeaderIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  cardHeaderTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  fieldWrapper: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: 8,
  },
  readOnlyContainer: {
    minHeight: 52,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
  },
  readOnlyContainerLarge: {
    minHeight: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  readOnlyText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
    color: theme.colors.textDark,
  },
  addressText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
    color: theme.colors.textDark,
    lineHeight: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabelText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 14,
    color: theme.colors.textDark,
    fontWeight: theme.typography.fontWeight.semibold,
    marginLeft: theme.spacing.sm,
  },
  rowConfirmedText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: '#22C55E',
    fontWeight: theme.typography.fontWeight.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
  },
  saveButton: {
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  saveButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  lastUpdatedText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
});
