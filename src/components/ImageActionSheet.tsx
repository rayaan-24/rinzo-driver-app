import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../theme';
import { moderateScale } from '../utils/responsive';

// ==========================================
// LOCAL SVG ICONS (Android space-safe paths)
// ==========================================

const CameraIcon = ({ color = theme.colors.primary }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 23 19 C 23 20.1 22.1 21 21 21 H 3 C 1.9 21 1 20.1 1 19 V 8 C 1 6.9 1.9 6 3 6 H 7 L 9 3 H 15 L 17 6 H 21 C 22.1 6 23 6.9 23 8 V 19 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth={2} />
  </Svg>
);

const GalleryIcon = ({ color = theme.colors.primary }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 19 3 H 5 C 3.9 3 3 3.9 3 5 V 19 C 3 20.1 3.9 21 5 21 H 19 C 20.1 21 21 20.1 21 19 V 5 C 21 3.9 20.1 3 19 3 Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <Path
      d="M 21 15 L 16 10 L 5 21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrashIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 3 6 H 21 M 19 6 V 20 C 19 21.1 18.1 22 17 22 H 7 C 5.9 22 5 21.1 5 20 V 6 M 8 6 V 4 C 8 2.9 8.9 2 10 2 H 14 C 15.1 2 16 2.9 16 4 V 6 M 10 11 V 17 M 14 11 V 17"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ color = '#9CA3AF' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M 9 18 L 15 12 L 9 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ==========================================
// COMPONENT INTERFACE
// ==========================================

interface ImageActionSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  onRemovePhoto?: () => void;
  showRemove: boolean;
}

export const ImageActionSheet: React.FC<ImageActionSheetProps> = ({
  isVisible,
  onClose,
  title,
  subtitle = 'Choose how you want to update your photo.',
  onTakePhoto,
  onChooseFromGallery,
  onRemovePhoto,
  showRemove,
}) => {
  const slideAnim = useRef(new Animated.Value(450)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Mount/Unmount transitions
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(450);
      backdropOpacity.setValue(0);
    }
  }, [isVisible, slideAnim, backdropOpacity]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 450,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // PanResponder to track swipe down gestures on the handle bar
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.4) {
          handleClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  if (!isVisible) return null;

  return (
    <View style={RNStyleSheet.absoluteFill}>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdropButton}
          onPress={handleClose}
        />
      </Animated.View>

      {/* Sheet Modal */}
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Top Drag Handle */}
        <View {...panResponder.panHandlers} style={styles.dragHandleContainer}>
          <View style={styles.dragHandle} />
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.sheetTitle}>{title}</Text>
          <Text style={styles.sheetSubtitle}>{subtitle}</Text>
        </View>

        {/* Options List */}
        <View style={styles.optionsList}>
          {/* Option 1: Take Photo */}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Take Photo"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onTakePhoto}
            style={styles.optionTile}
          >
            <View style={styles.tileLeft}>
              <View style={styles.iconBox}>
                <CameraIcon color={theme.colors.primary} />
              </View>
              <View style={styles.tileTextContainer}>
                <Text style={styles.tileTitle}>Take Photo</Text>
                <Text style={styles.tileSubtitle}>Capture a new photo using your camera.</Text>
              </View>
            </View>
            <ChevronRightIcon color="#9CA3AF" />
          </TouchableOpacity>

          {/* Option 2: Gallery */}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Choose from Gallery"
            accessibilityRole="button"
            activeOpacity={0.7}
            onPress={onChooseFromGallery}
            style={styles.optionTile}
          >
            <View style={styles.tileLeft}>
              <View style={styles.iconBox}>
                <GalleryIcon color={theme.colors.primary} />
              </View>
              <View style={styles.tileTextContainer}>
                <Text style={styles.tileTitle}>Choose from Gallery</Text>
                <Text style={styles.tileSubtitle}>Select an existing photo from your device.</Text>
              </View>
            </View>
            <ChevronRightIcon color="#9CA3AF" />
          </TouchableOpacity>

          {/* Optional: Remove Photo */}
          {showRemove && onRemovePhoto && (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Remove Photo"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPress={onRemovePhoto}
              style={[styles.optionTile, styles.removeTile]}
            >
              <View style={styles.tileLeft}>
                <View style={[styles.iconBox, styles.removeIconBox]}>
                  <TrashIcon color="#EF4444" />
                </View>
                <View style={styles.tileTextContainer}>
                  <Text style={[styles.tileTitle, styles.removeTitleText]}>Remove Photo</Text>
                  <Text style={styles.tileSubtitle}>Restore the default image.</Text>
                </View>
              </View>
              <ChevronRightIcon color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Cancel"
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={handleClose}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...RNStyleSheet.absoluteFill,
    backgroundColor: '#000000',
  },
  backdropButton: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: moderateScale(34),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  dragHandleContainer: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E5E7EB',
  },
  headerContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  sheetTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 6,
  },
  sheetSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 14,
    color: theme.colors.textMedium,
  },
  optionsList: {
    marginBottom: 16,
  },
  optionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  removeTile: {
    backgroundColor: '#FFF5F5',
  },
  tileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  removeIconBox: {
    backgroundColor: '#FEE2E2',
  },
  tileTextContainer: {
    flex: 1,
  },
  tileTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textDark,
    marginBottom: 2,
  },
  removeTitleText: {
    color: '#EF4444',
  },
  tileSubtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  cancelButton: {
    height: 56,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#4B5563',
  },
});
