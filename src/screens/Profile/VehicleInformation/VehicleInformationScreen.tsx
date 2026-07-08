import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { vehicleData } from '../../../data/vehicleInformation';
import { driverData } from '../../../data/profile';
import { moderateScale } from '../../../utils/responsive';
import { ImageManager } from '../../../utils/imageManager';
import { ImageActionSheet } from '../../../components/ImageActionSheet';
import { Header } from '../../../components/Header';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
// ==========================================



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

const SignalIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 18 C 12 18 12 18 12 18 M 12 12 C 14 12 15.5 13.5 15.5 15.5 M 8.5 15.5 C 8.5 13.5 10 12 12 12 M 12 8 C 16 8 19 11 19 15 M 5 15 C 5 11 8 8 12 8"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="15.5" r="1.5" fill={color} />
  </Svg>
);

const PlateIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 4 5 H 20 C 21.1 5 22 5.9 22 7 V 17 C 22 18.1 21.1 19 20 19 H 4 C 2.9 19 2 18.1 2 17 V 7 C 2 5.9 2.9 5 4 5 Z M 6 12 H 10 M 14 12 H 18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MileageIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 C 6.48 2 2 6.48 2 12 C 2 17.52 6.48 22 12 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 12 2 Z M 12 17 V 12 L 15.5 9.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FuelPumpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 3 22 V 6 C 3 4.9 3.9 4 5 4 H 13 C 14.1 4 15 4.9 15 6 V 22 M 15 9 H 19 M 19 9 V 15 C 19 16.1 18.1 17 17 17 H 15 M 6 8 H 12 V 12 H 6 V 8 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 4 H 18 V 2 H 16 V 4 H 8 V 2 H 6 V 4 H 5 C 3.89 4 3.01 4.9 3.01 6 L 3 20 C 3 21.1 3.89 22 5 22 H 19 C 20.1 22 21 21.1 21 20 V 6 C 21 4.9 20.1 4 19 4 Z M 19 20 H 5 V 10 H 19 V 20 Z M 19 8 H 5 V 6 H 19 V 8 Z"
      fill={color}
    />
  </Svg>
);

const WarningIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 8 V 13 M 12 16 H 12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClipboardIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 16 4 H 19 C 20.1 4 21 4.9 21 6 V 20 C 21 21.1 20.1 22 19 22 H 5 C 3.9 22 3 21.1 3 20 V 6 C 3 4.9 3.9 4 5 4 H 8 M 15 2 H 9 C 8.45 2 8 2.45 8 3 V 5 C 8 5.55 8.45 6 9 6 H 15 C 15.55 6 16 5.55 16 5 V 3 C 16 2.45 15.55 2 15 2 Z M 9 14 L 11 16 L 15 11"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = theme.colors.textLight }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 9 18 L 15 12 L 9 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface VehicleInformationScreenProps {
  vehicleImage: any;
  onChangeVehicleImage: (source: any) => void;
  onBack: () => void;
}

const resolveImageSource = (source: any) => {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
};

export const VehicleInformationScreen: React.FC<VehicleInformationScreenProps> = ({
  vehicleImage,
  onChangeVehicleImage,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Animation values
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const itemsFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Run staggered entrance sequence
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
      onChangeVehicleImage(uri);
    }
  };

  const handleChooseFromGallery = async () => {
    setIsBottomSheetVisible(false);
    const uri = await ImageManager.chooseFromGallery();
    if (uri) {
      onChangeVehicleImage(uri);
    }
  };

  const handleRemovePhoto = () => {
    setIsBottomSheetVisible(false);
    onChangeVehicleImage(vehicleData.image);
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
        <Header
          title="Vehicle Information"
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
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom > 0 ? insets.bottom + theme.spacing.md : theme.spacing.md,
            },
          ]}
        >
          {/* 2. DRIVER WELCOME ROW */}
          <Animated.View 
            style={[styles.welcomeRow, getAnimatedItemStyle()]}
            accessible={true}
            accessibilityLabel="Driver Welcome Banner"
            accessibilityRole="text"
          >
            <View style={styles.driverWelcomeLeft}>
              <Image 
                accessible={true}
                accessibilityLabel="Driver Profile Avatar"
                accessibilityRole="image"
                source={driverData.avatar} 
                style={styles.driverAvatar} 
              />
              <Text style={styles.welcomeText} maxFontSizeMultiplier={1.3}>Welcome, Driver</Text>
            </View>
            <SignalIcon size={20} color={theme.colors.primary} />
          </Animated.View>

          {/* 3. VEHICLE HERO CARD */}
          <Animated.View style={getAnimatedItemStyle()}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={`Change vehicle photo. Current vehicle: ${vehicleData.name}, model edition: ${vehicleData.edition}`}
              accessibilityRole="button"
              activeOpacity={0.9}
              onPress={() => setIsBottomSheetVisible(true)}
              style={styles.heroCard}
            >
              <Image 
                accessible={true}
                accessibilityLabel="Vehicle Image"
                accessibilityRole="image"
                source={resolveImageSource(vehicleImage)} 
                style={styles.heroImage} 
              />
              <View style={styles.darkOverlay} />

              {/* Top-left Pill Badge */}
              <View style={styles.assignedBadge}>
                <Text style={styles.assignedBadgeText} maxFontSizeMultiplier={1.3}>ASSIGNED VEHICLE</Text>
              </View>

              {/* Bottom Overlay text */}
              <View style={styles.vehicleDetailsOverlay}>
                <Text style={styles.vehicleName} maxFontSizeMultiplier={1.3}>{vehicleData.name}</Text>
                <Text style={styles.vehicleEdition} maxFontSizeMultiplier={1.3}>{vehicleData.edition}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* 4. STATISTICS CARDS */}
          <Animated.View style={[styles.statsGridRow, getAnimatedItemStyle()]}>
            {/* Card 1: Plate */}
            <View 
              style={styles.statCard}
              accessible={true}
              accessibilityLabel={`Vehicle license plate: ${vehicleData.plate}`}
              accessibilityRole="text"
            >
              <View style={styles.statCardHeader}>
                <View style={styles.statCardIconBox}>
                  <PlateIcon size={16} color={theme.colors.primary} />
                </View>
                <Text style={styles.statLabel} maxFontSizeMultiplier={1.3}>PLATE</Text>
              </View>
              <Text style={styles.statValueDark} maxFontSizeMultiplier={1.3}>{vehicleData.plate}</Text>
            </View>

            {/* Card 2: Mileage */}
            <View 
              style={styles.statCard}
              accessible={true}
              accessibilityLabel={`Vehicle Mileage: ${vehicleData.mileage} kilometers`}
              accessibilityRole="text"
            >
              <View style={styles.statCardHeader}>
                <View style={styles.statCardIconBox}>
                  <MileageIcon size={16} color={theme.colors.primary} />
                </View>
                <Text style={styles.statLabel} maxFontSizeMultiplier={1.3}>MILEAGE</Text>
              </View>
              <Text style={styles.statValueDark} maxFontSizeMultiplier={1.3}>{vehicleData.mileage}</Text>
              <Text style={styles.statCardSubtitle} maxFontSizeMultiplier={1.3}>Total Kilometers</Text>
            </View>
          </Animated.View>

          {/* 5. FUEL LEVEL CARD */}
          <Animated.View 
            style={[styles.fuelCard, getAnimatedItemStyle()]}
            accessible={true}
            accessibilityLabel={`Fuel Level: ${Math.round(vehicleData.fuelLevel * 100)} percent. Range is ${vehicleData.range}. Fuel Type is ${vehicleData.fuelType}`}
            accessibilityRole="text"
          >
            <View style={styles.fuelHeaderRow}>
              <View style={styles.fuelTitleBox}>
                <View style={styles.fuelIconBox}>
                  <FuelPumpIcon size={18} color={theme.colors.primary} />
                </View>
                <Text style={styles.fuelCardTitle} maxFontSizeMultiplier={1.3}>Fuel Level</Text>
              </View>
              <Text style={styles.fuelPercentageText} maxFontSizeMultiplier={1.3}>{Math.round(vehicleData.fuelLevel * 100)}%</Text>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${vehicleData.fuelLevel * 100}%` },
                ]}
              />
            </View>

            {/* Range & Fuel type indicators */}
            <View style={styles.fuelFooterRow}>
              <Text style={styles.rangeText} maxFontSizeMultiplier={1.3}>• Range: {vehicleData.range}</Text>
              <Text style={styles.fuelTypeText} maxFontSizeMultiplier={1.3}>{vehicleData.fuelType}</Text>
            </View>
          </Animated.View>

          {/* 6. MAINTENANCE SECTION */}
          <Animated.View style={[styles.maintenanceSection, getAnimatedItemStyle()]}>
            <Text style={styles.sectionHeaderTitle} maxFontSizeMultiplier={1.3}>MAINTENANCE STATUS</Text>

            {vehicleData.maintenanceItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                accessible={true}
                accessibilityLabel={`Maintenance item: ${item.title}. status: ${item.subtitle}. ${item.urgent ? 'Urgent attention required.' : ''}`}
                accessibilityRole="button"
                activeOpacity={0.7}
                style={styles.maintenanceRow}
              >
                <View style={styles.maintenanceLeft}>
                  <View
                    style={[
                      styles.maintenanceIconContainer,
                      item.urgent && styles.urgentIconContainer,
                    ]}
                  >
                    {item.iconType === 'calendar' ? (
                      <CalendarIcon size={18} color={theme.colors.primary} />
                    ) : (
                      <WarningIcon size={18} color="#EF4444" />
                    )}
                  </View>
                  <View style={styles.maintenanceTextContainer}>
                    <Text style={styles.maintenanceTitle} maxFontSizeMultiplier={1.3}>{item.title}</Text>
                    <Text style={styles.maintenanceSubtitle} maxFontSizeMultiplier={1.3}>{item.subtitle}</Text>
                  </View>
                </View>

                <View style={styles.maintenanceRight}>
                  {item.urgent && (
                    <View style={styles.urgentBadge}>
                      <Text style={styles.urgentBadgeText} maxFontSizeMultiplier={1.3}>URGENT</Text>
                    </View>
                  )}
                  <ChevronRightIcon size={14} color={theme.colors.textLight} />
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* 7. PRIMARY BUTTON */}
          <Animated.View style={[getAnimatedItemStyle(), { transform: [{ scale: buttonScaleAnim }] }]}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Submit Daily Check"
              accessibilityRole="button"
              activeOpacity={0.8}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.primaryButton}
            >
              <ClipboardIcon size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText} maxFontSizeMultiplier={1.3}>Submit Daily Check</Text>
            </TouchableOpacity>
            <Text style={styles.lastUpdatedText} maxFontSizeMultiplier={1.3}>Last updated {vehicleData.lastUpdated}</Text>
          </Animated.View>
        </ScrollView>

      </View>

      {/* ACTION SHEET OVERLAY */}
      <ImageActionSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="Change Vehicle Photo"
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
        onRemovePhoto={handleRemovePhoto}
        showRemove={vehicleImage !== vehicleData.image}
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

  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  driverWelcomeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    marginRight: theme.spacing.sm,
    overflow: 'hidden', // Ensures round clipping on Android
  },
  welcomeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  heroCard: {
    position: 'relative',
    height: moderateScale(200),
    borderRadius: moderateScale(20),
    overflow: 'hidden', // Required for rounded image bounds
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(20),
    overflow: 'hidden', // Fix image corners overflow on Android
  },
  darkOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: moderateScale(70),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  assignedBadge: {
    position: 'absolute',
    top: moderateScale(14),
    left: moderateScale(14),
    backgroundColor: theme.colors.primary,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: 999,
  },
  assignedBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(10),
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 0.5,
  },
  vehicleDetailsOverlay: {
    position: 'absolute',
    bottom: moderateScale(14),
    left: moderateScale(14),
  },
  vehicleName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginBottom: moderateScale(2),
  },
  vehicleEdition: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(12),
    color: '#E0E0E0',
  },
  statsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: theme.spacing.md,
    ...theme.shadows.small,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  statCardIconBox: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(6),
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(10),
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  statValueDark: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(20),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  statCardSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(10),
    color: theme.colors.textMedium,
    marginTop: moderateScale(2),
  },
  fuelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  fuelHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  fuelTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fuelIconBox: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  fuelCardTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  fuelPercentageText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  progressBarTrack: {
    height: moderateScale(10),
    backgroundColor: '#E5E7EB',
    borderRadius: moderateScale(5),
    overflow: 'hidden',
    marginBottom: theme.spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(5),
  },
  fuelFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(11),
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  fuelTypeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(10),
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 0.2,
  },
  maintenanceSection: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeaderTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(12),
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  maintenanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  maintenanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  maintenanceIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  urgentIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  maintenanceTextContainer: {
    flex: 1,
  },
  maintenanceTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(14),
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: moderateScale(2),
  },
  maintenanceSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(12),
    color: theme.colors.textMedium,
  },
  maintenanceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urgentBadge: {
    backgroundColor: '#FEE2E2',
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    borderRadius: 999,
    marginRight: theme.spacing.sm,
  },
  urgentBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(9),
    color: '#EF4444',
    fontWeight: theme.typography.fontWeight.bold,
  },
  primaryButton: {
    flexDirection: 'row',
    minHeight: moderateScale(56),
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.medium,
  },
  primaryButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
    marginLeft: theme.spacing.xs,
  },
  lastUpdatedText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(12),
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
  headerButtonRight: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
