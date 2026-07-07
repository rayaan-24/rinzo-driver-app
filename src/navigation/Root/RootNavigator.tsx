import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
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

type FlowState =
  | 'Splash'
  | 'Onboarding1'
  | 'Onboarding2'
  | 'Onboarding3'
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

  // ===================== AUTH / ONBOARDING FLOW =====================

  if (flowState === 'Splash') {
    return <SplashScreen onFinish={() => setFlowState('Onboarding1')} />;
  }

  if (flowState === 'Onboarding1') {
    return (
      <OnboardingScreen1
        onNext={() => setFlowState('Onboarding2')}
        onSkip={() => setFlowState('AllowLocation')}
      />
    );
  }

  if (flowState === 'Onboarding2') {
    return (
      <OnboardingScreen2
        onNext={() => setFlowState('Onboarding3')}
        onBack={() => setFlowState('Onboarding1')}
        onSkip={() => setFlowState('AllowLocation')}
      />
    );
  }

  if (flowState === 'Onboarding3') {
    return (
      <OnboardingScreen3
        onGetStarted={() => setFlowState('AllowLocation')}
        onBack={() => setFlowState('Onboarding2')}
      />
    );
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
      <LoginPhoneScreen
        onSendOTP={(pNum) => {
          setVerificationType('phone');
          setPhone(pNum);
          setFlowState('OTPVerification');
        }}
        onNavigateToEmail={() => setFlowState('LoginEmail')}
        onNavigateToSignUp={() => setFlowState('SignUp')}
        onBack={() => setFlowState('AllowLocation')}
      />
    );
  }

  if (flowState === 'LoginEmail') {
    return (
      <LoginEmailScreen
        onLoginSuccess={() => setFlowState('Main')}
        onNavigateToPhone={() => setFlowState('LoginPhone')}
        onNavigateToForgotPassword={(emailVal) => {
          setVerificationType('email');
          setEmailAddress(emailVal || 'driver@rinzo.com');
          setFlowState('OTPVerification');
        }}
        onNavigateToSignUp={() => setFlowState('SignUp')}
      />
    );
  }

  if (flowState === 'CreateNewPassword') {
    return (
      <CreateNewPasswordScreen
        onResetSuccess={() => setFlowState('PasswordResetSuccess')}
        onBack={() => setFlowState('LoginEmail')}
      />
    );
  }

  if (flowState === 'PasswordResetSuccess') {
    return (
      <PasswordResetSuccessScreen
        onGoToLogin={() => setFlowState('LoginEmail')}
      />
    );
  }

  if (flowState === 'SignUp') {
    return (
      <SignupScreen
        onSignUpSuccess={() => setFlowState('LoginEmail')}
        onBack={() => setFlowState('LoginEmail')}
      />
    );
  }

  if (flowState === 'OTPVerification') {
    return (
      <OTPVerificationScreen
        verificationType={verificationType}
        phoneNumber={phone ? `+91 ${phone}` : '+91 87777 34343'}
        emailAddress={emailAddress || 'driver@rinzo.com'}
        onVerify={() => {
          if (verificationType === 'email') {
            setFlowState('CreateNewPassword');
          } else {
            setFlowState('Main');
          }
        }}
        onChangePhone={() => {
          if (verificationType === 'email') {
            setFlowState('LoginEmail');
          } else {
            setFlowState('LoginPhone');
          }
        }}
        onBack={() => {
          if (verificationType === 'email') {
            setFlowState('LoginEmail');
          } else {
            setFlowState('LoginPhone');
          }
        }}
      />
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