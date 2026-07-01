import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import { theme } from '../theme';

interface SwipeButtonProps {
  onSwipe: (isOnline: boolean) => void;
  isOnline: boolean;
}

const HANDLE_SIZE = 48;
const PADDING = 4;

const PowerIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <View
      style={{
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: size * 0.35,
        borderWidth: 2.5,
        borderColor: color,
        borderTopColor: 'transparent',
      }}
    />
    <View
      style={{
        width: 2.5,
        height: size * 0.4,
        backgroundColor: color,
        borderRadius: 1.25,
        position: 'absolute',
        bottom: size * 0.45,
      }}
    />
  </View>
);

export const SwipeButton: React.FC<SwipeButtonProps> = ({ onSwipe, isOnline }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const pan = useRef(new Animated.Value(0)).current;
  const currentValueRef = useRef(0);
  const isOnlineRef = useRef(isOnline);
  isOnlineRef.current = isOnline;

  const maxSwipeDistance = Math.max(0, containerWidth - HANDLE_SIZE - PADDING * 2);
  const maxSwipeRef = useRef(0);
  maxSwipeRef.current = maxSwipeDistance;

  useEffect(() => {
    const listener = pan.addListener(({ value }) => {
      currentValueRef.current = value;
    });
    return () => pan.removeListener(listener);
  }, [pan]);

  useEffect(() => {
    Animated.spring(pan, {
      toValue: isOnline ? maxSwipeDistance : 0,
      useNativeDriver: false,
      friction: 10,
      tension: 50,
    }).start();
  }, [isOnline, maxSwipeDistance, pan]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt) => {
        const max = maxSwipeRef.current;
        if (max <= 0) {return;}
        const targetX = evt.nativeEvent.locationX - PADDING - HANDLE_SIZE / 2;
        pan.setValue(Math.min(Math.max(0, targetX), max));
      },
      onPanResponderRelease: () => {
        const max = maxSwipeRef.current;
        if (max <= 0) {return;}
        const finalValue = currentValueRef.current;
        const threshold = max * 0.5;
        const currentOnline = isOnlineRef.current;

        if (finalValue >= threshold && !currentOnline) {
          Animated.spring(pan, {
            toValue: max,
            useNativeDriver: false,
            friction: 10,
            tension: 50,
          }).start(() => onSwipe(true));
        } else if (finalValue < threshold && currentOnline) {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
            friction: 10,
            tension: 50,
          }).start(() => onSwipe(false));
        } else {
          Animated.spring(pan, {
            toValue: currentOnline ? max : 0,
            useNativeDriver: false,
            friction: 8,
            tension: 40,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        const max = maxSwipeRef.current;
        Animated.spring(pan, {
          toValue: isOnlineRef.current ? max : 0,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }).start();
      },
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const textOpacity = pan.interpolate({
    inputRange: maxSwipeDistance > 0
      ? [0, maxSwipeDistance * 0.35, maxSwipeDistance * 0.65, maxSwipeDistance]
      : [0, 1],
    outputRange: maxSwipeDistance > 0 ? [1, 0, 0, 1] : [1, 1],
    extrapolate: 'clamp',
  });

  const trackColor = isOnline ? '#D1FAE5' : '#EFE8FF';
  const handleColor = isOnline ? theme.colors.success : theme.colors.primary;
  const textColor = isOnline ? '#065F46' : '#8664EC';

  return (
    <View style={[styles.container, { backgroundColor: trackColor }]} onLayout={onLayout} {...panResponder.panHandlers}>
      <Animated.Text
        style={[
          styles.text,
          {
            color: textColor,
            opacity: textOpacity,
          },
        ]}
        numberOfLines={1}
      >
        {isOnline ? 'SWIPE TO GO OFFLINE' : 'SWIPE TO GO ONLINE'}
      </Animated.Text>

      <Animated.View
        style={[
          styles.handle,
          {
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: HANDLE_SIZE / 2,
            backgroundColor: handleColor,
            transform: [{ translateX: pan }],
          },
        ]}
      >
        <PowerIcon color="#FFFFFF" size={20} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    borderRadius: theme.borderRadius.xl,
    padding: PADDING,
    justifyContent: 'center',
    ...theme.shadows.small,
    overflow: 'hidden',
  },
  text: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: 'center',
    letterSpacing: 1.2,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  handle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
