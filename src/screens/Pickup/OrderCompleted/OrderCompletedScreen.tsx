import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';
import { Order } from '../../../data/mockData';

interface OrderCompletedScreenProps {
  order: Order;
  onBackToHome: () => void;
}

export const OrderCompletedScreen: React.FC<OrderCompletedScreenProps> = ({
  order,
  onBackToHome,
}) => {
  const insets = useSafeAreaInsets();
  const [summaryVisible, setSummaryVisible] = useState(false);

  // Dynamic formatted completed time helper
  const getCompletedTime = () => {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // key hours 0 to 12
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // Custom Header Right Circle Checkmark Icon
  const headerRightCheck = (
    <View style={styles.headerCheckCircle}>
      <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="4">
        <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header
        title="Rinzo Delivery"
        showBack={false}
        rightCustom={headerRightCheck}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2. Success Illustration Graphic */}
        <View style={styles.graphicCard}>
          <Image
            source={require('../../../assets/images/delivery_success.png')}
            style={styles.successImage}
            resizeMode="cover"
          />
        </View>

        {/* 3. Completion Headers */}
        <View style={styles.headerTextCol}>
          <Text style={styles.successTitleText}>
            Delivery Completed{'\n'}Successfully
          </Text>
          <Text style={styles.successSubtext}>
            The package has been verified and delivered to the customer.
          </Text>
        </View>

        {/* 4. Details Card Block */}
        <View style={styles.detailsCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionLabel}>ORDER DETAILS</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>Verified</Text>
            </View>
          </View>

          <View style={styles.separatorLine} />

          {/* Details Info Grid */}
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Order ID</Text>
              <Text style={styles.gridVal}>#{order.orderNumber}</Text>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Customer</Text>
              <Text style={styles.gridVal}>
                {order.customerName.split(' ')[0]} {order.customerName.split(' ')[1] ? order.customerName.split(' ')[1].charAt(0) + '.' : ''}
              </Text>
            </View>
          </View>

          <View style={[styles.gridRow, { marginTop: 16 }]}>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Items</Text>
              <View style={styles.itemsValRow}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2.5" style={{ marginRight: 4 }}>
                  <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </Svg>
                <Text style={styles.gridVal}>12 Bags</Text>
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Completed At</Text>
              <Text style={styles.gridVal}>{getCompletedTime()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 5. Navigation Buttons Container */}
      <View style={[styles.buttonsContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.primaryHomeBtn}
          onPress={onBackToHome}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryHomeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondarySummaryBtn}
          onPress={() => setSummaryVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.secondarySummaryBtnText}>View Summary</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Bottom Sheet Modal Modal */}
      <Modal
        visible={summaryVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSummaryVisible(false)}
      >
        <View style={styles.sheetBackdrop}>
          <View style={[styles.sheetContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.grabBar} />
            <Text style={styles.sheetTitle}>Delivery Summary</Text>
            <Text style={styles.sheetSubtitle}>Order #{order.orderNumber}</Text>

            <View style={styles.sheetSeparator} />

            {/* Simulated summary items */}
            <View style={styles.summaryItemRow}>
              <Text style={styles.summaryItemLabel}>Customer Contact</Text>
              <Text style={styles.summaryItemVal}>+1 (555) 921-982</Text>
            </View>

            <View style={styles.summaryItemRow}>
              <Text style={styles.summaryItemLabel}>Verified Bags Count</Text>
              <Text style={styles.summaryItemVal}>12/12 Packages Scanned</Text>
            </View>

            <View style={styles.summaryItemRow}>
              <Text style={styles.summaryItemLabel}>Diagnostic Hub Scan</Text>
              <Text style={[styles.summaryItemVal, { color: '#10B981', fontWeight: 'bold' }]}>Passed (Secure)</Text>
            </View>

            <View style={styles.summaryItemRow}>
              <Text style={styles.summaryItemLabel}>Dispatcher Authorization</Text>
              <Text style={[styles.summaryItemVal, { color: '#10B981', fontWeight: 'bold' }]}>Approved</Text>
            </View>

            <TouchableOpacity
              style={styles.sheetCloseBtn}
              onPress={() => setSummaryVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.sheetCloseBtnText}>Close Summary</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  headerCheckCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFE8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DCD0FF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  graphicCard: {
    height: 250,
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: theme.colors.cardBg,
    ...theme.shadows.medium,
    marginBottom: 20,
  },
  successImage: {
    width: '100%',
    height: '100%',
  },
  headerTextCol: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitleText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 8,
  },
  successSubtext: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSectionLabel: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textMedium,
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    backgroundColor: '#F5EFFF',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F2F1F6',
    marginVertical: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCol: {
    flex: 1,
  },
  gridLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  gridVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  itemsValRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FAF9FC',
  },
  primaryHomeBtn: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    ...theme.shadows.medium,
  },
  primaryHomeBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondarySummaryBtn: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1.2,
    borderColor: '#8664EC',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondarySummaryBtnText: {
    color: '#8664EC',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    ...theme.shadows.large,
  },
  grabBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  sheetSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    marginTop: 2,
  },
  sheetSeparator: {
    height: 1,
    backgroundColor: '#F2F1F6',
    marginVertical: 14,
  },
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryItemLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  summaryItemVal: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  sheetCloseBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    ...theme.shadows.small,
  },
  sheetCloseBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default OrderCompletedScreen;
