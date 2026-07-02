import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { HomeScreen } from '../../screens/Home/Home/HomeScreen';
import { HistoryScreen } from '../../screens/OrderHistory/HistoryScreen';
import { PerformanceScreen } from '../../screens/Performance/PerformanceScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { BottomTabBar, TabType } from '../../components/BottomTabBar';

export const RootNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const insets = useSafeAreaInsets();

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
