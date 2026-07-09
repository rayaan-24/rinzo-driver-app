import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
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
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const slideX = useRef(new Animated.Value(0)).current;

  const tabs: { id: TabType; label: string; IconComponent: React.ComponentType<any> }[] = [
    { id: 'Home', label: 'Home', IconComponent: HomeIcon },
    { id: 'History', label: 'History', IconComponent: HistoryIcon },
    { id: 'Alerts', label: 'Alerts', IconComponent: PerformanceIcon },
    { id: 'Profile', label: 'Profile', IconComponent: ProfileIcon },
  ];

  // Dynamic spring sliding animation trigger
  useEffect(() => {
    if (tabBarWidth > 0) {
      const tabWidth = (tabBarWidth - 16) / 4;
      const index = tabs.findIndex((t) => t.id === activeTab);
      const toValue = 8 + index * tabWidth + (tabWidth - 36) / 2;

      Animated.spring(slideX, {
        toValue,
        useNativeDriver: true,
        stiffness: 240,
        damping: 24,
        mass: 0.8,
      }).start();
    }
  }, [activeTab, tabBarWidth, slideX]);

  return (
    <View
      style={[
        styles.barContainer,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.md,
          backgroundColor: 'transparent', // Transparent background to show floating capsule
        },
      ]}
    >
      <View
        style={styles.tabBar}
        onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}
      >
        {/* Sliding Indicator Circle Background */}
        {tabBarWidth > 0 && (
          <Animated.View
            style={[
              styles.slidingIndicator,
              {
                transform: [{ translateX: slideX }],
              },
            ]}
          />
        )}

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
              <View style={styles.highlightContainer}>
                <IconComponent
                  size={18}
                  color={isActive ? theme.colors.cardBg : theme.colors.textMedium}
                  active={isActive}
                />
              </View>
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
  barContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  tabBar: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.cardBg,
    borderRadius: 40,
    paddingHorizontal: 8,
    borderWidth: 0,
    overflow: 'hidden',
    shadowColor: '#0A0A14',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 2,
  },
  slidingIndicator: {
    position: 'absolute',
    width: 68,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.primary,
    top: 7,
    marginLeft: -16,
    zIndex: 1,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 4,
  },
  highlightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    marginTop: 3,
    textAlign: 'center',
    letterSpacing: 0.1,
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
