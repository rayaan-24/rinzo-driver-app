import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';
import { PerformanceScreen } from '../../screens/Performance/PerformanceScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';

const SCREEN_WIDTH = Dimensions.get('window').width;
const TAB_ORDER: TabType[] = ['Home', 'History', 'Alerts', 'Profile'];

const renderScreen = (tab: TabType) => {
  switch (tab) {
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

export const RootNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [prevTab, setPrevTab] = useState<TabType | null>(null);
  const slideAnim = useRef(new Animated.Value(1)).current;
  const directionRef = useRef(-1);
  const insets = useSafeAreaInsets();

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
