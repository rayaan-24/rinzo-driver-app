import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';
import { SignalIcon } from './Icons';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  leftCustom?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  leftCustom,
}) => {
  return (
    <View style={styles.container}>
      {/* Left side: Back Button OR Custom Left OR Spacer */}
      <View style={styles.leftContainer}>
        {leftCustom ? (
          leftCustom
        ) : showBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Svg width="18" height="16" viewBox="0 0 18 16" fill="none">
              <Path
                d="M16.5 8H1.5M1.5 8L7.5 14M1.5 8L7.5 2"
                stroke={theme.colors.textDark}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>

      {/* Center: Title (only shown if not rendering custom left component) */}
      {!leftCustom && title && (
        <View style={styles.centerContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}

      {/* Right: Signal indicator (always constant) */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.signalBtn} activeOpacity={0.8}>
          <SignalIcon color={theme.colors.primary} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', // Can change to line if needed
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -theme.spacing.xs,
  },
  spacer: {
    width: 36,
  },
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  titleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#4B2BB0', // Exact purple header title matching screenshots
  },
  rightContainer: {
    zIndex: 10,
  },
  signalBtn: {
    padding: theme.spacing.xs,
    marginRight: -theme.spacing.xs,
  },
});
export default Header;
