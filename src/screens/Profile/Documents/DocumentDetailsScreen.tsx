import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { documentDetailsData } from '../../../data/documentDetails';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
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

const CloudUploadIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 22 10 C 22 7.8 20.2 6 18 6 C 17.7 6 17.3 6.1 17 6.2 C 16 3.7 13.5 2 10.5 2 C 6.9 2 4 4.9 4 8.5 C 4 8.7 4 8.8 4 9 C 1.7 9.8 0 12 0 14.5 C 0 17.5 2.5 20 5.5 20 H 18.5 C 20.4 20 22 18.4 22 16.5 C 22 16.1 21.9 15.8 21.8 15.5 C 21.9 15.2 22 14.9 22 14.5 M 8 13 L 12 9 L 16 13 M 12 9 V 17"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DownloadIcon = ({ size = 18, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 15 V 3 M 12 15 L 8 11 M 12 15 L 16 11 M 4 20 H 20"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 16 V 12 M 12 8 H 12.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ==========================================
// COMPONENT INTERFACE
// ==========================================

interface DocumentDetailsScreenProps {
  onUploadSuccess?: () => void;
  onBack: () => void;
}

const resolveImageSource = (source: any) => {
  if (typeof source === 'string') {
    return { uri: source };
  }
  return source;
};

export const DocumentDetailsScreen: React.FC<DocumentDetailsScreenProps> = ({ onUploadSuccess, onBack }) => {
  const insets = useSafeAreaInsets();
  // Animation values
  const screenFadeAnim = useRef(new Animated.Value(1)).current;
  const itemsFadeAnim = useRef(new Animated.Value(1)).current;
  const updateBtnScale = useRef(new Animated.Value(1)).current;
  const downloadBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    screenFadeAnim.setValue(1);
    itemsFadeAnim.setValue(1);
  }, [screenFadeAnim, itemsFadeAnim]);

  const getAnimatedItemStyle = () => ({});

  const handleUpdatePressIn = () => {
    Animated.timing(updateBtnScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleUpdatePressOut = () => {
    Animated.timing(updateBtnScale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleDownloadPressIn = () => {
    Animated.timing(downloadBtnScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleDownloadPressOut = () => {
    Animated.timing(downloadBtnScale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleUpdateDocument = () => {
    if (onUploadSuccess) {
      onUploadSuccess();
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Connect to backend PDF storage endpoint in future
    Alert.alert('Download PDF', 'Generating and exporting commercial insurance certificate in PDF format... (TODO: Storage API Integration)');
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFadeAnim }]}>
      <View style={styles.contentWrapper}>
        
        {/* 1. STICKY HEADER */}
        <Header
          title="Document Details"
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
          contentContainerStyle={styles.scrollContent}
        >
          {/* 2. DOCUMENT INFORMATION */}
          <Animated.View style={[styles.infoSection, getAnimatedItemStyle()]}>
            <Text style={styles.categoryLabel}>{documentDetailsData.category}</Text>
            <Text style={styles.documentName}>{documentDetailsData.name}</Text>
          </Animated.View>

          {/* 3. VERIFICATION STATUS ROW */}
          <Animated.View style={[styles.verificationRow, getAnimatedItemStyle()]}>
            <View style={styles.statusBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{documentDetailsData.status}</Text>
            </View>
            <Text style={styles.verificationDateText}>{documentDetailsData.verificationDate}</Text>
          </Animated.View>

          {/* 4. DOCUMENT PREVIEW CARD */}
          <Animated.View style={[styles.previewCard, getAnimatedItemStyle()]}>
            <Image
              source={resolveImageSource(documentDetailsData.previewImage)}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </Animated.View>

          {/* 5. INFORMATION CARDS GRID (ID & EXPIRY) */}
          <Animated.View style={[styles.cardsGridRow, getAnimatedItemStyle()]}>
            {/* Card 1: ID */}
            <View style={styles.gridCard}>
              <Text style={styles.gridLabel}>Document ID</Text>
              <Text style={styles.gridValue}>{documentDetailsData.documentId}</Text>
            </View>

            {/* Card 2: Expiry */}
            <View style={styles.gridCard}>
              <Text style={styles.gridLabel}>Expiry Date</Text>
              <Text style={styles.gridValue}>{documentDetailsData.expiryDate}</Text>
            </View>
          </Animated.View>

          {/* 6. AUTO-RENEWAL CARD */}
          <Animated.View style={[styles.renewalCard, getAnimatedItemStyle()]}>
            <View style={styles.infoIconBox}>
              <InfoIcon size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.renewalTextContainer}>
              <Text style={styles.renewalTitle}>{documentDetailsData.renewalTitle}</Text>
              <Text style={styles.renewalDescription}>{documentDetailsData.renewalDescription}</Text>
            </View>
          </Animated.View>

        </ScrollView>

        {/* 7. STICKY ACTIONS BAR (Always visible) */}
        <View style={[styles.stickyBottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          {/* Primary: Update */}
          <Animated.View style={{ transform: [{ scale: updateBtnScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Update Document"
              accessibilityRole="button"
              activeOpacity={0.85}
              onPressIn={handleUpdatePressIn}
              onPressOut={handleUpdatePressOut}
              onPress={handleUpdateDocument}
              style={styles.primaryButton}
            >
              <CloudUploadIcon size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Update Document</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Secondary: Download */}
          <Animated.View style={{ transform: [{ scale: downloadBtnScale }] }}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Download PDF"
              accessibilityRole="button"
              activeOpacity={0.85}
              onPressIn={handleDownloadPressIn}
              onPressOut={handleDownloadPressOut}
              onPress={handleDownloadPDF}
              style={styles.secondaryButton}
            >
              <DownloadIcon size={18} color={theme.colors.primary} />
              <Text style={styles.secondaryButtonText}>Download PDF</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM (Poppins-ready)
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
    paddingBottom: moderateScale(20),
  },
  infoSection: {
    marginTop: 6,
    marginBottom: theme.spacing.xs,
  },
  categoryLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.textMedium,
    letterSpacing: 1,
    marginBottom: 4,
  },
  documentName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    lineHeight: 32,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFE8FF', // Light purple tint
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginRight: 10,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  },
  verificationDateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: theme.colors.textMedium,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 10,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  previewImage: {
    width: '100%',
    height: moderateScale(380),
    borderRadius: 16,
  },
  cardsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#F3F4F6', // Standard secondary light surface
    borderRadius: 16,
    padding: 16,
  },
  gridLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textMedium,
    marginBottom: 4,
  },
  gridValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  renewalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: theme.spacing.xl,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  renewalTextContainer: {
    flex: 1,
  },
  renewalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  renewalDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.textMedium,
    lineHeight: 18,
  },
  primaryButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
    marginLeft: theme.spacing.xs,
  },
  secondaryButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(4),
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  headerButtonRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickyBottomBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    paddingTop: 16,
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
});
