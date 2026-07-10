import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from '../../utils/responsive';
import { CustomButton } from '../../components/common/CustomButton';
import { PageIndicator } from '../../components/common/PageIndicator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';

import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';
import { PickupDetailsScreen } from '../../screens/Pickup/PickupDetails/PickupDetailsScreen';
import { OrderTransitScreen } from '../../screens/Pickup/OrderTransit/OrderTransitScreen';
import { PickupActiveScreen } from '../../screens/Pickup/PickupActive/PickupActiveScreen';
import { ItemVerificationScreen } from '../../screens/Pickup/ItemVerification/ItemVerificationScreen';
import { VerifyPickupScreen } from '../../screens/Pickup/VerifyPickup/VerifyPickupScreen';
import { OrderCollectedScreen } from '../../screens/Pickup/OrderCollected/OrderCollectedScreen';
import { GenerateQrScreen } from '../../screens/Pickup/GenerateQR/GenerateQrScreen';
import { LabelPreviewScreen } from '../../screens/Pickup/LabelPreview/LabelPreviewScreen';
import { FranchiseVerificationScreen } from '../../screens/Pickup/FranchiseVerification/FranchiseVerificationScreen';
import { OrderCompletedScreen } from '../../screens/Pickup/OrderCompleted/OrderCompletedScreen';
import { FranchiseIntakeScreen } from '../../screens/Pickup/FranchiseIntake/FranchiseIntakeScreen';
import { CameraQrScannerScreen } from '../../screens/Pickup/CameraQrScanner/CameraQrScannerScreen';
import { CollectionCompleteScreen } from '../../screens/Pickup/CollectionComplete/CollectionCompleteScreen';
import { CustomerHandoffScreen } from '../../screens/Pickup/CustomerHandoff/CustomerHandoffScreen';
import { Order } from '../../data/mockData';

// Saad's Screens
import { SplashScreen } from '../../screens/Splash/SplashScreen';
import { OnboardingScreen1 } from '../../screens/Onboarding/Screen1/OnboardingScreen1';
import { OnboardingScreen2 } from '../../screens/Onboarding/Screen2/OnboardingScreen2';
import { OnboardingScreen3 } from '../../screens/Onboarding/Screen3/OnboardingScreen3';
import { AllowLocationScreen } from '../../screens/Auth/AllowLocation/AllowLocationScreen';

// Hannan's Screens
import { LoginPhoneScreen } from '../../screens/Auth/LoginPhone/LoginPhoneScreen';
import { OTPVerificationScreen } from '../../screens/Auth/OTPVerification/OTPVerificationScreen';
import { LoginEmailScreen } from '../../screens/Auth/LoginEmail/LoginEmailScreen';
import { CreateNewPasswordScreen } from '../../screens/Auth/CreateNewPassword/CreateNewPasswordScreen';
import { PasswordResetSuccessScreen } from '../../screens/Auth/PasswordResetSuccess/PasswordResetSuccessScreen';
import { SignupScreen } from '../../screens/Auth/Signup/SignupScreen';
import { AlertsScreen } from '../../screens/Alerts/AlertsScreen';
import { PerformanceScreen } from '../../screens/Profile/Performance/PerformanceScreen';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_ORDER: TabType[] = ['Home', 'History', 'Performance', 'Profile'];

const s = (size: number) => moderateScale(size, 0.3);
const vs = (size: number) => verticalScale(size);

const OnboardingFlow: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleSkip = () => {
    onFinish();
  };

  const handleNext = () => {
    if (currentPage < 2) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (currentPage + 1),
        animated: true,
      });
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (currentPage - 1),
        animated: true,
      });
      setCurrentPage(currentPage - 1);
    }
  };

  // Skip button opacity animation (fades out as page 3 comes into view)
  const skipOpacity = scrollX.interpolate({
    inputRange: [SCREEN_WIDTH, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 1.8],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Next button smoothly fades out as page 3 comes into view
  const nextOpacity = scrollX.interpolate({
    inputRange: [SCREEN_WIDTH, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 1.8],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  // Get Started button smoothly fades in as page 3 comes into view
  const getStartedOpacity = scrollX.interpolate({
    inputRange: [SCREEN_WIDTH, SCREEN_WIDTH * 1.5, SCREEN_WIDTH * 1.8],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={onboardingStyles.container}>
      {/* Top Header Row - STICKY / STATIONARY */}
      <View style={onboardingStyles.header}>
        <Animated.View
          pointerEvents={currentPage < 2 ? 'auto' : 'none'}
          style={{ opacity: skipOpacity }}
        >
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={onboardingStyles.skipBtn}>
            <Text style={onboardingStyles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Swipeable ScrollView (Center only) */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (e: any) => {
              const page = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              if (page !== currentPage) {
                setCurrentPage(page);
              }
            }
          }
        )}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {/* Page 1 */}
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <View style={onboardingStyles.illustrationContainer}>
            <Image
              source={require('../../assets/images/onboarding1_courier.jpg')}
              style={onboardingStyles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <View style={onboardingStyles.content}>
            <Text style={onboardingStyles.title}>Pickup. Track. Deliver.</Text>
            <Text style={onboardingStyles.subtitle}>
              Receive assigned orders and complete{"\n"}pickups with confidence.
            </Text>
          </View>
        </View>

        {/* Page 2 */}
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <View style={onboardingStyles.illustrationContainer}>
            <Image
              source={require('../../assets/images/onboarding2_courier.jpg')}
              style={[onboardingStyles.illustrationImage, { marginBottom: vs(-95) }]}
              resizeMode="contain"
            />
          </View>
          <View style={onboardingStyles.content}>
            <Text style={onboardingStyles.title}>Every Parcel Tracked</Text>
            <Text style={onboardingStyles.subtitle}>
              Each laundry bag receives a unique QR tag{"\n"}for complete traceability.
            </Text>
          </View>
        </View>

        {/* Page 3 */}
        <View style={{ width: SCREEN_WIDTH, flex: 1 }}>
          <View style={onboardingStyles.illustrationContainer}>
            <Image
              source={require('../../assets/images/onboarding3_courier.jpg')}
              style={onboardingStyles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <View style={onboardingStyles.content}>
            <Text style={onboardingStyles.title}>Secure Every Delivery</Text>
            <Text style={onboardingStyles.subtitle}>
              Verify delivery with OTP and ensure every order reaches the right customer.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Footer - STICKY / STATIONARY */}
      <View style={onboardingStyles.footer}>
        <PageIndicator total={3} current={currentPage} scrollX={scrollX} style={onboardingStyles.indicator} />
        
        <TouchableOpacity
          onPress={currentPage === 2 ? onFinish : handleNext}
          activeOpacity={0.8}
          style={onboardingStyles.button}
        >
          <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Next Text */}
            <Animated.Text
              style={[
                onboardingStyles.buttonText,
                {
                  opacity: nextOpacity,
                  position: 'absolute',
                }
              ]}
            >
              Next
            </Animated.Text>

            {/* Get Started Text */}
            <Animated.Text
              style={[
                onboardingStyles.buttonText,
                {
                  opacity: getStartedOpacity,
                  position: 'absolute',
                }
              ]}
            >
              Get Started  →
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xs,
    height: vs(48),
  },
  headerSpacer: {
    height: vs(48),
  },
  skipBtn: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  skipText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textDecorationLine: 'underline',
  },
  illustrationContainer: {
    flex: 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(8),
  },
  illustrationImage: {
    width: SCREEN_WIDTH * 1.05,
    height: '100%',
    maxHeight: vs(460),
    marginBottom: vs(-65),
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(8),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: vs(8),
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: s(15),
    color: '#7C7985',
    textAlign: 'center',
    lineHeight: s(22),
    paddingHorizontal: theme.spacing.md,
    marginBottom: vs(8),
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: vs(20),
    paddingTop: theme.spacing.xs,
  },
  indicator: {
    marginBottom: vs(20),
  },
  button: {
    width: '100%',
    height: vs(54),
    borderRadius: s(16),
    backgroundColor: '#7952F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  buttonColumn: {
    flexDirection: 'column',
    width: '100%',
  },
  getStartedButton: {
    width: '100%',
    height: vs(52),
    borderRadius: s(16),
    backgroundColor: '#7952F3',
  },
  backButton: {
    width: '100%',
    height: vs(52),
    borderRadius: s(16),
    backgroundColor: '#FFFFFF',
    borderColor: '#E2DEF0',
    borderWidth: 1,
    marginTop: vs(10),
  },
});

type FlowState =
  | 'Splash'
  | 'Onboarding'
  | 'AllowLocation'
  | 'LoginPhone'
  | 'LoginEmail'
  | 'OTPVerification'
  | 'CreateNewPassword'
  | 'PasswordResetSuccess'
  | 'SignUp'
  | 'Main';

export const RootNavigator: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>('Splash');
  const [phone, setPhone] = useState<string>('');
  const [verificationType, setVerificationType] = useState<'phone' | 'email'>('phone');
  const [emailAddress, setEmailAddress] = useState<string>('');

  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [isHideTabBar, setIsHideTabBar] = useState(false);
  const [prevTab, setPrevTab] = useState<TabType | null>(null);

  useEffect(() => {
    if (activeTab !== 'Profile') {
      setIsHideTabBar(false);
    }
  }, [activeTab]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [transitOrder, setTransitOrder] = useState<Order | null>(null);
  const [activePickupOrder, setActivePickupOrder] = useState<Order | null>(null);
  const [verificationOrder, setVerificationOrder] = useState<Order | null>(null);
  const [verifyOtpOrder, setVerifyOtpOrder] = useState<Order | null>(null);
  const [collectedOrder, setCollectedOrder] = useState<Order | null>(null);
  const [generateQrOrder, setGenerateQrOrder] = useState<Order | null>(null);
  const [previewLabelBag, setPreviewLabelBag] = useState<any | null>(null);
  const [transitMode, setTransitMode] = useState<'pickup' | 'dispatch' | 'franchise' | 'delivery_transit' | 'franchise_pickup' | 'delivery_drop' | 'reached_drop'>('pickup');
  const [showAcceptedBanner, setShowAcceptedBanner] = useState(false);
  const [isVerifyingFranchise, setIsVerifyingFranchise] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isIntakeActive, setIsIntakeActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCollectionComplete, setIsCollectionComplete] = useState(false);
  const [isCustomerHandoffActive, setIsCustomerHandoffActive] = useState(false);
  const slideAnim = useRef(new Animated.Value(1)).current;
  const directionRef = useRef(-1);
  const insets = useSafeAreaInsets();

  const authFadeAnim = useRef(new Animated.Value(1)).current;

  const navigateToAuthScreen = (nextState: FlowState) => {
    Animated.timing(authFadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setFlowState(nextState);
      Animated.timing(authFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // ===================== AUTH / ONBOARDING FLOW =====================

  if (flowState === 'Splash') {
    return <SplashScreen onFinish={() => setFlowState('Onboarding')} />;
  }

  if (flowState === 'Onboarding') {
    return <OnboardingFlow onFinish={() => setFlowState('AllowLocation')} />;
  }

  if (flowState === 'AllowLocation') {
    return (
      <AllowLocationScreen
        onAllow={() => setFlowState('LoginPhone')}
        onDeny={() => setFlowState('LoginPhone')}
      />
    );
  }

  if (flowState === 'LoginPhone') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <LoginPhoneScreen
          onSendOTP={(pNum) => {
            setVerificationType('phone');
            setPhone(pNum);
            navigateToAuthScreen('OTPVerification');
          }}
          onNavigateToEmail={() => navigateToAuthScreen('LoginEmail')}
          onNavigateToSignUp={() => navigateToAuthScreen('SignUp')}
          onBack={() => navigateToAuthScreen('AllowLocation')}
        />
      </Animated.View>
    );
  }

  if (flowState === 'LoginEmail') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <LoginEmailScreen
          onLoginSuccess={() => navigateToAuthScreen('Main')}
          onNavigateToPhone={() => navigateToAuthScreen('LoginPhone')}
          onNavigateToForgotPassword={(emailVal) => {
            setVerificationType('email');
            setEmailAddress(emailVal || 'driver@rinzo.com');
            navigateToAuthScreen('OTPVerification');
          }}
          onNavigateToSignUp={() => navigateToAuthScreen('SignUp')}
        />
      </Animated.View>
    );
  }

  if (flowState === 'CreateNewPassword') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <CreateNewPasswordScreen
          onResetSuccess={() => navigateToAuthScreen('PasswordResetSuccess')}
          onBack={() => navigateToAuthScreen('LoginEmail')}
        />
      </Animated.View>
    );
  }

  if (flowState === 'PasswordResetSuccess') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <PasswordResetSuccessScreen
          onGoToLogin={() => navigateToAuthScreen('LoginEmail')}
        />
      </Animated.View>
    );
  }

  if (flowState === 'SignUp') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <SignupScreen
          onSignUpSuccess={() => navigateToAuthScreen('LoginEmail')}
          onBack={() => navigateToAuthScreen('LoginEmail')}
        />
      </Animated.View>
    );
  }

  if (flowState === 'OTPVerification') {
    return (
      <Animated.View style={{ flex: 1, opacity: authFadeAnim }}>
        <OTPVerificationScreen
          verificationType={verificationType}
          phoneNumber={phone ? `+91 ${phone}` : '+91 87777 34343'}
          emailAddress={emailAddress || 'driver@rinzo.com'}
          onVerify={() => {
            if (verificationType === 'email') {
              navigateToAuthScreen('CreateNewPassword');
            } else {
              navigateToAuthScreen('Main');
            }
          }}
          onChangePhone={() => {
            if (verificationType === 'email') {
              navigateToAuthScreen('LoginEmail');
            } else {
              navigateToAuthScreen('LoginPhone');
            }
          }}
          onBack={() => {
            if (verificationType === 'email') {
              navigateToAuthScreen('LoginEmail');
            } else {
              navigateToAuthScreen('LoginPhone');
            }
          }}
        />
      </Animated.View>
    );
  }

  // ===================== MAIN / PICKUP FLOW =====================

  const renderScreen = (tab: TabType) => {
    switch (tab) {
      case 'Home':
        return (
          <HomeScreen
            onSelectOrder={setSelectedOrder}
            onStartPickup={(order) => {
              setTransitOrder(order);
              setTransitMode(order.type === 'delivery' ? 'delivery_transit' : 'pickup');
            }}
          />
        );
      case 'History':
        return <HistoryScreen />;
      case 'Performance':
        return <PerformanceScreen />;
      case 'Profile':
        return <ProfileScreen onSubScreenChange={(isSub) => setIsHideTabBar(isSub)} />;
      default:
        return (
          <HomeScreen
            onSelectOrder={setSelectedOrder}
            onStartPickup={setTransitOrder}
          />
        );
    }
  };

  const handleTabPress = (tab: TabType) => {
    if (tab === activeTab) {return;}
    const fromIdx = TAB_ORDER.indexOf(activeTab);
    const toIdx = TAB_ORDER.indexOf(tab);
    const dir = toIdx > fromIdx ? -1 : 1;
    directionRef.current = dir;
    setPrevTab(activeTab);
    setActiveTab(tab);
    slideAnim.setValue(0);
    Animated.spring(slideAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 9,
      tension: 50,
    }).start((result) => {
      if (result.finished) {setPrevTab(null);}
    });
  };

  if (isIntakeActive && transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <FranchiseIntakeScreen
          order={transitOrder}
          onBack={() => setIsIntakeActive(false)}
          onLaunchScanner={() => {
            setIsIntakeActive(false);
            setIsCameraActive(true);
          }}
        />
      </View>
    );
  }

  if (isCameraActive && transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <CameraQrScannerScreen
          onBack={() => {
            setIsCameraActive(false);
            setIsIntakeActive(true);
          }}
          onScanSuccess={() => {
            setIsCameraActive(false);
            setIsCollectionComplete(true);
          }}
        />
      </View>
    );
  }

  if (isCollectionComplete && transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <CollectionCompleteScreen
          onContinue={() => {
            setIsCollectionComplete(false);
            setTransitMode('delivery_drop');
          }}
        />
      </View>
    );
  }

  if (isCustomerHandoffActive) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <CustomerHandoffScreen
          onBack={() => {
            setIsCustomerHandoffActive(false);
          }}
          onConfirm={() => {
            setIsCustomerHandoffActive(false);
            setIsOrderCompleted(true);
          }}
        />
      </View>
    );
  }

  if (isVerifyingFranchise && transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <FranchiseVerificationScreen
          order={transitOrder}
          onBack={() => setIsVerifyingFranchise(false)}
          onConfirm={() => {
            setIsVerifyingFranchise(false);
            setIsOrderCompleted(true);
          }}
        />
      </View>
    );
  }

  if (isOrderCompleted && transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <OrderCompletedScreen
          order={transitOrder}
          onBackToHome={() => {
            setIsOrderCompleted(false);
            setTransitMode('pickup');
            setTransitOrder(null);
            setSelectedOrder(null);
          }}
        />
      </View>
    );
  }

  if (previewLabelBag && generateQrOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <LabelPreviewScreen
          order={generateQrOrder}
          bag={previewLabelBag}
          onBack={() => setPreviewLabelBag(null)}
        />
      </View>
    );
  }

  if (generateQrOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <GenerateQrScreen
          order={generateQrOrder}
          onBack={() => setGenerateQrOrder(null)}
          onConfirm={() => {
            setTransitMode('dispatch');
            setTransitOrder(generateQrOrder);
            setGenerateQrOrder(null);
            setCollectedOrder(null);
            setVerifyOtpOrder(null);
            setVerificationOrder(null);
            setActivePickupOrder(null);
          }}
          onSelectBag={setPreviewLabelBag}
        />
      </View>
    );
  }

  if (collectedOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <OrderCollectedScreen
          order={collectedOrder}
          onBack={() => setCollectedOrder(null)}
          onConfirm={() => {
            setGenerateQrOrder(collectedOrder);
          }}
        />
      </View>
    );
  }

  if (verifyOtpOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <VerifyPickupScreen
          order={verifyOtpOrder}
          onBack={() => setVerifyOtpOrder(null)}
          onConfirm={() => {
            setCollectedOrder(verifyOtpOrder);
          }}
        />
      </View>
    );
  }

  if (verificationOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <ItemVerificationScreen
          order={verificationOrder}
          onBack={() => setVerificationOrder(null)}
          onConfirm={() => {
            setVerifyOtpOrder(verificationOrder);
          }}
        />
      </View>
    );
  }

  if (activePickupOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <PickupActiveScreen
          order={activePickupOrder}
          onBack={() => setActivePickupOrder(null)}
          onReachedPickup={setVerificationOrder}
        />
      </View>
    );
  }

  if (transitOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <OrderTransitScreen
          order={transitOrder}
          onBack={() => {
            if (showAcceptedBanner) {
              setShowAcceptedBanner(false);
              setTransitMode('dispatch');
            } else if (transitMode === 'franchise') {
              setTransitMode('dispatch');
            } else if (transitMode === 'franchise_pickup') {
              setTransitMode('delivery_transit');
            } else if (transitMode === 'reached_drop') {
              setTransitMode('delivery_drop');
            } else if (transitMode === 'delivery_drop') {
              setIsCollectionComplete(true);
            } else if (transitMode === 'dispatch') {
              setTransitMode('pickup');
              setGenerateQrOrder(transitOrder);
              setTransitOrder(null);
            } else {
              setTransitOrder(null);
            }
          }}
          onViewOrderPress={() => {
            if (showAcceptedBanner) {
              setShowAcceptedBanner(false);
              setTransitMode('dispatch');
            } else if (transitMode === 'franchise') {
              setTransitMode('dispatch');
            } else if (transitMode === 'franchise_pickup') {
              setTransitMode('delivery_transit');
            } else if (transitMode === 'reached_drop') {
              setTransitMode('delivery_drop');
            } else if (transitMode === 'delivery_drop') {
              setIsCollectionComplete(true);
            } else if (transitMode === 'dispatch') {
              setTransitMode('pickup');
              setGenerateQrOrder(transitOrder);
              setTransitOrder(null);
            } else {
              setTransitOrder(null);
            }
          }}
          onNavigateToPickup={(order: Order) => {
            if (transitMode === 'pickup') {
              setActivePickupOrder(order);
              setShowAcceptedBanner(false);
            } else if (transitMode === 'delivery_transit') {
              setTransitMode('franchise_pickup');
            } else if (transitMode === 'franchise_pickup') {
              setIsIntakeActive(true);
            } else if (transitMode === 'delivery_drop') {
              setTransitMode('reached_drop');
            } else if (transitMode === 'reached_drop') {
              setIsCustomerHandoffActive(true);
            } else if (transitMode === 'dispatch') {
              setTransitMode('franchise');
            } else if (transitMode === 'franchise') {
              setIsVerifyingFranchise(true);
            }
          }}
          transitMode={transitMode}
          showAcceptedBanner={showAcceptedBanner}
          onAcceptNewOrder={() => {
            setTransitMode('pickup');
            setShowAcceptedBanner(true);
          }}
        />
      </View>
    );
  }

  if (selectedOrder) {
    return (
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <PickupDetailsScreen
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onStartPickup={setTransitOrder}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.screenContainer}>
        {prevTab && (
          <Animated.View
            style={[
              styles.screenOverlay,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, directionRef.current * SCREEN_WIDTH],
                    }),
                  },
                ],
              },
            ]}
          >
            {renderScreen(prevTab)}
          </Animated.View>
        )}
        <Animated.View
          style={[
            styles.screenOverlay,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      -directionRef.current * SCREEN_WIDTH,
                      0,
                    ],
                  }),
                },
              ],
            },
          ]}
        >
          {renderScreen(activeTab)}
        </Animated.View>
      </View>
      {!isHideTabBar && (
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  screenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default RootNavigator;