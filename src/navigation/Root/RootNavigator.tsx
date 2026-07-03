import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';
import { AlertsScreen } from '../../screens/Alerts/AlertsScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';

export const RootNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [isHideTabBar, setIsHideTabBar] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (activeTab !== 'Profile') {
      setIsHideTabBar(false);
    }
  }, [activeTab]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'History':
        return <HistoryScreen />;
      case 'Alerts':
        return <AlertsScreen />;
      case 'Profile':
        return <ProfileScreen onSubScreenChange={(isSub) => setIsHideTabBar(isSub)} />;
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
      {!isHideTabBar && (
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
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
});
export default RootNavigator;
