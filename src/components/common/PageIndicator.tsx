import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { theme } from '../../theme';
import { moderateScale } from '../../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);

interface PageIndicatorProps {
  total: number;
  current: number; // 0-indexed
  style?: StyleProp<ViewStyle>;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  total,
  current,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isActive ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: s(8),
    borderRadius: s(4),
    marginHorizontal: s(4),
  },
  inactiveDot: {
    width: s(8),
    backgroundColor: theme.colors.border,
  },
  activeDot: {
    width: s(24),
    backgroundColor: theme.colors.primary,
  },
});

export default PageIndicator;
