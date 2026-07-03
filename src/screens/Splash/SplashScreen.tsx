import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { moderateScale, verticalScale, screenWidth } from '../../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);
const vs = (size: number) => verticalScale(size);

interface SplashScreenProps {
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish, progressAnim]);

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* 1. Logo and Branding */}
        <View style={styles.brandingContainer}>
          <Image
            source={require('../../assets/images/rinzo_logo.png')}
            style={styles.mainLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../../assets/images/rinzo_wordmark.png')}
            style={styles.wordmarkImage}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Delivering Trust, Every Time</Text>
        </View>

        {/* 2. Center Scooter Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/delivery_scooter.png')}
            style={styles.scooterImage}
            resizeMode="contain"
          />
        </View>

        {/* 3. Bottom Animated Progress Bar */}
        <View style={styles.loaderContainer}>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressBarWidth,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F1FD',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F1FD',
    paddingVertical: vs(20),
  },
  brandingContainer: {
    alignItems: 'center',
    marginTop: vs(30),
  },
  mainLogo: {
    width: s(110),
    height: s(110),
    marginBottom: vs(10),
  },
  wordmarkImage: {
    width: s(210),
    height: vs(40),
    marginVertical: vs(4),
  },
  tagline: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: s(14),
    fontWeight: theme.typography.fontWeight.medium,
    color: '#6E6A80',
    marginTop: vs(4),
    letterSpacing: 0.3,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: vs(10),
  },
  scooterImage: {
    width: screenWidth * 0.9,
    height: vs(260),
  },
  loaderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: vs(25),
  },
  progressTrack: {
    width: s(150),
    height: vs(4.5),
    backgroundColor: '#E5DCF7',
    borderRadius: s(10),
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#7952F3',
    borderRadius: s(10),
  },
});

export default SplashScreen;
