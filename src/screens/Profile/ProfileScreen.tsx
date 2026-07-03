import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  BackHandler,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../theme';
import { driverData } from '../../data/profile';
import { ChevronRightIcon } from '../../components/Icons';
import { moderateScale } from '../../utils/responsive';
import { PersonalInformationScreen } from './PersonalInformation/PersonalInformationScreen';
import { VehicleInformationScreen } from './VehicleInformation/VehicleInformationScreen';
import { DocumentUploadScreen } from './Documents/DocumentUploadScreen';
import { DocumentDetailsScreen } from './Documents/DocumentDetailsScreen';
import { UploadSuccessScreen } from './Documents/UploadSuccessScreen';
import { BankDetailsScreen } from './BankDetails/BankDetailsScreen';
import { PerformanceScreen } from './Performance/PerformanceScreen';
import { SettingsScreen } from './Settings/SettingsScreen';
import { TermsAndPrivacyScreen } from './TermsAndPrivacy/TermsAndPrivacyScreen';
import { HelpAndSupportScreen } from './HelpAndSupport/HelpAndSupportScreen';
import { SupportCenterScreen } from './SupportCenter/SupportCenterScreen';
import { OrderChatScreen } from './SupportCenter/OrderChatScreen';
import { EmergencySupportScreen } from './SupportCenter/EmergencySupportScreen';
import { vehicleData } from '../../data/vehicleInformation';

// ==========================================
// LOCAL SVG ICONS (Satisfying final plan)
// ==========================================

const BellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 13.1 22 14 21.1 14 20 H 10 C 10 21.1 10.9 22 12 22 Z M 18 16 V 11 C 18 7.93 16.37 5.36 13.5 4.68 V 4 C 13.5 3.17 12.83 2.5 12 2.5 C 11.17 2.5 10.5 3.17 10.5 4 V 4.68 C 7.64 5.36 6 7.92 6 11 V 16 L 4 18 V 19 H 20 V 18 L 18 16 Z M 16 17 H 8 V 11 C 8 8.52 9.51 6.5 12 6.5 C 14.49 6.5 16 8.52 16 11 V 17 Z"
      fill={color}
    />
  </Svg>
);

const UserPlaceholderIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 12 C 14.21 12 16 10.21 16 8 C 16 5.79 14.21 4 12 4 C 9.79 4 8 5.79 8 8 C 8 10.21 9.79 12 12 12 Z M 12 14 C 9.33 14 4 15.34 4 18 V 20 H 20 V 18 C 20 15.34 14.67 14 12 14 Z"
      fill={color}
    />
  </Svg>
);

const VerifiedIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 1 L 3 5 V 11 C 3 16.55 6.84 21.74 12 23 C 17.16 21.74 21 16.55 21 11 V 5 L 12 1 Z M 10 17 L 6 13 L 7.41 11.59 L 10 14.17 L 16.59 7.58 L 18 9 L 10 17 Z"
      fill={color}
    />
  </Svg>
);

const OnlineDotIcon: React.FC<{ size?: number; color?: string }> = ({ size = 8, color = theme.colors.success }) => (
  <Svg width={size} height={size} viewBox="0 0 8 8" fill="none">
    <Circle cx="4" cy="4" r="4" fill={color} />
  </Svg>
);

const BoxIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = theme.colors.cardBg }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 L 2 7 L 12 12 L 22 7 L 12 2 Z M 2 9 V 17 L 12 22 V 14 L 2 9 Z M 22 9 V 17 L 12 22 V 14 L 22 9 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 4 H 18 V 2 H 16 V 4 H 8 V 2 H 6 V 4 H 5 C 3.89 4 3.01 4.9 3.01 6 L 3 20 C 3 21.1 3.89 22 5 22 H 19 C 20.1 22 21 21.1 21 20 V 6 C 21 4.9 20.1 4 19 4 Z M 19 20 H 5 V 10 H 19 V 20 Z M 19 8 H 5 V 6 H 19 V 8 Z"
      fill={color}
    />
  </Svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 11.99 2 C 6.47 2 2 6.48 2 12 C 2 17.52 6.47 22 11.99 22 C 17.52 22 22 17.52 22 12 C 22 6.48 17.52 2 11.99 2 Z M 12 20 C 7.58 20 4 16.42 4 12 C 4 7.58 7.58 4 12 4 C 16.42 4 20 7.58 20 12 C 20 16.42 16.42 20 12 20 Z M 12.5 7 H 11 V 13 L 16.25 16.15 L 17 14.92 L 12.5 12.25 V 7 Z"
      fill={color}
    />
  </Svg>
);

const HourglassIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 6 2 V 8 H 6.01 L 6 8.01 L 10 12 L 6 16 L 6.01 16.01 L 6 16.02 V 22 H 18 V 16.02 L 17.99 16.01 L 18 16 L 14 12 L 18 8.01 L 17.99 8 L 18 8 V 2 H 6 Z M 16 16.5 V 20 H 8 V 16.5 L 12 12.5 L 16 16.5 Z M 12 11.5 L 8 7.5 V 4 H 16 V 7.5 L 12 11.5 Z"
      fill={color}
    />
  </Svg>
);

const TruckIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 20 8 H 17 V 4 H 3 C 1.9 4 1 4.9 1 6 V 17 H 3 C 3 18.66 4.34 20 6 20 C 7.66 20 9 18.66 9 17 H 15 C 15 18.66 16.34 20 18 20 C 19.66 20 21 18.66 21 17 H 23 V 12 L 20 8 Z M 6 18.5 C 5.17 18.5 4.5 17.83 4.5 17 C 4.5 16.17 5.17 15.5 6 15.5 C 6.83 15.5 7.5 16.17 7.5 17 C 7.5 17.83 6.83 18.5 6 18.5 Z M 17 8.5 H 19.5 L 21.36 11 H 17 V 8.5 Z M 18 18.5 C 17.17 18.5 16.5 17.83 16.5 17 C 16.5 16.17 17.17 15.5 18 15.5 C 18.83 15.5 19.5 16.17 19.5 17 C 19.5 17.83 18.83 18.5 18 18.5 Z"
      fill={color}
    />
  </Svg>
);

const FileTextIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 14 2 H 6 C 4.9 2 4.01 2.9 4.01 4 L 4 20 C 4 21.1 4.9 22 6 22 H 18 C 19.1 22 20 21.1 20 20 V 8 L 14 2 Z M 18 20 H 6 V 4 H 13 V 9 H 18 V 20 Z M 8 12 H 16 V 14 H 8 V 12 Z M 8 16 H 13 V 18 H 8 V 16 Z"
      fill={color}
    />
  </Svg>
);

const BankIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 1 L 2 6 V 8 H 22 V 6 L 12 1 Z M 4 10 V 18 H 7 V 10 H 4 Z M 9 10 V 18 H 12 V 10 H 9 Z M 14 10 V 18 H 17 V 10 H 14 Z M 19 10 V 18 H 22 V 10 H 19 Z M 2 20 V 22 H 22 V 20 H 2 2 Z"
      fill={color}
    />
  </Svg>
);

const LogOutIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.error }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 17 7 L 15.59 8.41 L 18.17 11 H 8 V 13 H 18.17 L 15.59 15.58 L 17 17 L 22 12 L 17 7 Z M 4 5 H 12 V 3 H 4 C 2.9 3 2 3.9 2 5 V 19 C 2 20.1 2.9 21 4 21 H 12 V 19 H 4 V 5 Z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// RENDER HELPERS
// ==========================================

const getMenuIcon = (iconName: string, color: string) => {
  switch (iconName) {
    case 'user':
      return <UserPlaceholderIcon size={20} color={color} />;
    case 'truck':
      return <TruckIcon size={20} color={color} />;
    case 'file':
      return <FileTextIcon size={20} color={color} />;
    case 'bank':
      return <BankIcon size={20} color={color} />;
    case 'performance':
      return <TrendingUpIcon size={20} color={color} />;
    case 'settings':
      return <SettingsIcon size={20} color={color} />;
    case 'shield':
      return <ShieldIcon size={20} color={color} />;
    default:
      return <UserPlaceholderIcon size={20} color={color} />;
  }
};

const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 2 L 4 5 V 11.09 C 4 16.14 7.41 20.85 12 22 C 16.59 20.85 20 16.14 20 11.09 V 5 L 12 2 Z"
      fill={color}
    />
  </Svg>
);

const SettingsIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19.14 12.94 C 19.18 12.63 19.2 12.32 19.2 12 C 19.2 11.68 19.18 11.37 19.14 11.06 L 21.4 9.3 C 21.6 9.14 21.66 8.87 21.53 8.66 L 19.4 4.97 C 19.27 4.75 19 4.67 18.78 4.75 L 16.12 5.83 C 15.57 5.41 14.96 5.07 14.31 4.79 L 13.91 1.95 C 13.87 1.71 13.66 1.53 13.42 1.53 H 9.17 C 8.93 1.53 8.72 1.71 8.68 1.95 L 8.28 4.79 C 7.63 5.07 7.02 5.41 6.47 5.82 L 3.81 4.74 C 3.59 4.66 3.32 4.74 3.19 4.96 L 1.06 8.65 C 0.93 8.86 0.99 9.13 1.19 9.29 L 3.45 11.05 C 3.41 11.36 3.39 11.68 3.39 12 C 3.39 12.32 3.41 12.63 3.45 12.94 L 1.19 14.7 C 0.99 14.86 0.93 15.13 1.06 15.34 L 3.19 19.03 C 3.32 19.25 3.59 19.33 3.81 19.25 L 6.47 18.17 C 7.02 18.59 7.63 18.93 8.28 19.21 L 8.68 22.05 C 8.72 22.29 8.93 22.47 9.17 22.47 H 13.41 C 13.65 22.47 13.86 22.29 13.9 22.05 L 14.3 19.21 C 14.95 18.93 15.56 18.59 16.11 18.18 L 18.77 19.26 C 18.99 19.34 19.26 19.26 19.39 19.04 L 21.52 15.35 C 21.65 15.14 21.59 14.87 21.39 14.71 L 19.14 12.94 Z M 12.29 15.5 C 10.36 15.5 8.79 13.93 8.79 12 C 8.79 10.07 10.36 8.5 12.29 8.5 C 14.22 8.5 15.79 10.07 15.79 12 C 15.79 13.93 14.22 15.5 12.29 15.5 Z"
      fill={color}
    />
  </Svg>
);

const TrendingUpIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 16 6 L 18.29 8.29 L 13.41 13.17 L 9.41 9.17 L 2 16.59 L 3.41 18 L 9.41 12 L 13.41 16 L 19.71 9.71 L 22 12 V 6 H 16 Z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// DRIVER AVATAR COMPONENT (Stylized placeholder)
// ==========================================

const AvatarPlaceholder: React.FC<{ size: number; source: any }> = ({ size, source }) => {
  return (
    <Image
      source={source}
      style={[
        styles.avatarPlaceholderContainer,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
};

interface TappableRowProps {
  accessibilityLabel: string;
  onPress: () => void;
  children: React.ReactNode;
}

const TappableRow: React.FC<TappableRowProps> = ({ accessibilityLabel, onPress, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.menuRow}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const TappableLogoutButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Logout"
        accessibilityRole="button"
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.logoutButton}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface ProfileScreenProps {
  onSubScreenChange?: (isSubScreen: boolean) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSubScreenChange }) => {
  const [currentSubScreen, setCurrentSubScreen] = useState<'profile' | 'personal' | 'vehicle' | 'documents' | 'document_details' | 'upload_success' | 'bank_details' | 'performance' | 'settings' | 'terms' | 'help' | 'support_center' | 'order_chat' | 'emergency_report'>('profile');
  const [driverAvatar, setDriverAvatar] = useState(driverData.avatar);
  const [vehicleImage, setVehicleImage] = useState(vehicleData.image);

  useEffect(() => {
    if (onSubScreenChange) {
      onSubScreenChange(currentSubScreen !== 'profile');
    }
  }, [currentSubScreen, onSubScreenChange]);

  // Animation refs
  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const statsGridAnim = useRef(new Animated.Value(0)).current;
  const listItemsAnim = useRef(new Animated.Value(0)).current;
  const logoutBtnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered premium entrance animation sequence
    Animated.sequence([
      Animated.timing(heroFadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(statsGridAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(listItemsAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(logoutBtnAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [heroFadeAnim, statsGridAnim, listItemsAnim, logoutBtnAnim]);

  // Handle system hardware back press for Android
  useEffect(() => {
    const onBackPress = () => {
      if (currentSubScreen === 'upload_success') {
        setCurrentSubScreen('document_details');
        return true;
      }
      if (currentSubScreen === 'document_details') {
        setCurrentSubScreen('documents');
        return true;
      }
      if (currentSubScreen !== 'profile') {
        setCurrentSubScreen('profile');
        return true; // Intercepted
      }
      return false; // Propagate to system default
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [currentSubScreen]);

  const getAnimatedStyle = (value: Animated.Value) => ({
    opacity: value,
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [15, 0],
        }),
      },
    ],
  });

  if (currentSubScreen === 'personal') {
    return (
      <PersonalInformationScreen
        avatarImage={driverAvatar}
        onChangeAvatar={(uri) => {
          setDriverAvatar(uri);
          driverData.avatar = uri;
        }}
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'vehicle') {
    return (
      <VehicleInformationScreen
        vehicleImage={vehicleImage}
        onChangeVehicleImage={setVehicleImage}
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'documents') {
    return (
      <DocumentUploadScreen
        onViewDetails={() => setCurrentSubScreen('document_details')}
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'document_details') {
    return (
      <DocumentDetailsScreen
        onUploadSuccess={() => setCurrentSubScreen('upload_success')}
        onBack={() => setCurrentSubScreen('documents')}
      />
    );
  }

  if (currentSubScreen === 'upload_success') {
    return (
      <UploadSuccessScreen
        onGoToDashboard={() => setCurrentSubScreen('profile')}
        onViewProfile={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'bank_details') {
    return (
      <BankDetailsScreen
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'performance') {
    return (
      <PerformanceScreen
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'settings') {
    return (
      <SettingsScreen
        onBack={() => setCurrentSubScreen('profile')}
        onNavigateHelp={() => setCurrentSubScreen('help')}
      />
    );
  }

  if (currentSubScreen === 'terms') {
    return (
      <TermsAndPrivacyScreen
        onBack={() => setCurrentSubScreen('profile')}
      />
    );
  }

  if (currentSubScreen === 'help') {
    return (
      <HelpAndSupportScreen
        onBack={() => setCurrentSubScreen('settings')}
        onNavigateSupportCenter={() => setCurrentSubScreen('support_center')}
      />
    );
  }

  if (currentSubScreen === 'support_center') {
    return (
      <SupportCenterScreen
        onBack={() => setCurrentSubScreen('help')}
        onNavigateOrderSupport={() => setCurrentSubScreen('order_chat')}
        onNavigateEmergencySupport={() => setCurrentSubScreen('emergency_report')}
      />
    );
  }

  if (currentSubScreen === 'emergency_report') {
    return (
      <EmergencySupportScreen
        onBack={() => setCurrentSubScreen('support_center')}
      />
    );
  }



  if (currentSubScreen === 'order_chat') {
    return (
      <OrderChatScreen
        onBack={() => setCurrentSubScreen('support_center')}
      />
    );
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.contentWrapper}>
        {/* 1. HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <AvatarPlaceholder size={moderateScale(32)} source={driverAvatar} />
            <Text style={styles.headerTitle}>Rinzo Driver</Text>
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            activeOpacity={0.7}
            style={styles.headerRight}
          >
            <BellIcon size={20} color={theme.colors.textDark} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. PROFILE HERO SECTION */}
          <Animated.View style={[styles.heroCard, getAnimatedStyle(heroFadeAnim)]}>
            <View style={styles.avatarWrapper}>
              <AvatarPlaceholder size={moderateScale(100)} source={driverAvatar} />
              <View style={styles.onlineBadge}>
                <View style={styles.onlineInnerBadge} />
              </View>
            </View>

            <Text style={styles.driverName}>{driverData.name}</Text>
            <Text style={styles.employeeId}>Employee ID: {driverData.employeeId}</Text>

            <View style={styles.chipsContainer}>
              <View style={[styles.statusChip, styles.verifiedChip]}>
                <VerifiedIcon size={13} color={theme.colors.primary} />
                <Text style={styles.verifiedChipText}>Verified</Text>
              </View>
              <View style={[styles.statusChip, styles.onlineChip]}>
                <OnlineDotIcon size={7} color={theme.colors.success} />
                <Text style={styles.onlineChipText}>Online</Text>
              </View>
            </View>
          </Animated.View>

          {/* 3. STATISTICS GRID */}
          <Animated.View style={[styles.statsGrid, getAnimatedStyle(statsGridAnim)]}>
            {/* Card 1: Total Orders */}
            <View style={[styles.statCard, styles.purpleStatCard]}>
              <View style={styles.statCardHeader}>
                <Text style={styles.purpleStatTitle}>TOTAL ORDERS</Text>
                <BoxIcon size={18} color={theme.colors.cardBg} />
              </View>
              <Text style={styles.purpleStatValue}>{driverData.stats.totalOrders}</Text>
            </View>

            {/* Card 2: Today */}
            <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                <Text style={styles.statTitle}>TODAY</Text>
                <CalendarIcon size={18} color={theme.colors.textMedium} />
              </View>
              <Text style={styles.statValue}>{driverData.stats.today}</Text>
            </View>

            {/* Card 3: On-Time */}
            <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                <Text style={styles.statTitle}>ON-TIME</Text>
                <ClockIcon size={18} color={theme.colors.textMedium} />
              </View>
              <Text style={[styles.statValue, styles.purpleStatText]}>
                {driverData.stats.onTime}
              </Text>
            </View>

            {/* Card 4: Hours */}
            <View style={styles.statCard}>
              <View style={styles.statCardHeader}>
                <Text style={styles.statTitle}>HOURS</Text>
                <HourglassIcon size={18} color={theme.colors.textMedium} />
              </View>
              <Text style={styles.statValue}>{driverData.stats.hours}</Text>
            </View>
          </Animated.View>

          {/* 4. MENU LIST */}
          <Animated.View style={[styles.menuList, getAnimatedStyle(listItemsAnim)]}>
            {driverData.menuItems.map((item) => (
              <TappableRow
                key={item.id}
                accessibilityLabel={`Go to ${item.title}`}
                onPress={() => {
                  if (item.id === 'personal') {
                    setCurrentSubScreen('personal');
                  } else if (item.id === 'vehicle') {
                    setCurrentSubScreen('vehicle');
                  } else if (item.id === 'documents') {
                    setCurrentSubScreen('documents');
                  } else if (item.id === 'bank') {
                    setCurrentSubScreen('bank_details');
                  } else if (item.id === 'performance') {
                    setCurrentSubScreen('performance');
                  } else if (item.id === 'settings') {
                    setCurrentSubScreen('settings');
                  } else if (item.id === 'terms') {
                    setCurrentSubScreen('terms');
                  }
                }}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    {getMenuIcon(item.icon, theme.colors.primary)}
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={[styles.menuSubtitle, item.warning && styles.warningText]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <ChevronRightIcon size={14} color={theme.colors.textLight} />
              </TappableRow>
            ))}
          </Animated.View>

          {/* 5. LOGOUT BUTTON */}
          <Animated.View style={getAnimatedStyle(logoutBtnAnim)}>
            <TappableLogoutButton>
              <LogOutIcon size={18} color={theme.colors.error} />
              <Text style={styles.logoutText}>Logout</Text>
            </TappableLogoutButton>
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
    paddingBottom: moderateScale(130), // Floating bottom navigation safe padding
  },
  headerContainer: {
    flexDirection: 'row',
    height: moderateScale(60),
    backgroundColor: theme.colors.cardBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textDark,
    marginLeft: theme.spacing.sm,
  },
  headerRight: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  heroCard: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineInnerBadge: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: theme.colors.success,
  },
  driverName: {
    fontFamily: 'Poppins-Bold',
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xxs,
    textAlign: 'center',
  },
  employeeId: {
    fontFamily: 'Poppins-Medium',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMedium,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(6),
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginHorizontal: theme.spacing.xxs,
  },
  verifiedChip: {
    backgroundColor: theme.colors.primaryLight,
  },
  verifiedChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.primary,
    marginLeft: 5,
  },
  onlineChip: {
    backgroundColor: theme.colors.successLight,
  },
  onlineChipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.success,
    marginLeft: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 22,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  purpleStatCard: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: theme.colors.textMedium,
    letterSpacing: 1.0,
  },
  purpleStatTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: theme.colors.primaryLight,
    letterSpacing: 1.0,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(28),
    color: theme.colors.textDark,
  },
  purpleStatValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(28),
    color: theme.colors.cardBg,
  },
  purpleStatText: {
    color: theme.colors.primary,
  },
  menuList: {
    marginBottom: theme.spacing.lg,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 22,
    padding: theme.spacing.md,
    marginBottom: 12, // Restores vertical spacing between card rows
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textMedium,
  },
  warningText: {
    color: theme.colors.error,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 22,
    height: 56,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  logoutText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.error,
    marginLeft: theme.spacing.xs,
  },
});
