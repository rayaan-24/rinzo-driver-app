import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { HomeIcon, HistoryIcon, PerformanceIcon, ProfileIcon } from './Icons';

export type TabType = 'Home' | 'History' | 'Performance' | 'Profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  const tabs: { id: TabType; label: string; IconComponent: React.ComponentType<any> }[] = [
    { id: 'Home', label: 'Home', IconComponent: HomeIcon },
    { id: 'History', label: 'History', IconComponent: HistoryIcon },
    { id: 'Performance', label: 'Performance', IconComponent: PerformanceIcon },
    { id: 'Profile', label: 'Profile', IconComponent: ProfileIcon },
  ];

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { IconComponent } = tab;

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.8}
              onPress={() => onTabPress(tab.id)}
              style={[
                styles.tabItem,
                isActive ? styles.activeTabItem : styles.inactiveTabItem,
              ]}
            >
              <IconComponent
                size={isActive ? 18 : 20}
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
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 24, // Float it slightly above the bottom
    left: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    height: 68,
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.borderRadius.xxl, // Ultra rounded floating style
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    ...theme.shadows.large,
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTabItem: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  activeTabLabel: {
    color: theme.colors.cardBg,
    fontSize: theme.typography.fontSize.sm,
    marginLeft: 6,
  },
  inactiveTabLabel: {
    color: theme.colors.textMedium,
    fontSize: 10,
    marginTop: 4,
  },
});
