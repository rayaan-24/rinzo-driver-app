import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { documentUploadData } from '../../../data/documents';
import { moderateScale } from '../../../utils/responsive';

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

const ExternalLinkIcon = ({ size = 16, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 18 13 V 19 C 18 19.5 17.8 20 17.4 20.4 C 17 20.8 16.5 21 16 21 H 5 C 4.5 21 4 20.8 3.6 20.4 C 3.2 20 3 19.5 3 19 V 8 C 3 7.5 3.2 7 3.6 6.6 C 4 6.2 4.5 6 5 6 H 11 M 15 3 H 21 V 9 M 10 14 L 21 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeIcon = ({ size = 18, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 1 12 C 1 12 5 4 12 4 C 19 4 23 12 23 12 C 23 12 19 20 12 20 C 5 20 1 12 1 12 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
  </Svg>
);

const PencilIcon = ({ size = 18, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 20 H 21 M 16.5 3.5 C 16.9 3.1 17.5 3.1 17.9 3.5 L 20.5 6.1 C 20.9 6.5 20.9 7.1 20.5 7.5 L 7 21 L 3 21 L 3 17 L 16.5 3.5 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CloudUploadIcon = ({ size = 24, color = theme.colors.primary }) => (
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

const LicenseIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 4 4 H 20 C 21.1 4 22 4.9 22 6 V 18 C 22 19.1 21.1 20 20 20 H 4 C 2.9 20 2 19.1 2 18 V 6 C 2 4.9 2.9 4 4 4 Z M 6 8 H 10 M 6 12 H 12"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="17" cy="14" r="3" stroke={color} strokeWidth={2} />
  </Svg>
);

const RegistrationIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 17 H 5 C 3.9 17 3 16.1 3 15 V 9 C 3 7.9 3.9 7 5 7 H 14 L 18 10 H 20 C 21.1 10 22 10.9 22 12 V 15 C 22 16.1 21.1 17 20 17 Z M 14 7 V 10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="7.5" cy="17" r="2.5" fill={color} />
    <Circle cx="16.5" cy="17" r="2.5" fill={color} />
  </Svg>
);

const ShieldIcon = ({ size = 20, color = theme.colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 12 22 C 12 22 20 18 20 12 V 5 L 12 2 L 4 5 V 12 C 4 18 12 22 12 22 Z M 9 12 L 11 14 L 15 10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = ({ size = 12, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 4 H 18 V 2 H 16 V 4 H 8 V 2 H 6 V 4 H 5 C 3.89 4 3.01 4.9 3.01 6 L 3 20 C 3 21.1 3.89 22 5 22 H 19 C 20.1 22 21 21.1 21 20 V 6 C 21 4.9 20.1 4 19 4 Z M 19 20 H 5 V 10 H 19 V 20 Z M 19 8 H 5 V 6 H 19 V 8 Z"
      fill={color}
    />
  </Svg>
);

const ClockIcon = ({ size = 12, color = theme.colors.textMedium }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M 12 6 V 12 L 16 14"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const WarningIcon = ({ size = 12, color = '#EF4444' }) => (
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

// ==========================================
// COMPONENT INTERFACE
// ==========================================

interface DocumentUploadScreenProps {
  onViewDetails?: () => void;
  onBack: () => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({ onViewDetails, onBack }) => {
  const [uploadProgress] = useState(documentUploadData.progress);
  const [documentsList] = useState(documentUploadData.documents);

  // Entrance animations
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const itemsFadeAnim = useRef(new Animated.Value(0)).current;
  const uploadScaleAnim = useRef(new Animated.Value(1)).current;

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

  const handleUploadPressIn = () => {
    Animated.timing(uploadScaleAnim, {
      toValue: 0.96,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleUploadPressOut = () => {
    Animated.timing(uploadScaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };


  const getDocIcon = (type: string, color: string) => {
    switch (type) {
      case 'license':
        return <LicenseIcon color={color} />;
      case 'registration':
        return <RegistrationIcon color={color} />;
      case 'insurance':
        return <ShieldIcon color={color} />;
      default:
        return <LicenseIcon color={color} />;
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return styles.verifiedBadge;
      case 'PENDING':
        return styles.pendingBadge;
      case 'EXPIRED':
        return styles.expiredBadge;
      default:
        return styles.verifiedBadge;
    }
  };

  const getBadgeTextStyle = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return styles.verifiedBadgeText;
      case 'PENDING':
        return styles.pendingBadgeText;
      case 'EXPIRED':
        return styles.expiredBadgeText;
      default:
        return styles.verifiedBadgeText;
    }
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFadeAnim }]}>
      <View style={styles.contentWrapper}>

        {/* 1. FIXED HEADER */}
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
          <Text style={styles.headerTitle}>Document Upload</Text>
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
          {/* 2. VERIFICATION PROGRESS CARD */}
          <Animated.View style={[styles.progressCard, getAnimatedItemStyle()]}>
            <View style={styles.progressCardHeader}>
              <Text style={styles.progressCardTitle}>Verification Progress</Text>
              <View style={styles.stepsBadge}>
                <Text style={styles.stepsBadgeText}>
                  {uploadProgress.completedSteps} of {uploadProgress.totalSteps} steps
                </Text>
              </View>
            </View>

            <Text style={styles.percentageText}>{uploadProgress.percentage}% COMPLETED</Text>

            {/* Progress Bar Tracker */}
            <View style={styles.progressBarTrack}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${uploadProgress.percentage}%` },
                ]}
              />
            </View>

            <Text style={styles.progressDescription}>
              Complete  your  remaining  uploads  to
              start receiving <Text style={styles.boldText}>high-value logistics requests.</Text>
            </Text>
          </Animated.View>

          {/* 3. REQUIRED DOCUMENTS HEADER */}
          <Animated.View style={[styles.sectionHeaderRow, getAnimatedItemStyle()]}>
            <Text style={styles.sectionHeading}>Required
              Documents</Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="View Compliance Guidelines"
              accessibilityRole="button"
              activeOpacity={0.7}
              style={styles.guidelinesLink}
            >
              <Text style={styles.guidelinesText}>Compliance Guidelines</Text>
              <ExternalLinkIcon size={14} color={theme.colors.primary} />
            </TouchableOpacity>
          </Animated.View>

          {/* 4. DOCUMENT CARDS LIST */}
          {documentsList.map((doc) => (
            <Animated.View
              key={doc.id}
              style={[styles.documentCard, getAnimatedItemStyle()]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  {/* Left Icon Badge */}
                  <View
                    style={[
                      styles.iconContainer,
                      doc.status === 'EXPIRED' && styles.expiredIconContainer,
                    ]}
                  >
                    {getDocIcon(
                      doc.iconType,
                      doc.status === 'EXPIRED' ? '#EF4444' : theme.colors.primary
                    )}
                  </View>

                  {/* Title and Badge column */}
                  <View style={styles.cardMetadata}>
                    <View style={styles.titleRow}>
                      <Text style={styles.documentTitle}>{doc.title}</Text>
                      {doc.status === 'EXPIRED' && (
                        <View style={getBadgeStyle(doc.status)}>
                          <Text style={getBadgeTextStyle(doc.status)}>{doc.statusLabel}</Text>
                        </View>
                      )}
                    </View>

                    {/* Verified/Pending Badge row */}
                    {doc.status !== 'EXPIRED' && (
                      <View style={styles.statusBadgeRow}>
                        <View style={getBadgeStyle(doc.status)}>
                          <Text style={getBadgeTextStyle(doc.status)}>{doc.statusLabel}</Text>
                        </View>
                      </View>
                    )}

                    {/* Expiry Subtitle */}
                    <View style={styles.subtitleRow}>
                      {doc.status === 'EXPIRED' ? (
                        <WarningIcon size={12} color="#EF4444" />
                      ) : doc.status === 'PENDING' ? (
                        <ClockIcon size={12} color={theme.colors.textMedium} />
                      ) : (
                        <CalendarIcon size={12} color={theme.colors.textMedium} />
                      )}
                      <Text
                        style={[
                          styles.subtitleText,
                          doc.status === 'EXPIRED' && styles.expiredSubtitleText,
                        ]}
                      >
                        {doc.subtitle}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Right Actions */}
                {doc.variant !== 'upload' && (
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={doc.variant === 'view' ? "View Document" : "Edit Document"}
                    accessibilityRole="button"
                    activeOpacity={0.7}
                    style={styles.circularActionButton}
                    onPress={() => {
                      if (doc.variant === 'view' && onViewDetails) {
                        onViewDetails();
                      }
                    }}
                  >
                    {doc.variant === 'view' ? (
                      <EyeIcon size={18} color={theme.colors.primary} />
                    ) : (
                      <PencilIcon size={18} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                )}
              </View>

              {/* Large Dashed Upload Area for Card 3 */}
              {doc.variant === 'upload' && (
                <Animated.View style={{ transform: [{ scale: uploadScaleAnim }] }}>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Tap to upload Document"
                    accessibilityRole="button"
                    activeOpacity={0.9}
                    onPressIn={handleUploadPressIn}
                    onPressOut={handleUploadPressOut}
                    onPress={onViewDetails}
                    style={styles.uploadArea}
                  >
                    <View style={styles.uploadCloudBox}>
                      <CloudUploadIcon size={22} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.uploadTitle}>Tap to upload Document</Text>
                    <Text style={styles.uploadSubtitle}>PDF, PNG or JPEG up to 10MB</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>
          ))}

          {/* 5. INFORMATION BOX */}
          <Animated.View style={[styles.infoCard, getAnimatedItemStyle()]}>
            <View style={styles.infoIconBox}>
              <InfoIcon size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>{documentUploadData.processingInfo.title}</Text>
              <Text style={styles.infoDescription}>{documentUploadData.processingInfo.description}</Text>
            </View>
          </Animated.View>

        </ScrollView>
      </View>
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
    paddingBottom: moderateScale(110), // Spacing for bottom tab margins
  },
  progressCard: {
    backgroundColor: '#6C32C4', // Premium custom purple matching design
    borderRadius: 24,
    padding: 20,
    marginBottom: theme.spacing.lg,
    shadowColor: '#6C32C4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  progressCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressCardTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  stepsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  stepsBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.bold,
  },
  percentageText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    color: '#E2D6FF',
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 4,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginTop: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressDescription: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 13,
    color: '#E2D6FF',
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  sectionHeading: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
  },
  guidelinesLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guidelinesText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginRight: 4,
  },
  documentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  expiredIconContainer: {
    backgroundColor: '#FFF5F5',
  },
  cardMetadata: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  documentTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginRight: 6,
  },
  statusBadgeRow: {
    marginBottom: 4,
  },
  verifiedBadge: {
    backgroundColor: '#DEF7EC',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    color: '#03543F',
    fontWeight: theme.typography.fontWeight.bold,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pendingBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    color: '#D97706',
    fontWeight: theme.typography.fontWeight.bold,
  },
  expiredBadge: {
    backgroundColor: '#FFF5F5',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  expiredBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    color: '#EF4444',
    fontWeight: theme.typography.fontWeight.bold,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    marginLeft: 4,
  },
  expiredSubtitleText: {
    color: '#EF4444',
    fontFamily: theme.typography.fontFamily.bold,
    fontWeight: 'bold',
  },
  circularActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  uploadArea: {
    marginTop: 16,
    height: 140,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#C0BDF3',
    backgroundColor: '#F8F8FD',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  uploadCloudBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  uploadTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: 2,
  },
  uploadSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: theme.spacing.lg,
  },
  infoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  infoDescription: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.colors.textMedium,
    lineHeight: 18,
  },
});
