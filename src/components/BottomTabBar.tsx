import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { HomeIcon, HistoryIcon, PerformanceIcon, ProfileIcon } from './Icons';

export type TabType = 'Home' | 'History' | 'Alerts' | 'Profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  const insets = useSafeAreaInsets();
  const tabs: { id: TabType; label: string; IconComponent: React.ComponentType<any> }[] = [
    { id: 'Home', label: 'Home', IconComponent: HomeIcon },
    { id: 'History', label: 'History', IconComponent: HistoryIcon },
    { id: 'Alerts', label: 'Alerts', IconComponent: PerformanceIcon },
    { id: 'Profile', label: 'Profile', IconComponent: ProfileIcon },
  ];

  return (
    <View
      style={[
        styles.barContainer,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.md,
          backgroundColor: 'rgba(248, 248, 252, 0.85)', // Frosted/semi-transparent background
        },
      ]}
    >
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { IconComponent } = tab;

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              onPress={() => onTabPress(tab.id)}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.highlightContainer,
                  isActive ? styles.activeHighlight : styles.inactiveHighlight,
                ]}
              >
                <IconComponent
                  size={22}
                  color={isActive ? theme.colors.cardBg : theme.colors.textMedium}
                  active={isActive}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
                  ]}
                >
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 0,
    paddingHorizontal: theme.spacing.md,
  },
  tabBar: {
    flexDirection: 'row',
    height: 76, // Perfectly sized bar
    backgroundColor: theme.colors.cardBg,
    borderRadius: 38, // Capsule shape
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xs,
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  highlightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 99,
  },
  activeHighlight: {
    backgroundColor: theme.colors.primary,
  },
  inactiveHighlight: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: theme.colors.cardBg,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  inactiveTabLabel: {
    color: theme.colors.textMedium,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
export default BottomTabBar;
