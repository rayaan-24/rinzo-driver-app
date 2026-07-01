import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface IconProps {
  color?: string;
  size?: number;
  active?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20, active }) => {
  const activeColor = active ? theme.colors.cardBg : color;
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Roof */}
      <View
        style={[
          styles.triangle,
          {
            borderBottomColor: activeColor,
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size / 2.5,
          },
        ]}
      />
      {/* Base */}
      <View
        style={[
          styles.houseBase,
          {
            backgroundColor: activeColor,
            width: size * 0.8,
            height: size * 0.5,
            marginTop: -1,
          },
        ]}
      />
    </View>
  );
};

export const HistoryIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Clock Outer Circle */}
      <View
        style={[
          styles.clockOuter,
          {
            borderColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      >
        {/* Clock Hands */}
        <View style={[styles.clockHandHour, { backgroundColor: color }]} />
        <View style={[styles.clockHandMinute, { backgroundColor: color }]} />
      </View>
    </View>
  );
};

export const PerformanceIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Bell Body */}
      <View
        style={[
          styles.bellBody,
          {
            borderColor: color,
            borderTopLeftRadius: size / 2,
            borderTopRightRadius: size / 2,
            width: size * 0.75,
            height: size * 0.7,
            borderWidth: 2,
          },
        ]}
      />
      {/* Bell Clapper */}
      <View
        style={[
          styles.bellClapper,
          {
            backgroundColor: color,
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: size * 0.1,
            marginTop: 1,
          },
        ]}
      />
    </View>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      {/* Head */}
      <View
        style={[
          styles.profileHead,
          {
            borderColor: color,
            width: size * 0.45,
            height: size * 0.45,
            borderRadius: (size * 0.45) / 2,
            borderWidth: 2,
          },
        ]}
      />
      {/* Shoulders */}
      <View
        style={[
          styles.profileShoulders,
          {
            borderColor: color,
            width: size * 0.85,
            height: size * 0.35,
            borderTopLeftRadius: size * 0.3,
            borderTopRightRadius: size * 0.3,
            borderWidth: 2,
            borderBottomWidth: 0,
            marginTop: 2,
          },
        ]}
      />
    </View>
  );
};

export const SignalIcon: React.FC<{ color?: string; size?: number }> = ({ color = theme.colors.primary, size = 20 }) => {
  return (
    <View style={[styles.signalContainer, { width: size, height: size }]}>
      <View style={[styles.signalArc, styles.signalArcLeft, { borderColor: color }]} />
      <View style={[styles.signalArc, styles.signalArcLeftInner, { borderColor: color }]} />
      <View style={[styles.signalDot, { backgroundColor: color }]} />
      <View style={[styles.signalArc, styles.signalArcRightInner, { borderColor: color }]} />
      <View style={[styles.signalArc, styles.signalArcRight, { borderColor: color }]} />
    </View>
  );
};

export const MapMarkerIcon: React.FC<{ color?: string; size?: number }> = ({ color = theme.colors.primary, size = 12 }) => {
  return (
    <View style={[styles.markerContainer, { width: size, height: size * 1.3 }]}>
      <View
        style={[
          styles.markerHead,
          {
            borderColor: color,
            backgroundColor: 'transparent',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 1.5,
          },
        ]}
      />
      <View
        style={[
          styles.markerTip,
          {
            borderTopColor: color,
            borderLeftWidth: size / 3,
            borderRightWidth: size / 3,
            borderTopWidth: size / 2,
          },
        ]}
      />
    </View>
  );
};

export const ChevronRightIcon: React.FC<{ color?: string; size?: number }> = ({ color = theme.colors.primary, size = 16 }) => {
  return (
    <View style={[styles.chevronContainer, { width: size, height: size }]}>
      <View style={[styles.chevronArrow, { borderRightColor: color, borderTopColor: color }]} />
      <View style={[styles.chevronArrow, { borderRightColor: color, borderTopColor: color, marginLeft: -4 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  houseBase: {
    borderRadius: 1,
  },
  clockOuter: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockHandHour: {
    position: 'absolute',
    width: 2,
    height: 5,
    borderRadius: 1,
    top: '50%',
    marginTop: -5,
  },
  clockHandMinute: {
    position: 'absolute',
    width: 4,
    height: 2,
    borderRadius: 1,
    left: '50%',
  },
  bellBody: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellClapper: {},
  profileHead: {},
  profileShoulders: {},
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  signalArc: {
    position: 'absolute',
    borderWidth: 1.5,
    borderRadius: 100,
    backgroundColor: 'transparent',
  },
  signalArcLeft: {
    width: 18,
    height: 18,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    left: -4,
  },
  signalArcLeftInner: {
    width: 11,
    height: 11,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    left: 0,
  },
  signalArcRightInner: {
    width: 11,
    height: 11,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    right: 0,
  },
  signalArcRight: {
    width: 18,
    height: 18,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    right: -4,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerHead: {},
  markerTip: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
  chevronContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronArrow: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    transform: [{ rotate: '45deg' }],
  },
});
