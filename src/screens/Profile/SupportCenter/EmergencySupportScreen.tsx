import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  Image,
  Alert,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';
import { ImageManager } from '../../../utils/imageManager';

const { width } = Dimensions.get('window');

// ==========================================
// CUSTOM OUTLINED SVG ICONS (Drawn locally)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4M10 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HelpIcon = ({ size = 22, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M12 16h.01M12 13c0 0 .5-.5 1.5-1.5s1-2 0-3-2-1-3 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = ({ size = 18, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9l6 6 6-6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronUpIcon = ({ size = 18, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15l-6-6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CameraIcon = ({ size = 22, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth={2} />
    <Path
      d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
      fill={color}
    />
  </Svg>
);

const UploadIcon = ({ size = 22, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15v3H6v-3M12 4v10M8 8l4-4 4 4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoCircleIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M12 16v-4M12 8h.01"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SubmitPaperplaneIcon = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// DROPDOWN CONSTANTS
// ==========================================

const categoryOptions = [
  'Vehicle Breakdown',
  'Accident',
  'Safety Issue',
  'Customer Issue',
  'Route Problem',
  'Emergency Assistance',
  'Other',
];

// ==========================================
// COMPONENT EXPORT
// ==========================================

interface EmergencySupportScreenProps {
  onBack: () => void;
}

export const EmergencySupportScreen: React.FC<EmergencySupportScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [_fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const fieldsAnims = useRef(categoryOptions.slice(0, 5).map(() => new Animated.Value(0))).current;

  const card1Scale = useRef(new Animated.Value(1)).current;
  const card2Scale = useRef(new Animated.Value(1)).current;
  const submitScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Intercept Android physical back press
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Entrance Animations
    Animated.sequence([
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.stagger(80, fieldsAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      )),
    ]).start();

    return () => backHandler.remove();
  }, [onBack, headerFadeAnim, contentFadeAnim, fieldsAnims]);

  const handleCardPressIn = (scaleVal: Animated.Value) => {
    Animated.timing(scaleVal, {
      toValue: 0.95,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handleCardPressOut = (scaleVal: Animated.Value) => {
    Animated.timing(scaleVal, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const handleTakePhoto = async () => {
    const uri = await ImageManager.takePhoto();
    if (uri) {
      setPhotoUri(uri);
      Alert.alert('Photo Captured', 'Emergency photo attached successfully.');
    }
  };

  const handleUploadFile = async () => {
    const uri = await ImageManager.chooseFromGallery();
    if (uri) {
      setFileUri(uri);
      const splitUri = uri.split('/');
      setFileName(splitUri[splitUri.length - 1] || 'evidence_file.jpg');
      Alert.alert('File Attached', 'Emergency evidence file attached successfully.');
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !description.trim()) return;

    // Simulate submit report payload prepare
    Alert.alert(
      'Report Submitted',
      `Your emergency report has been submitted.\n\nCategory: ${selectedCategory}\nGPS attachment: Enabled`,
      [{ text: 'OK', onPress: onBack }]
    );
  };

  // Validation
  const isSubmitDisabled = !selectedCategory || !description.trim();

  // Card Width
  const uploadCardWidth = (width - theme.spacing.md * 2 - 12) / 2;

  // Stagger wrapper styles
  const getStaggerStyle = (index: number) => ({
    opacity: fieldsAnims[index] || 1,
    transform: [
      {
        translateY: (fieldsAnims[index] || 1).interpolate({
          inputRange: [0, 1],
          outputRange: [15, 0],
        }),
      },
    ],
  });

  return (
    <View style={styles.outerContainer}>
      
      {/* 1. FIXED HEADER */}
      <Header
        title="Emergency Support"
        showBack
        onBackPress={onBack}
        rightCustom={
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Help info"
            accessibilityRole="button"
            activeOpacity={0.75}
            style={styles.headerRightBtn}
          >
            <HelpIcon size={22} color="#7C4DFF" />
          </TouchableOpacity>
        }
      />

      {/* 2. MAIN SCROLL CONTAINER */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View style={{ opacity: contentFadeAnim }}>
            
            {/* Title / Description */}
            <Text style={styles.mainHeading}>Report an Issue</Text>
            <Text style={styles.mainSubtitle}>
              Describe the problem you've encountered so our support team can assist you immediately.
            </Text>

            {/* Issue Category dropdown */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(0)]}>
              <Text style={styles.fieldLabel}>Issue Category</Text>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={selectedCategory ? `Selected category: ${selectedCategory}` : 'Select a category'}
                accessibilityRole="combobox"
                activeOpacity={0.8}
                onPress={() => setDropdownOpen(!dropdownOpen)}
                style={[
                  styles.dropdownSelectBox,
                  dropdownOpen && styles.dropdownSelectBoxActive,
                ]}
              >
                <Text
                  style={[
                    styles.dropdownSelectText,
                    !selectedCategory && styles.dropdownPlaceholderText,
                  ]}
                >
                  {selectedCategory || 'Select a category'}
                </Text>
                {dropdownOpen ? (
                  <ChevronUpIcon size={18} color="#8E8E93" />
                ) : (
                  <ChevronDownIcon size={18} color="#8E8E93" />
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Description textarea */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(1)]}>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                placeholder="Provide details about the issue..."
                placeholderTextColor="#8E8E93"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={styles.textAreaBox}
                textAlignVertical="top"
              />
            </Animated.View>

            {/* Visual Evidence Upload Cards */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(2)]}>
              <Text style={styles.fieldLabel}>Visual Evidence</Text>
              <View style={styles.uploadCardsRow}>
                
                {/* Card 1: Take Photo */}
                <Animated.View style={{ transform: [{ scale: card1Scale }] }}>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Take Photo"
                    accessibilityRole="button"
                    activeOpacity={0.9}
                    onPressIn={() => handleCardPressIn(card1Scale)}
                    onPressOut={() => handleCardPressOut(card1Scale)}
                    onPress={handleTakePhoto}
                    style={[styles.uploadCard, { width: uploadCardWidth }]}
                  >
                    <View style={styles.cameraIconCircle}>
                      <CameraIcon size={22} color="#7C4DFF" />
                    </View>
                    <Text style={styles.uploadCardText}>Take Photo</Text>
                    {photoUri && <Text style={styles.attachmentAttachedText} numberOfLines={1}>Attached ✓</Text>}
                  </TouchableOpacity>
                </Animated.View>

                {/* Card 2: Upload File */}
                <Animated.View style={{ transform: [{ scale: card2Scale }] }}>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Upload File"
                    accessibilityRole="button"
                    activeOpacity={0.9}
                    onPressIn={() => handleCardPressIn(card2Scale)}
                    onPressOut={() => handleCardPressOut(card2Scale)}
                    onPress={handleUploadFile}
                    style={[styles.uploadCard, { width: uploadCardWidth }]}
                  >
                    <View style={[styles.cameraIconCircle, styles.fileIconCircleBg]}>
                      <UploadIcon size={22} color="#8E8E93" />
                    </View>
                    <Text style={styles.uploadCardText}>Upload File</Text>
                    {fileName && <Text style={styles.attachmentAttachedText} numberOfLines={1}>{fileName}</Text>}
                  </TouchableOpacity>
                </Animated.View>

              </View>
            </Animated.View>

            {/* Information Info Card */}
            <Animated.View style={[styles.infoCardWrapper, getStaggerStyle(3)]}>
              <InfoCircleIcon size={20} color="#7C4DFF" />
              <Text style={styles.infoCardText}>
                Your GPS location and current order details will be automatically attached to this report to help us solve it faster.
              </Text>
            </Animated.View>

            {/* Action Submit Button */}
            <Animated.View style={[styles.submitBtnWrapper, getStaggerStyle(4), { transform: [{ scale: submitScale }] }]}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Submit emergency report"
                accessibilityRole="button"
                activeOpacity={isSubmitDisabled ? 1 : 0.85}
                disabled={isSubmitDisabled}
                onPressIn={() => !isSubmitDisabled && handleCardPressIn(submitScale)}
                onPressOut={() => !isSubmitDisabled && handleCardPressOut(submitScale)}
                onPress={handleSubmit}
                style={[
                  styles.submitButton,
                  isSubmitDisabled && styles.submitButtonDisabled,
                ]}
              >
                <SubmitPaperplaneIcon size={16} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Bottom Cargo Van Decoration */}
            <View style={styles.bottomDecorationWrapper}>
              <Image
                source={require('../../../assets/images/van_image.png')}
                style={styles.vanImage}
                resizeMode="contain"
              />
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 3. DROPDOWN MODAL DIALOG OVERLAY */}
      <Modal
        visible={dropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.dropdownBottomSheet}>
            <Text style={styles.bottomSheetTitle}>Select Issue Category</Text>
            
            {categoryOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedCategory(opt);
                  setDropdownOpen(false);
                }}
                style={[
                  styles.bottomSheetItem,
                  selectedCategory === opt && styles.bottomSheetItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.bottomSheetItemText,
                    selectedCategory === opt && styles.bottomSheetItemTextActive,
                  ]}
                >
                  {opt}
                </Text>
                {selectedCategory === opt && (
                  <View style={styles.activeCheckDot} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FCFAFF', // Very light lavender background
  },

  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: moderateScale(40),
  },
  mainHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: theme.colors.textDark,
    marginBottom: 6,
  },
  mainSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6C6C70',
    lineHeight: 20,
    marginBottom: 24,
  },
  formFieldBlock: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: theme.colors.textDark,
    marginBottom: 8,
  },
  dropdownSelectBox: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dropdownSelectBoxActive: {
    borderColor: '#7C4DFF',
  },
  dropdownSelectText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.textDark,
  },
  dropdownPlaceholderText: {
    color: '#8E8E93',
  },
  textAreaBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    padding: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.textDark,
    minHeight: 120,
  },
  uploadCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#C7C7CC',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileIconCircleBg: {
    backgroundColor: '#F2F2F7',
  },
  uploadCardText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: theme.colors.textDark,
  },
  attachmentAttachedText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#7C4DFF',
    marginTop: 4,
    maxWidth: '90%',
  },
  infoCardWrapper: {
    flexDirection: 'row',
    backgroundColor: '#F3EFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  infoCardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#512DA8',
    lineHeight: 17,
    flex: 1,
    marginLeft: 12,
  },
  submitBtnWrapper: {
    marginBottom: 20,
  },
  submitButton: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#7C4DFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#B39DFF',
  },
  submitButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  bottomDecorationWrapper: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  vanImage: {
    width: width * 0.5,
    height: 100,
    opacity: 0.85,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  dropdownBottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: theme.spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : theme.spacing.lg,
  },
  bottomSheetTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  bottomSheetItem: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  bottomSheetItemActive: {
    borderBottomColor: '#7C4DFF',
  },
  bottomSheetItemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.textMedium,
  },
  bottomSheetItemTextActive: {
    fontFamily: 'Poppins-SemiBold',
    color: '#7C4DFF',
  },
  activeCheckDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C4DFF',
  },
  headerRightBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
