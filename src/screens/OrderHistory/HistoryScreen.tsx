import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { theme } from '../../theme';
import { Header } from '../../components/Header';
import { AlertsScreen } from '../Alerts/AlertsScreen';

interface HistoryItem {
  id: string;
  orderNumber: string;
  customerName: string;
  status: 'COMPLETED' | 'CANCELLED';
  dateTime: string;
  distance: string;
}

const mockHistoryData: HistoryItem[] = [
  {
    id: '1',
    orderNumber: 'LL-8291',
    customerName: 'Sarah Jenkins',
    status: 'COMPLETED',
    dateTime: 'Oct 24, 2:15 PM',
    distance: '4.2 Miles',
  },
  {
    id: '2',
    orderNumber: 'LL-8288',
    customerName: 'Marcus Thorne',
    status: 'CANCELLED',
    dateTime: 'Oct 24, 11:40 AM',
    distance: '1.8 Miles',
  },
  {
    id: '3',
    orderNumber: 'LL-8254',
    customerName: 'Elena Rodriguez',
    status: 'COMPLETED',
    dateTime: 'Oct 23, 5:05 PM',
    distance: '12.5 Miles',
  },
  {
    id: '4',
    orderNumber: 'LL-8199',
    customerName: 'David Kim',
    status: 'COMPLETED',
    dateTime: 'Oct 23, 9:30 AM',
    distance: '3.1 Miles',
  },
];

export const HistoryScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'Today' | 'This Week' | 'Completed'>('Today');
  const [showNotifications, setShowNotifications] = useState(false);

  // Custom Header Bell Button on the right
  const headerRightBlock = (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.headerRight}
      onPress={() => setShowNotifications(true)}
    >
      <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8664EC" strokeWidth="2.5">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
      </Svg>
    </TouchableOpacity>
  );

  // Custom Header Avatar + Title on the left
  const headerLeftBlock = (
    <View style={styles.headerLeftBlock}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }}
        style={styles.headerAvatar}
      />
      <Text style={styles.headerTitle}>Rinzo Driver</Text>
    </View>
  );

  // Filter local listings based on search inputs
  const filteredData = mockHistoryData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.orderNumber.toLowerCase().includes(query) ||
      item.customerName.toLowerCase().includes(query)
    );
  });

  if (showNotifications) {
    return <AlertsScreen onBack={() => setShowNotifications(false)} />;
  }

  return (
    <View style={styles.container}>
      {/* 1. Header Block */}
      <Header
        showBack={false}
        leftCustom={headerLeftBlock}
        rightCustom={headerRightBlock}
      />

      {/* 2. Search Box */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 8 }}>
            <Circle cx="11" cy="11" r="8" />
            <Path d="M21 21l-4.35-4.35" />
          </Svg>
          <TextInput
            placeholder="Search Order ID or Customer..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* 3. Filter Tag Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {(['Today', 'This Week', 'Completed'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Timeline Listings */}
      <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => {
          const isCompleted = item.status === 'COMPLETED';
          const isLast = index === filteredData.length - 1;

          return (
            <View key={item.id} style={styles.timelineRow}>
              {/* Timeline Indicator Column */}
              <View style={styles.indicatorCol}>
                {/* Thin vertical connector line */}
                {!isLast && <View style={styles.connectingLine} />}
                
                {/* Status circular icon badge */}
                <View style={styles.statusCircleBadge}>
                  {isCompleted ? (
                    <View style={styles.completedBadgeInner}>
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                        <Path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    </View>
                  ) : (
                    <View style={styles.cancelledBadgeInner}>
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4">
                        <Path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    </View>
                  )}
                </View>
              </View>

              {/* Order Card Column */}
              <View style={styles.cardCol}>
                <View style={styles.itemCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.orderNumberText}>Order #{item.orderNumber}</Text>
                    <View style={[styles.statusTag, isCompleted ? styles.statusTagCompleted : styles.statusTagCancelled]}>
                      <Text style={[styles.statusTagText, isCompleted ? styles.statusTagTextCompleted : styles.statusTagTextCancelled]}>
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.customerNameText}>{item.customerName}</Text>

                  <View style={styles.cardFooter}>
                    {/* Date metadata */}
                    <View style={styles.metaRow}>
                      <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <Path d="M19 4H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
                        <Path d="M16 2v4M8 2v4M3 10h18" />
                      </Svg>
                      <Text style={styles.metaText}>{item.dateTime}</Text>
                    </View>

                    {/* Distance metadata */}
                    <View style={styles.metaRow}>
                      <Svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" style={{ marginRight: 4 }}>
                        <Path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
                      </Svg>
                      <Text style={styles.metaText}>{item.distance}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FC',
  },
  headerLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#EFE8FF',
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B2BB0',
  },
  headerRight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F2F8',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 13,
    color: theme.colors.textDark,
    padding: 0,
  },
  tabsContainer: {
    marginBottom: 12,
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tabBtn: {
    backgroundColor: '#F3F2F8',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  tabBtnActive: {
    backgroundColor: '#8664EC',
  },
  tabBtnText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textMedium,
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
  },
  listScroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  timelineRow: {
    flexDirection: 'row',
    minHeight: 120,
  },
  indicatorCol: {
    width: 44,
    alignItems: 'center',
    position: 'relative',
  },
  connectingLine: {
    position: 'absolute',
    top: 24,
    bottom: -24,
    width: 1.5,
    backgroundColor: '#EAEAEA',
  },
  statusCircleBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
    zIndex: 1,
  },
  completedBadgeInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#8664EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelledBadgeInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCol: {
    flex: 1,
    paddingBottom: 16,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EFE8FF',
    ...theme.shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderNumberText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  statusTagCompleted: {
    backgroundColor: '#F5EFFF',
  },
  statusTagCancelled: {
    backgroundColor: '#FEE2E2',
  },
  statusTagText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: 9,
    fontWeight: 'bold',
  },
  statusTagTextCompleted: {
    color: '#8664EC',
  },
  statusTagTextCancelled: {
    color: '#EF4444',
  },
  customerNameText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 12,
    color: theme.colors.textMedium,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: 10,
    color: theme.colors.textMedium,
  },
});

export default HistoryScreen;
