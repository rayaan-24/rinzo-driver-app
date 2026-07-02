import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';
import { PerformanceScreen } from '../../screens/Performance/PerformanceScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';
import { PickupDetailsScreen } from '../../screens/Pickup/PickupDetails/PickupDetailsScreen';
import { OrderTransitScreen } from '../../screens/Pickup/OrderTransit/OrderTransitScreen';
import { PickupActiveScreen } from '../../screens/Pickup/PickupActive/PickupActiveScreen';
import { ItemVerificationScreen } from '../../screens/Pickup/ItemVerification/ItemVerificationScreen';
import { VerifyPickupScreen } from '../../screens/Pickup/VerifyPickup/VerifyPickupScreen';
import { Order } from '../../data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_ORDER: TabType[] = ['Home', 'History', 'Alerts', 'Profile'];

export const RootNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [prevTab, setPrevTab] = useState<TabType | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [transitOrder, setTransitOrder] = useState<Order | null>(null);
  const [activePickupOrder, setActivePickupOrder] = useState<Order | null>(null);
  const [verificationOrder, setVerificationOrder] = useState<Order | null>(null);
  const [verifyOtpOrder, setVerifyOtpOrder] = useState<Order | null>(null);
  const slideAnim = useRef(new Animated.Value(1)).current;
  const directionRef = useRef(-1);
  const insets = useSafeAreaInsets();

  const renderScreen = (tab: TabType) => {
    switch (tab) {
      case 'Home':
        return (
          <HomeScreen
            onSelectOrder={setSelectedOrder}
            onStartPickup={setTransitOrder}
          />
        );
      case 'History':
        return <HistoryScreen />;
      case 'Alerts':
        return <PerformanceScreen />;
      case 'Profile':
        return <ProfileScreen />;
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
            setVerifyOtpOrder(null);
            setVerificationOrder(null);
            setActivePickupOrder(null);
            setTransitOrder(null);
            setSelectedOrder(null);
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
          onBack={() => setTransitOrder(null)}
          onViewOrderPress={() => setTransitOrder(null)}
          onNavigateToPickup={setActivePickupOrder}
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
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
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
  screenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default RootNavigator;
