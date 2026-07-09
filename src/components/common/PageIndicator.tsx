import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Animated, Dimensions } from 'react-native';
import { theme } from '../../theme';
import { moderateScale } from '../../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);
const SCREEN_WIDTH = Dimensions.get('window').width;

interface PageIndicatorProps {
  total: number;
  current?: number; // 0-indexed fallback
  scrollX?: Animated.Value;
  style?: StyleProp<ViewStyle>;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({
  total,
  current = 0,
  scrollX,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => {
        if (scrollX) {
          const backgroundColor = scrollX.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            outputRange: ['#E5E7EB', '#6B46DF', '#E5E7EB'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { backgroundColor },
              ]}
            />
          );
        }

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
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    marginHorizontal: s(5),
  },
  inactiveDot: {
    backgroundColor: '#E5E7EB',
  },
  activeDot: {
    backgroundColor: '#6B46DF',
  },
});

export default PageIndicator;
