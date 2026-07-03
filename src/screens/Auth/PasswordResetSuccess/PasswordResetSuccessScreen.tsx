import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale, screenWidth } from '../../../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);

// Large Centered Checkmark Icon
const CheckCircleIcon: React.FC<{ size?: number }> = ({ size = s(48) }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path
      d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z"
      fill="#6B46DF"
    />
    <Path
      d="M15 24l6 6 12-12"
      stroke="#FFFFFF"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Right Arrow Icon for the button
const ArrowRightIcon: React.FC = () => (
  <Svg width={s(20)} height={s(20)} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M12 5l7 7-7 7"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface PasswordResetSuccessScreenProps {
  onGoToLogin?: () => void;
}

export const PasswordResetSuccessScreen: React.FC<PasswordResetSuccessScreenProps> = ({
  onGoToLogin,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Thumbs up driver illustration */}
        <Image
          source={require('../../../assets/images/password_success_rider.jpg')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Large Check Circle */}
        <View style={styles.iconContainer}>
          <CheckCircleIcon size={s(64)} />
        </View>

        {/* Text Area */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Password Updated</Text>
          <Text style={styles.title}>Successfully!</Text>
          <Text style={styles.subtitle}>
            Your password has been changed successfully.{'\n'}
            You can now log in using your new password.
          </Text>
        </View>

        {/* Go to Login Button positioned closer below description */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onGoToLogin}
            activeOpacity={0.8}
            style={styles.loginBtn}
          >
            <Text style={styles.btnText}>Go to Login</Text>
            <View style={styles.btnIcon}>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7fbff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  illustration: {
    width: screenWidth,
    height: screenWidth * (910 / 1024),
    marginTop: 0,
  },
  iconContainer: {
    marginTop: s(12),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: s(12),
    paddingHorizontal: s(24),
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1A153B',
    textAlign: 'center',
    lineHeight: s(32),
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: s(13),
    color: '#6E6A80',
    textAlign: 'center',
    marginTop: s(8),
    lineHeight: s(19),
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
    marginTop: s(28),
  },
  loginBtn: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#6B46DF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: fontFamily.bold,
    fontSize: s(15),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
  btnIcon: {
    marginLeft: s(8),
  },
});

export default PasswordResetSuccessScreen;
