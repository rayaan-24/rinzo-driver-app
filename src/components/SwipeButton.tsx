import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  Vibration,
} from 'react-native';
import { moderateScale } from '../utils/responsive';
const s = (size: number) => moderateScale(size, 0.3);

interface SwipeButtonProps {
  onSwipe: (isOnline: boolean) => void;
  isOnline: boolean;
}

const HANDLE_SIZE = s(48);
const PADDING = s(4);

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

  const gestureStartXRef = useRef(0);
  const startTimeRef = useRef(0);
  const lastToggleTimeRef = useRef(0);

  // Synchronized animation values
  useEffect(() => {
    const listener = pan.addListener(({ value }) => {
      currentValueRef.current = value;
    });
    return () => pan.removeListener(listener);
  }, [pan]);

  // Handle updates from parent components
  useEffect(() => {
    if (maxSwipeDistance > 0) {
      Animated.spring(pan, {
        toValue: isOnline ? maxSwipeDistance : 0,
        useNativeDriver: true,
        stiffness: 220,
        damping: 22,
        mass: 0.8,
      }).start();
    }
  }, [isOnline, maxSwipeDistance, pan]);

  const handleToggle = (nextState: boolean) => {
    const now = Date.now();
    // Debounce/throttle rapid toggling
    if (now - lastToggleTimeRef.current < 450) {
      return;
    }
    lastToggleTimeRef.current = now;

    // Trigger feedback click
    Vibration.vibrate(18);

    // Spring to final position and callback
    Animated.spring(pan, {
      toValue: nextState ? maxSwipeRef.current : 0,
      useNativeDriver: true,
      stiffness: 220,
      damping: 22,
      mass: 0.8,
    }).start(() => {
      onSwipe(nextState);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only hijack gesture responder if dragged horizontally beyond 4px
        return Math.abs(gestureState.dx) > 4;
      },
      onPanResponderGrant: () => {
        gestureStartXRef.current = currentValueRef.current;
        startTimeRef.current = Date.now();
      },
      onPanResponderMove: (_, gestureState) => {
        const max = maxSwipeRef.current;
        if (max <= 0) {
          return;
        }
        // Calculate new drag position with absolute bounds containment
        const newX = gestureStartXRef.current + gestureState.dx;
        pan.setValue(Math.min(Math.max(0, newX), max));
      },
      onPanResponderRelease: (_, gestureState) => {
        const max = maxSwipeRef.current;
        if (max <= 0) {
          return;
        }

        const dragDistance = Math.abs(gestureState.dx);
        const elapsedTime = Date.now() - startTimeRef.current;

        // 1. Check for Instant Tap-To-Toggle
        if (dragDistance < 8 && elapsedTime < 250) {
          handleToggle(!isOnlineRef.current);
          return;
        }

        // 2. Otherwise determine snap destination using velocity & distance thresholding
        const currentValue = currentValueRef.current;
        const threshold = max * 0.5;

        let shouldBeOnline = isOnlineRef.current;

        if (gestureState.vx > 0.4) {
          shouldBeOnline = true;
        } else if (gestureState.vx < -0.4) {
          shouldBeOnline = false;
        } else {
          shouldBeOnline = currentValue >= threshold;
        }

        handleToggle(shouldBeOnline);
      },
      onPanResponderTerminate: () => {
        // Cancel drag safely and return handle to current state anchor
        Animated.spring(pan, {
          toValue: isOnlineRef.current ? maxSwipeRef.current : 0,
          useNativeDriver: true,
          stiffness: 220,
          damping: 22,
          mass: 0.8,
        }).start();
      },
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setContainerWidth(width);
    // Anchor handle location on layout completion
    const targetVal = isOnlineRef.current ? width - HANDLE_SIZE - PADDING * 2 : 0;
    pan.setValue(targetVal);
  };

  // Interpolated opacity bounds for native-driven cross-fades
  const bgOnlineOpacity = pan.interpolate({
    inputRange: maxSwipeDistance > 0 ? [0, maxSwipeDistance] : [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const bgOfflineOpacity = pan.interpolate({
    inputRange: maxSwipeDistance > 0 ? [0, maxSwipeDistance] : [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={styles.container}
      onLayout={onLayout}
      {...panResponder.panHandlers}
    >
      {/* Background Track 1: Offline Track (Purple) */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.trackBg,
          { backgroundColor: '#EFE8FF', opacity: bgOfflineOpacity },
        ]}
      />

      {/* Background Track 2: Online Track (Green) */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.trackBg,
          { backgroundColor: '#D1FAE5', opacity: bgOnlineOpacity },
        ]}
      />

      {/* Text Track 1: Swipe to go Online (Offline state) */}
      <Animated.Text
        style={[
          styles.text,
          { color: '#8664EC', opacity: bgOfflineOpacity },
        ]}
        numberOfLines={1}
      >
        SWIPE TO GO ONLINE
      </Animated.Text>

      {/* Text Track 2: Swipe to go Offline (Online state) */}
      <Animated.Text
        style={[
          styles.text,
          { color: '#065F46', opacity: bgOnlineOpacity },
        ]}
        numberOfLines={1}
      >
        SWIPE TO GO OFFLINE
      </Animated.Text>

      {/* Spring Thumb handle */}
      <Animated.View
        style={[
          styles.handle,
          {
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: HANDLE_SIZE / 2,
            transform: [{ translateX: pan }],
          },
        ]}
      >
        {/* Thumb Background 1: Offline mode (Purple Handle) */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.handleBg,
            { backgroundColor: '#8664EC', opacity: bgOfflineOpacity },
          ]}
        />

        {/* Thumb Background 2: Online mode (Green Handle) */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.handleBg,
            { backgroundColor: '#10B981', opacity: bgOnlineOpacity },
          ]}
        />

        <PowerIcon color="#FFFFFF" size={s(20)} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: s(56),
    width: '100%',
    borderRadius: s(28),
    padding: PADDING,
    justifyContent: 'center',
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  trackBg: {
    borderRadius: s(28),
  },
  text: {
    fontFamily: 'Outfit-Bold',
    fontSize: s(13),
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.2,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  handle: {
    position: 'absolute',
    left: PADDING,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  handleBg: {
    borderRadius: HANDLE_SIZE / 2,
  },
});

export default SwipeButton;
