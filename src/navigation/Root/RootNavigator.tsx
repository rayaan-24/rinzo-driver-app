import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';
import { PerformanceScreen } from '../../screens/Performance/PerformanceScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';

// Saad's Screens for initial flow
import { SplashScreen } from '../../screens/Splash/SplashScreen';
import { OnboardingScreen1 } from '../../screens/Onboarding/Screen1/OnboardingScreen1';
import { OnboardingScreen2 } from '../../screens/Onboarding/Screen2/OnboardingScreen2';
import { OnboardingScreen3 } from '../../screens/Onboarding/Screen3/OnboardingScreen3';
import { AllowLocationScreen } from '../../screens/Auth/AllowLocation/AllowLocationScreen';
import { LoginPhoneScreen } from '../../screens/Auth/LoginPhone/LoginPhoneScreen';
import { OTPVerificationScreen } from '../../screens/Auth/OTPVerification/OTPVerificationScreen';

export const RootNavigator: React.FC = () => {
  type FlowState =
    | 'Splash'
    | 'Onboarding1'
    | 'Onboarding2'
    | 'Onboarding3'
    | 'AllowLocation'
    | 'LoginPhone'
    | 'OTPVerification'
    | 'Main';
  const [flowState, setFlowState] = useState<FlowState>('Splash');
  const [phone, setPhone] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const insets = useSafeAreaInsets();

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
          setPhone(pNum);
          setFlowState('OTPVerification');
        }}
        onBack={() => setFlowState('AllowLocation')}
      />
    );
  }
  if (flowState === 'OTPVerification') {
    return (
      <OTPVerificationScreen
        phoneNumber={phone ? `+91 ${phone}` : '+91 87777 34343'}
        onVerify={() => setFlowState('Main')}
        onChangePhone={() => setFlowState('LoginPhone')}
        onBack={() => setFlowState('LoginPhone')}
      />
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'History':
        return <HistoryScreen />;
      case 'Alerts':
        return <PerformanceScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

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
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />
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
});
export default RootNavigator;
