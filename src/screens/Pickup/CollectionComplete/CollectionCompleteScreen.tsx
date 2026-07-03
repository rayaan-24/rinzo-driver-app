import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { Header } from '../../../components/Header';

interface CollectionCompleteScreenProps {
  onContinue: () => void;
}

export const CollectionCompleteScreen: React.FC<CollectionCompleteScreenProps> = ({
  onContinue,
}) => {
  const insets = useSafeAreaInsets();

  // Custom Header Notification Bell Icon
  const headerRightBell = (
    <TouchableOpacity activeOpacity={0.7} style={styles.bellBtn}>
      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 1. Header component */}
      <Header
        title="Rinzo Driver"
        showBack={false}
        rightCustom={headerRightBell}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 2. Purple Checkmark Circle */}
        <View style={styles.checkmarkOuter}>
          <View style={styles.checkmarkInner}>
            <Svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
              <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </View>

        {/* 3. Collection Complete Titles */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Collection Complete</Text>
          <Text style={styles.subTitle}>Your next stop is ready for pickup.</Text>
        </View>

        {/* 4. Mini Map Card */}
        <View style={styles.mapCard}>
          <Image
            source={require('../../../assets/images/map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
          {/* Floating distance pill */}
          <View style={styles.floatingDistPill}>
            <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="3" style={{ marginRight: 4 }}>
              <Path d="M12 2L2 22l10-4 10 4L12 2z" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.distPillText}>4.2 km away</Text>
          </View>
        </View>

        {/* 5. Next Hub Card Block */}
        <View style={styles.hubCard}>
          <View style={styles.hubCardHeader}>
            <View>
              <View style={styles.nextHubBadge}>
                <Text style={styles.nextHubBadgeText}>NEXT HUB</Text>
              </View>
              <Text style={styles.hubTitle}>West-End Franchise #42</Text>
            </View>

            {/* Circular hub icon */}
            <View style={styles.hubIconCircle}>
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Circle cx="6" cy="12" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
                <Circle cx="18" cy="6" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
                <Circle cx="18" cy="18" r="3" stroke="#8664EC" strokeWidth="2.5" fill="none" />
                <Path d="M8.5 10.5l7-3.5M8.5 13.5l7 3.5" stroke="#8664EC" strokeWidth="2.5" strokeLinecap="round" />
              </Svg>
            </View>
          </View>

          {/* Location row */}
          <View style={styles.locationRow}>
            <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 6 }}>
              <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
            </Svg>
            <Text style={styles.locationText}>
              128 Baker Street, Marylebone London, NW1 6XE
            </Text>
          </View>

          <View style={styles.separatorLine} />

          {/* Hub metrics grid row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Pending Items</Text>
              <View style={styles.metricValRow}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5" style={{ marginRight: 4 }}>
                  <Path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <Path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                </Svg>
                <Text style={styles.metricValText}>24 Units</Text>
              </View>
            </View>

            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Est. Arrival</Text>
              <View style={styles.metricValRow}>
                <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5" style={{ marginRight: 4 }}>
                  <Circle cx="12" cy="12" r="10" />
                  <Path d="M12 6v6l4 2" strokeLinecap="round" />
                </Svg>
                <Text style={styles.metricValText}>14 Mins</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 6. Shift Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressLeftBar} />
          <View style={styles.progressTextCol}>
            <Text style={styles.progressLabel}>Shift Progress</Text>
            <Text style={styles.progressSubtitle}>3 of 8 Franchises Visited</Text>
          </View>
          <Text style={styles.progressPercent}>38%</Text>
        </View>
      </ScrollView>

      {/* 7. Continue Bottom Button */}
      <View style={[styles.bottomBtnContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" style={{ marginRight: 6 }}>
            <Path d="M12 2L2 22l10-4 10 4L12 2z" strokeLinejoin="round" />
          </Svg>
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingTop: 24,
    paddingBottom: 24,
  },
  checkmarkOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#F5EFFF',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
    marginBottom: 16,
  },
  checkmarkInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textMedium,
  },
  mapCard: {
    height: 150,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F0F0F3',
    ...theme.shadows.small,
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  floatingDistPill: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...theme.shadows.small,
  },
  distPillText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  hubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
    marginBottom: 16,
  },
  hubCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nextHubBadge: {
    backgroundColor: '#F5EFFF',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  nextHubBadgeText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#8664EC',
    letterSpacing: 0.5,
  },
  hubTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  hubIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5EFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#F2F1F6',
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#F7F6FA',
    borderRadius: 14,
    padding: 10,
    marginHorizontal: 4,
  },
  metricLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 9,
    color: theme.colors.textMedium,
    marginBottom: 4,
  },
  metricValRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 60,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
  },
  progressLeftBar: {
    width: 4,
    height: 30,
    backgroundColor: '#8664EC',
    borderRadius: 2,
    marginRight: 12,
  },
  progressTextCol: {
    flex: 1,
  },
  progressLabel: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
    marginBottom: 2,
  },
  progressSubtitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  progressPercent: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8664EC',
  },
  bottomBtnContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FAF9FC',
  },
  continueBtn: {
    flexDirection: 'row',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CollectionCompleteScreen;
