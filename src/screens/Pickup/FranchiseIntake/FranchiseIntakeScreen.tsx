import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface FranchiseIntakeScreenProps {
  order: Order;
  onLaunchScanner: () => void;
  onBack: () => void;
}

export const FranchiseIntakeScreen: React.FC<FranchiseIntakeScreenProps> = ({
  order,
  onLaunchScanner,
  onBack,
}) => {
  const [intakeCode, setIntakeCode] = useState('');

  const handleManualSubmit = () => {
    if (intakeCode.trim().length > 0) {
      onLaunchScanner();
    }
  };

  // Custom Header Notification Bell Icon
  const headerRightBell = (
    <TouchableOpacity activeOpacity={0.7} style={styles.bellBtn}>
      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* 1. Header component */}
      <Header
        title="Rinzo"
        showBack={true}
        onBackPress={onBack}
        rightCustom={headerRightBell}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2. Main Page Headers */}
        <View style={styles.pageHeaderCol}>
          <Text style={styles.pageTitleText}>Franchise Intake</Text>
          <Text style={styles.pageSubtitleText}>Scan the franchise intake code to proceed</Text>
        </View>

        {/* 3. Active Order ID Card */}
        <View style={styles.orderIdCard}>
          <Text style={styles.orderIdCardLabel}>ACTIVE ORDER ID</Text>
          <Text style={styles.orderIdCardNumber}>#{order.orderNumber}</Text>
          <View style={styles.orderIdDashedLine} />
        </View>

        {/* 4. Launch Scanner Box */}
        <TouchableOpacity
          style={styles.scannerDottedBtn}
          onPress={onLaunchScanner}
          activeOpacity={0.8}
        >
          <View style={styles.qrIconWhiteBox}>
            <Svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
              <Path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" strokeLinecap="round" />
              <Path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7z" fill="none" />
              <Path d="M14 14h1v1h-1zm2 2h1v1h-1zm-2 2h1v1h-1zm2-2h1v1h-1z" fill="#8664EC" />
            </Svg>
          </View>
          <Text style={styles.scannerBtnTitle}>Launch Scanner</Text>
          <Text style={styles.scannerBtnSubtext}>Fast recognition tech active</Text>
        </TouchableOpacity>

        {/* 5. Separator */}
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR ENTER MANUALLY</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* 6. Manual Code Input */}
        <View style={styles.manualInputCard}>
          <TextInput
            placeholder="Enter intake code..."
            placeholderTextColor="#8E8E93"
            style={styles.textInput}
            value={intakeCode}
            onChangeText={setIntakeCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[
              styles.submitBtn,
              { opacity: intakeCode.trim().length > 0 ? 1 : 0.6 }
            ]}
            onPress={handleManualSubmit}
            disabled={intakeCode.trim().length === 0}
            activeOpacity={0.8}
          >
            <Text style={styles.submitBtnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

        {/* 7. Bottom Info Cards Row */}
        <View style={styles.bottomCardsRow}>
          <View style={styles.infoCapsule}>
            <View style={styles.capsuleIconCol}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
              </Svg>
            </View>
            <View style={styles.capsuleTextCol}>
              <Text style={styles.capsuleLabel}>Facility</Text>
              <Text style={styles.capsuleVal}>Downtown Hub-7</Text>
            </View>
          </View>

          <View style={styles.infoCapsule}>
            <View style={styles.capsuleIconCol}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
                <Circle cx="12" cy="12" r="10" />
                <Path d="M12 6v6l4 2" strokeLinecap="round" />
              </Svg>
            </View>
            <View style={styles.capsuleTextCol}>
              <Text style={styles.capsuleLabel}>Est. Time</Text>
              <Text style={styles.capsuleVal}>12:45 PM</Text>
            </View>
          </View>
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
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  pageHeaderCol: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pageTitleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  pageSubtitleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    textAlign: 'center',
  },
  orderIdCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
    marginBottom: 20,
  },
  orderIdCardLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textMedium,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  orderIdCardNumber: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8664EC',
    marginBottom: 10,
  },
  orderIdDashedLine: {
    width: 60,
    height: 3,
    backgroundColor: '#EAE5FC',
    borderRadius: 1.5,
  },
  scannerDottedBtn: {
    height: 200,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#DCD0FF',
    borderStyle: 'dashed',
    backgroundColor: '#F7F5FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qrIconWhiteBox: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
    marginBottom: 14,
  },
  scannerBtnTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#8664EC',
    marginBottom: 2,
  },
  scannerBtnSubtext: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E1E6',
  },
  separatorText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: theme.colors.textMedium,
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  manualInputCard: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 6,
    ...theme.shadows.small,
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textDark,
  },
  submitBtn: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#8664EC',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bottomCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCapsule: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F5F4F8',
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  capsuleIconCol: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
    marginRight: 8,
  },
  capsuleTextCol: {
    justifyContent: 'center',
  },
  capsuleLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
    marginBottom: 1,
  },
  capsuleVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
});

export default FranchiseIntakeScreen;
