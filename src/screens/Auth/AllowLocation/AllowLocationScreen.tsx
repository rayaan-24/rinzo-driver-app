import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../../theme';
import { moderateScale, verticalScale, screenWidth } from '../../../utils/responsive';
import { CustomButton } from '../../../components/common/CustomButton';

const s = (size: number) => moderateScale(size, 0.3);
const vs = (size: number) => verticalScale(size);

interface AllowLocationScreenProps {
  onAllow?: () => void;
  onDeny?: () => void;
}

export const AllowLocationScreen: React.FC<AllowLocationScreenProps> = ({
  onAllow,
  onDeny,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Title & Subtitle Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Allow Location Access</Text>
        <Text style={styles.subtitle}>
          We use your location to show nearby{"\n"}laundries and enable pickup
        </Text>
      </View>

      {/* 2. 3D Map Illustration Container */}
      <View style={styles.illustrationContainer}>
        <Image
          source={require('../../../assets/images/allow_location_map.jpg')}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* 3. Action Buttons Section */}
      <View style={styles.footer}>
        <CustomButton
          title="Allow Location"
          onPress={onAllow ? onAllow : () => {}}
          style={styles.allowButton}
          icon={
            <Svg width={s(20)} height={s(20)} viewBox="0 0 24 24" fill="none" style={styles.pinIcon}>
              <Path
                d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                fill="#FFFFFF"
              />
            </Svg>
          }
        />

        <TouchableOpacity
          onPress={onDeny ? onDeny : () => {}}
          activeOpacity={0.7}
          style={styles.maybeLaterBtn}
        >
          <Text style={styles.maybeLaterText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: vs(80),
    alignItems: 'center',
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(24),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: vs(12),
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: s(15),
    color: '#7C7985',
    textAlign: 'center',
    lineHeight: s(22),
    paddingHorizontal: theme.spacing.md,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(8),
  },
  illustrationImage: {
    width: screenWidth * 0.95,
    height: '100%',
    maxHeight: vs(340),
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: vs(20),
    alignItems: 'center',
  },
  allowButton: {
    width: '100%',
    height: vs(54),
    borderRadius: s(16),
    backgroundColor: '#7952F3',
  },
  pinIcon: {
    marginRight: s(8),
  },
  maybeLaterBtn: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    marginTop: vs(20),
  },
  maybeLaterText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: s(16),
    fontWeight: theme.typography.fontWeight.bold,
    color: '#7952F3',
    textAlign: 'center',
  },
});

export default AllowLocationScreen;
