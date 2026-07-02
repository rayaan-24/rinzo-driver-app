import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';

interface IconProps {
  color?: string;
  size?: number;
  active?: boolean;
}

export const HomeIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 17 19" fill="none">
      <Path
        d="M2.1 16.8H5.25V10.5H11.55V16.8H14.7V7.35L8.4 2.625L2.1 7.35V16.8ZM0 18.9V6.3L8.4 0L16.8 6.3V18.9H9.45V12.6H7.35V18.9H0Z"
        fill={color}
      />
    </Svg>
  );
};

export const HistoryIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 18C6.7 18 4.69583 17.2375 2.9875 15.7125C1.27917 14.1875 0.3 12.2833 0.05 10H2.1C2.33333 11.7333 3.10417 13.1667 4.4125 14.3C5.72083 15.4333 7.25 16 9 16C10.95 16 12.6042 15.3208 13.9625 13.9625C15.3208 12.6042 16 10.95 16 9C16 7.05 15.3208 5.39583 13.9625 4.0375C12.6042 2.67917 10.95 2 9 2C7.85 2 6.775 2.26667 5.775 2.8C4.775 3.33333 3.93333 4.06667 3.25 5H6V7H0V1H2V3.35C2.85 2.28333 3.8875 1.45833 5.1125 0.875C6.3375 0.291667 7.63333 0 9 0C10.25 0 11.4208 0.2375 12.5125 0.7125C13.6042 1.1875 14.5542 1.82917 15.3625 2.6375C16.1708 3.44583 16.8125 4.39583 17.2875 5.4875C17.7625 6.57917 18 7.75 18 9C18 10.25 17.7625 11.4208 17.2875 12.5125C16.8125 13.6042 16.1708 14.5542 15.3625 15.3625C14.5542 16.1708 13.6042 16.8125 12.5125 17.2875C11.4208 17.7625 10.25 18 9 18ZM11.8 13.2L8 9.4V4H10V8.6L13.2 11.8L11.8 13.2Z"
        fill={color}
      />
    </Svg>
  );
};

export const PerformanceIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 20" fill="none">
      <Path
        d="M0 17V15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V2.2C10.8333 2.53333 11.9167 3.2375 12.75 4.3125C13.5833 5.3875 14 6.61667 14 8V15H16V17H0ZM8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM4 15H12V8C12 6.9 11.6083 5.95833 10.825 5.175C10.0417 4.39167 9.1 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15Z"
        fill={color}
      />
    </Svg>
  );
};

export const ProfileIcon: React.FC<IconProps> = ({ color = theme.colors.textMedium, size = 20 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z"
        fill={color}
      />
    </Svg>
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
