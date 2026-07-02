import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';

interface CameraQrScannerScreenProps {
  onScanSuccess: () => void;
  onBack: () => void;
}

const SCAN_BOX_SIZE = 250;

export const CameraQrScannerScreen: React.FC<CameraQrScannerScreenProps> = ({
  onScanSuccess,
  onBack,
}) => {
  const insets = useSafeAreaInsets();
  const [flashOn, setFlashOn] = useState(false);

  // Animation for the scanning laser line
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loop the scan line from top to bottom of the viewfinder
    Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: SCAN_BOX_SIZE - 4,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Simulate automatic QR detection after 3 seconds
    const timer = setTimeout(() => {
      onScanSuccess();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [laserAnim, onScanSuccess]);

  return (
    <View style={styles.container}>
      {/* Dark mock camera background */}
      <View style={styles.cameraBackground}>
        {/* Subtle grids or background details representing a camera view */}
        <View style={styles.gridLineHorizontal} />
        <View style={[styles.gridLineHorizontal, { top: '66%' }]} />
        <View style={styles.gridLineVertical} />
        <View style={[styles.gridLineVertical, { left: '66%' }]} />
      </View>

      {/* Header Bar Overlay */}
      <View style={[styles.headerOverlay, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <Path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scan Intake QR</Text>

        <TouchableOpacity
          style={[styles.circleBtn, flashOn && styles.circleBtnActive]}
          onPress={() => setFlashOn(!flashOn)}
          activeOpacity={0.7}
        >
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={flashOn ? '#8664EC' : '#FFFFFF'} strokeWidth="2.5">
            <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>

      {/* Overlay Masks surrounding the scanning box */}
      <View style={styles.maskContainer}>
        <View style={styles.maskTop} />
        <View style={styles.maskMiddleRow}>
          <View style={styles.maskSide} />
          
          {/* Scanning Box Viewfinder */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onScanSuccess}
            style={styles.viewfinder}
          >
            {/* Viewfinder Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Animating Green Laser Line */}
            <Animated.View
              style={[
                styles.laserLine,
                { transform: [{ translateY: laserAnim }] }
              ]}
            />
          </TouchableOpacity>

          <View style={styles.maskSide} />
        </View>
        <View style={styles.maskBottom} />
      </View>

      {/* Bottom Instructions Panel */}
      <View style={[styles.bottomInstructions, { paddingBottom: insets.bottom + 24 }]}>
        <Text style={styles.instructionText}>
          Align QR Code within the frame to scan
        </Text>
        <Text style={styles.subInstructionText}>
          Fast recognition technology is active. Tap frame to simulate scan.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0E13',
  },
  cameraBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#151419',
    opacity: 0.85,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '33%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '33%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  maskContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  maskTop: {
    flex: 1,
    backgroundColor: 'rgba(15, 14, 19, 0.65)',
  },
  maskMiddleRow: {
    flexDirection: 'row',
    height: SCAN_BOX_SIZE,
  },
  maskSide: {
    flex: 1,
    backgroundColor: 'rgba(15, 14, 19, 0.65)',
  },
  maskBottom: {
    flex: 1,
    backgroundColor: 'rgba(15, 14, 19, 0.65)',
  },
  viewfinder: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: '#8664EC',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  laserLine: {
    position: 'absolute',
    left: 4,
    right: 4,
    height: 3,
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 5,
  },
  bottomInstructions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 10,
  },
  instructionText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
  },
  subInstructionText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 11,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 15,
  },
});

export default CameraQrScannerScreen;
