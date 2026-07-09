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

const HelpIcon = ({ size = 22, color = '#D97706' }) => (
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

const CameraIcon = ({ size = 22, color = '#D97706' }) => (
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

const SubmitPaperplaneIcon = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// CATEGORY OPTIONS
// ==========================================

const categoryOptions = [
  'Missing Earning or Fare',
  'Payout Delay / Not Received',
  'Bonus or Promo Dispute',
  'Cashout Verification Issue',
  'Tax Document Request',
  'Other Payment Dispute',
];

interface PaymentQueriesScreenProps {
  onBack: () => void;
}

export const PaymentQueriesScreen: React.FC<PaymentQueriesScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [_fileUri, setFileUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const fieldsAnims = useRef(categoryOptions.slice(0, 4).map(() => new Animated.Value(0))).current;

  const card1Scale = useRef(new Animated.Value(1)).current;
  const card2Scale = useRef(new Animated.Value(1)).current;
  const submitScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    Animated.sequence([
      Animated.timing(headerFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(contentFadeAnim, { toValue: 1, duration: 350, useNativeDriver: true }),
      Animated.stagger(80, fieldsAnims.map((anim) =>
        Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true })
      )),
    ]).start();

    return () => backHandler.remove();
  }, [onBack, headerFadeAnim, contentFadeAnim, fieldsAnims]);

  const handleCardPressIn = (scaleVal: Animated.Value) => {
    Animated.timing(scaleVal, { toValue: 0.95, duration: 80, useNativeDriver: true }).start();
  };

  const handleCardPressOut = (scaleVal: Animated.Value) => {
    Animated.timing(scaleVal, { toValue: 1, duration: 120, useNativeDriver: true }).start();
  };

  const handleTakePhoto = async () => {
    const uri = await ImageManager.takePhoto();
    if (uri) {
      setPhotoUri(uri);
      Alert.alert('Screenshot Attached', 'Screen snapshot attached successfully.');
    }
  };

  const handleUploadFile = async () => {
    const uri = await ImageManager.chooseFromGallery();
    if (uri) {
      setFileUri(uri);
      const splitUri = uri.split('/');
      setFileName(splitUri[splitUri.length - 1] || 'screenshot.jpg');
      Alert.alert('Screenshot Uploaded', 'Device file attached successfully.');
    }
  };

  const handleSubmit = () => {
    if (!selectedCategory || !description.trim()) return;

    Alert.alert(
      'Ticket Submitted',
      `Your payment query has been submitted.\n\nCategory: ${selectedCategory}\n\nOur billing team will review this within 24 hours.`,
      [{ text: 'OK', onPress: onBack }]
    );
  };

  const isSubmitDisabled = !selectedCategory || !description.trim();
  const uploadCardWidth = (width - theme.spacing.md * 2 - 12) / 2;

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
      <Header
        title="Payment Help"
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
            <HelpIcon size={22} color="#D97706" />
          </TouchableOpacity>
        }
      />

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
            <Text style={styles.mainHeading}>Payment Query</Text>
            <Text style={styles.mainSubtitle}>
              Facing payout discrepancies, missing driver bonuses, or cashout issues? Request support here.
            </Text>

            {/* Dropdown Field */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(0)]}>
              <Text style={styles.fieldLabel}>Payment Issue Category</Text>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={selectedCategory ? `Selected category: ${selectedCategory}` : 'Select category'}
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
                  {selectedCategory || 'Select category'}
                </Text>
                {dropdownOpen ? (
                  <ChevronUpIcon size={18} color="#8E8E93" />
                ) : (
                  <ChevronDownIcon size={18} color="#8E8E93" />
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Dropdown Options List */}
            {dropdownOpen && (
              <View style={styles.dropdownOptionContainer}>
                {categoryOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      setSelectedCategory(opt);
                      setDropdownOpen(false);
                    }}
                    style={styles.dropdownRowOption}
                  >
                    <Text style={styles.dropdownOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Description Text Input */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(1)]}>
              <Text style={styles.fieldLabel}>Explain the Issue</Text>
              <TextInput
                placeholder="Details of the fare, trip date, or payout schedule problem..."
                placeholderTextColor="#8E8E93"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                style={styles.textAreaBox}
                textAlignVertical="top"
              />
            </Animated.View>

            {/* Evidence Cards */}
            <Animated.View style={[styles.formFieldBlock, getStaggerStyle(2)]}>
              <Text style={styles.fieldLabel}>Attach Screenshot or Payslip (Optional)</Text>
              <View style={styles.uploadCardsRow}>
                
                <Animated.View style={{ transform: [{ scale: card1Scale }] }}>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Take snapshot photo"
                    accessibilityRole="button"
                    activeOpacity={0.85}
                    onPressIn={() => handleCardPressIn(card1Scale)}
                    onPressOut={() => handleCardPressOut(card1Scale)}
                    onPress={handleTakePhoto}
                    style={[styles.uploadBtnCard, { width: uploadCardWidth }]}
                  >
                    <View style={styles.uploadIconCircle}>
                      <CameraIcon size={20} color="#D97706" />
                    </View>
                    <Text style={styles.uploadBtnHeading}>Take Photo</Text>
                    <Text style={styles.uploadBtnSub}>Use camera</Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: card2Scale }] }}>
                  <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Upload file photo"
                    accessibilityRole="button"
                    activeOpacity={0.85}
                    onPressIn={() => handleCardPressIn(card2Scale)}
                    onPressOut={() => handleCardPressOut(card2Scale)}
                    onPress={handleUploadFile}
                    style={[styles.uploadBtnCard, { width: uploadCardWidth }]}
                  >
                    <View style={[styles.uploadIconCircle, styles.grayIconCircle]}>
                      <UploadIcon size={20} color="#8E8E93" />
                    </View>
                    <Text style={styles.uploadBtnHeading}>Upload Image</Text>
                    <Text style={styles.uploadBtnSub}>From gallery</Text>
                  </TouchableOpacity>
                </Animated.View>

              </View>

              {/* Photo Previews */}
              {photoUri && (
                <View style={styles.previewContainer}>
                  <Image source={{ uri: photoUri }} style={styles.previewThumbnail} />
                  <Text style={styles.previewLabelText}>Attached snapshot</Text>
                </View>
              )}

              {fileName && (
                <View style={styles.previewContainer}>
                  <View style={styles.fileIconRep}>
                    <Text style={styles.fileIconChar}>IMG</Text>
                  </View>
                  <Text style={styles.previewLabelText} numberOfLines={1}>
                    {fileName}
                  </Text>
                </View>
              )}
            </Animated.View>

            {/* Submit Button */}
            <Animated.View
              style={[
                styles.actionBtnBlock,
                getStaggerStyle(3),
                { transform: [{ scale: submitScale }] },
              ]}
            >
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Submit payment ticket"
                accessibilityRole="button"
                activeOpacity={isSubmitDisabled ? 1 : 0.85}
                disabled={isSubmitDisabled}
                onPressIn={() => !isSubmitDisabled && handleCardPressIn(submitScale)}
                onPressOut={() => !isSubmitDisabled && handleCardPressOut(submitScale)}
                onPress={handleSubmit}
                style={[
                  styles.primaryActionButton,
                  isSubmitDisabled && styles.disabledActionButton,
                ]}
              >
                <View style={styles.primaryActionButtonContent}>
                  <Text style={styles.primaryActionButtonText}>Submit Ticket</Text>
                  <SubmitPaperplaneIcon size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FCFAFF',
  },
  headerRightBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    fontSize: moderateScale(32),
    color: theme.colors.textDark,
    marginBottom: moderateScale(6),
  },
  mainSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: theme.colors.textMedium,
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(24),
  },
  formFieldBlock: {
    marginBottom: moderateScale(20),
  },
  fieldLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
    marginBottom: moderateScale(8),
  },
  dropdownSelectBox: {
    flexDirection: 'row',
    height: moderateScale(56),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
  },
  dropdownSelectBoxActive: {
    borderColor: '#D97706',
    borderWidth: 1.5,
  },
  dropdownSelectText: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
  },
  dropdownPlaceholderText: {
    fontFamily: 'Poppins-Regular',
    color: '#8E8E93',
  },
  dropdownOptionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#F2F2F7',
    paddingVertical: moderateScale(6),
    marginBottom: moderateScale(20),
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  dropdownRowOption: {
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F2F7',
  },
  dropdownOptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
  },
  textAreaBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: moderateScale(16),
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
    height: moderateScale(120),
  },
  uploadCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadBtnCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#F2F2F7',
    padding: moderateScale(16),
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  uploadIconCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(14),
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  grayIconCircle: {
    backgroundColor: '#F2F2F7',
  },
  uploadBtnHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(12),
    color: theme.colors.textDark,
    marginBottom: moderateScale(2),
  },
  uploadBtnSub: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(10),
    color: '#8E8E93',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(12),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewThumbnail: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(8),
    marginRight: moderateScale(12),
  },
  previewLabelText: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(12),
    color: theme.colors.textMedium,
    flex: 1,
  },
  fileIconRep: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(8),
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  fileIconChar: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(10),
    color: '#8E8E93',
  },
  actionBtnBlock: {
    marginTop: moderateScale(24),
  },
  primaryActionButton: {
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    backgroundColor: '#D97706',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  disabledActionButton: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryActionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryActionButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(16),
    color: '#FFFFFF',
    marginRight: moderateScale(8),
  },
});
