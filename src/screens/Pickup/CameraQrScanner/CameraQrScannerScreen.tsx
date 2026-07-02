import React, { Component, ErrorInfo, ReactNode, useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';

// ----------------------------------------------------------------------
// CAMERA ERROR BOUNDARY
// Prevents app crash if native expo-camera binary module is missing/unbuilt
// ----------------------------------------------------------------------
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CameraErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Camera Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------
// CAMERA QR SCANNER SCREEN
// ----------------------------------------------------------------------
interface CameraQrScannerScreenProps {
  onScanSuccess: () => void;
  onBack: () => void;
}

const SCAN_BOX_SIZE = 260;

export const CameraQrScannerScreen: React.FC<CameraQrScannerScreenProps> = ({
  onScanSuccess,
  onBack,
}) => {
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const hasScanned = useRef(false);

  // Expo camera permissions hook
  const [permission, requestPermission] = useCameraPermissions();

  // Scanning laser animation line
  const laserAnim = useRef(new Animated.Value(0)).current;

  const handleBarcodeScanned = useCallback(() => {
    if (!hasScanned.current) {
      hasScanned.current = true;
      onScanSuccess();
    }
  }, [onScanSuccess]);

  const handleManualConfirm = () => {
    if (manualCode.trim().length > 0) {
      onScanSuccess();
    }
  };

  useEffect(() => {
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

    // Auto scan fallback in case they are using simulator or mock feed
    const timer = setTimeout(() => {
      handleBarcodeScanned();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [laserAnim, handleBarcodeScanned]);

  // Custom Right Flashlight Icon
  const headerRightFlash = (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.flashBtn}
      onPress={() => setFlashlightOn(!flashlightOn)}
    >
      <Svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={flashlightOn ? '#8664EC' : '#555555'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M18 3H6v3c0 2 2 4 2 6v6c0 1 1 2 2 2h4c1 0 2-1 2-2v-6c0-2 2-4 2-6V3z" />
        <Path d="M12 12V3" />
      </Svg>
    </TouchableOpacity>
  );

  // Fallback visual simulation for simulator/unbuilt binary
  const cameraFallbackView = (
    <View style={StyleSheet.absoluteFillObject}>
      <Image
        source={require('../../../assets/images/camera_scan_bg.png')}
        style={styles.scanBgImage}
        resizeMode="cover"
      />
      <View style={styles.simulatedIndicator}>
        <Text style={styles.simulatedIndicatorText}>
          ⚠️ SIMULATED VIEW • Rebuild native app to load camera
        </Text>
      </View>
    </View>
  );

  // If permission has not loaded or is denied, render permission request screen
  if (!permission) {
    return (
      <View style={styles.container}>
        <Header title="Scan QR Code" showBack={true} onBackPress={onBack} />
        <View style={styles.permissionCenter}>
          <Text style={styles.permissionText}>Loading camera status...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Header title="Scan QR Code" showBack={true} onBackPress={onBack} />
        <View style={styles.permissionCenter}>
          <Text style={styles.permissionHeader}>Camera Access Needed</Text>
          <Text style={styles.permissionSub}>
            We require camera access so you can scan package labels and authenticate intake codes.
          </Text>
          <TouchableOpacity
            style={styles.permissionBtn}
            onPress={requestPermission}
            activeOpacity={0.8}
          >
            <Text style={styles.permissionBtnText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      {/* 1. Header component */}
      <Header
        title="Scan QR Code"
        showBack={true}
        onBackPress={onBack}
        rightCustom={headerRightFlash}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* 2. Visual Viewfinder Container */}
        <View style={styles.viewfinderSection}>
          <CameraErrorBoundary fallback={cameraFallbackView}>
            {/* Live Camera Viewfinder */}
            <CameraView
              style={StyleSheet.absoluteFillObject}
              facing="back"
              enableTorch={flashlightOn}
              barcodeScannerSettings={{
                barcodeTypes: ['qr'],
              }}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </CameraErrorBoundary>

          {/* Dotted translucent masks */}
          <View style={styles.vMaskTop}>
            <Text style={styles.maskTitle}>Align the QR Code</Text>
            <Text style={styles.maskSubtitle}>Scanning starts automatically</Text>
          </View>

          <View style={styles.vMaskMiddle}>
            <View style={styles.vMaskSide} />

            {/* Viewfinder scan box */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={handleBarcodeScanned}
              style={styles.scanViewfinder}
            >
              {/* Corner brackets */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Pulsing scan line */}
              <Animated.View
                style={[
                  styles.laserLine,
                  { transform: [{ translateY: laserAnim }] }
                ]}
              />
            </TouchableOpacity>

            <View style={styles.vMaskSide} />
          </View>

          <View style={styles.vMaskBottom} />
        </View>

        {/* 3. Bottom Manual Input Sheet Card */}
        <View style={styles.manualEntrySheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Order ID</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setManualCode('RNZ-9921')}>
              <Text style={styles.pasteActionBtn}>PASTE</Text>
            </TouchableOpacity>
          </View>

          {/* Styled search-like manual entry input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter or paste Order ID manually"
              placeholderTextColor="#8E8E93"
              style={styles.textInput}
              value={manualCode}
              onChangeText={setManualCode}
              autoCapitalize="characters"
            />
            <View style={styles.searchIconBox}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="3">
                <Circle cx="11" cy="11" r="8" />
                <Path d="M21 21l-4.35-4.35" />
              </Svg>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleManualConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmBtnText}>Confirm Manual Entry</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelBtnText}>Cancel Scan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  flashBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  viewfinderSection: {
    height: 400,
    width: '100%',
    position: 'relative',
    backgroundColor: '#1E1E22',
  },
  scanBgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  simulatedIndicator: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  simulatedIndicatorText: {
    color: '#FFF7E6',
    fontSize: 9,
    fontWeight: 'bold',
  },
  vMaskTop: {
    height: 90,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  maskTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  maskSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: '#EFEFEF',
  },
  vMaskMiddle: {
    flexDirection: 'row',
    height: SCAN_BOX_SIZE,
  },
  vMaskSide: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  vMaskBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scanViewfinder: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    position: 'relative',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#8664EC',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 16,
  },
  laserLine: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: '#8664EC',
    shadowColor: '#8664EC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
  },
  manualEntrySheet: {
    backgroundColor: '#C5C3CB',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
    marginTop: -20,
    flex: 1,
    ...theme.shadows.large,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  pasteActionBtn: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  inputContainer: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FAF9FC',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textDark,
  },
  searchIconBox: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...theme.shadows.medium,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelBtn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: '#8664EC',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: '#8664EC',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  permissionCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  permissionHeader: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionSub: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  permissionBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8664EC',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  permissionBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  permissionText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
  },
});

export default CameraQrScannerScreen;
