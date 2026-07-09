import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';
import { Header } from '../../../components/Header';

// ==========================================
// OUTLINED SVG ICONS (Order Chat layout)
// ==========================================

const ArrowLeftIcon = ({ size = 24, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 12H4M10 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneCallIcon = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
      fill={color}
    />
  </Svg>
);

const ThreeDotsIcon = ({ size = 20, color = theme.colors.textDark }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color} />
    <Circle cx="12" cy="12" r="2" fill={color} />
    <Circle cx="12" cy="19" r="2" fill={color} />
  </Svg>
);

const LockIcon = ({ size = 14, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
      fill={color}
    />
  </Svg>
);

const PaperclipIcon = ({ size = 22, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H9v9.5a3 3 0 006 0V5a4 4 0 00-8 0v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
      fill={color}
    />
  </Svg>
);

const CameraIcon = ({ size = 22, color = '#8E8E93' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3.2" stroke={color} strokeWidth={2} />
    <Path
      d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
      fill={color}
    />
  </Svg>
);

const SendAirplaneIcon = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      fill={color}
    />
  </Svg>
);

const DoubleCheckIcon = ({ size = 14, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M1.5 12.5l4.07 4.07L14.7 7.4M8 12.5l4.07 4.07L20.7 7.4"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DocumentTextIcon = ({ size = 20, color = '#7C4DFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
      fill={color}
    />
  </Svg>
);

// ==========================================
// DEDICATED VECTOR AGENT AVATAR
// ==========================================

const DedicatedAgentAvatar = () => (
  <View style={styles.agentAvatarContainer}>
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {/* agent head shape */}
      <Circle cx="12" cy="8" r="4" fill="#7C4DFF" />
      {/* agent shoulders */}
      <Path
        d="M12 14c-4 0-7 2-7 4.5v1.5h14V18.5c0-2.5-3-4.5-7-4.5z"
        fill="#7C4DFF"
      />
      {/* headset outline overlay */}
      <Path
        d="M8.5 8a3.5 3.5 0 017 0v2"
        stroke="#512DA8"
        strokeWidth={1}
        strokeLinecap="round"
      />
      {/* microphone vector */}
      <Path
        d="M15 10c0 0.8-0.5 1.2-1 1.2h-1"
        stroke="#512DA8"
        strokeWidth={1}
        strokeLinecap="round"
      />
    </Svg>
  </View>
);

// ==========================================
// MOCK CHAT MESSAGES
// ==========================================

interface MessageItem {
  id: string;
  sender: 'support' | 'user';
  text: string;
  timestamp: string;
  isAttachment?: boolean;
}

const initialMessages: MessageItem[] = [
  {
    id: '1',
    sender: 'support',
    text: 'Hello Alex, how can we help you today?',
    timestamp: '10:42 AM',
  },
  {
    id: '2',
    sender: 'user',
    text: 'I have a question about my last delivery verification',
    timestamp: '10:45 AM',
  },
];

// ==========================================
// COMPONENT MAIN EXPORT
// ==========================================

interface OrderChatScreenProps {
  onBack: () => void;
}

export const OrderChatScreen: React.FC<OrderChatScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Entrance animations
  const screenFade = useRef(new Animated.Value(1)).current;
  const sendBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Intercept hardware back button on Android
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    screenFade.setValue(1);

    return () => backHandler.remove();
  }, [onBack, screenFade]);

  // Scroll to bottom when messages load or updates
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendPressIn = () => {
    Animated.timing(sendBtnScale, { toValue: 0.95, duration: 80, useNativeDriver: true }).start();
  };

  const handleSendPressOut = () => {
    Animated.timing(sendBtnScale, { toValue: 1, duration: 120, useNativeDriver: true }).start();
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const timeStr = `${hours}:${minutes} ${ampm}`;

    const newMsg: MessageItem = {
      id: Math.random().toString(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <Animated.View style={[styles.outerContainer, { opacity: screenFade }]}>
      
      {/* 1. FIXED HEADER */}
      <Header
        leftCustom={
          <View style={styles.headerLeftCol}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Go Back"
              accessibilityRole="button"
              activeOpacity={0.7}
              onPress={onBack}
              style={styles.headerBackTouch}
            >
              <ArrowLeftIcon size={24} color={theme.colors.textDark} />
            </TouchableOpacity>
            <View style={styles.avatarOutline}>
              <DedicatedAgentAvatar />
              <View style={styles.onlineStatusDot} />
            </View>
            <View style={styles.supportAgentTitleCol}>
              <Text style={styles.agentTitle} maxFontSizeMultiplier={1.3}>Rinzo Support</Text>
              <Text style={styles.agentSubtitle} maxFontSizeMultiplier={1.3}>Online</Text>
            </View>
          </View>
        }
        rightCustom={
          <View style={styles.headerRightCol}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Phone Call support"
              accessibilityRole="button"
              activeOpacity={0.75}
              style={styles.headerCircleBtn}
            >
              <PhoneCallIcon size={18} color={theme.colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="More options"
              accessibilityRole="button"
              activeOpacity={0.75}
              style={styles.headerCircleBtn}
            >
              <ThreeDotsIcon size={18} color={theme.colors.textDark} />
            </TouchableOpacity>
          </View>
        }
      />

      {/* 2. CHAT SCROLL AREA WRAPPER */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 56 : 56}
        style={styles.keyboardContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: theme.spacing.md,
            },
          ]}
        >
          {/* Date Stamp capsule */}
          <View style={styles.dateCapsuleWrapper}>
            <View 
              style={styles.dateCapsule}
              accessible={true}
              accessibilityLabel="Date: Today"
              accessibilityRole="text"
            >
              <Text style={styles.dateCapsuleText} maxFontSizeMultiplier={1.3}>Today</Text>
            </View>
          </View>

          {/* Messages Mapping */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[styles.messageRow, isUser ? styles.userRow : styles.supportRow]}
                accessible={true}
                accessibilityLabel={`Message from ${msg.sender === 'user' ? 'you' : 'Rinzo Support'} at ${msg.timestamp}: ${msg.text}`}
                accessibilityRole="text"
              >
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.supportBubble]}>
                  <Text 
                    style={[styles.messageText, isUser ? styles.userMessageText : styles.supportMessageText]}
                    maxFontSizeMultiplier={1.3}
                  >
                    {msg.text}
                  </Text>
                </View>
                
                {/* Timestamp Row */}
                <View style={[styles.timestampRow, isUser && styles.userTimestampRow]}>
                  <Text style={styles.timeText} maxFontSizeMultiplier={1.3}>{msg.timestamp}</Text>
                  {isUser && <DoubleCheckIcon size={14} color="#7C4DFF" />}
                </View>
              </View>
            );
          })}

          {/* Attachment Card Document Layout */}
          <View style={styles.attachmentWrapper}>
            <View 
              style={styles.attachmentCard}
              accessible={true}
              accessibilityLabel="Attachment file: Order_#8892_Verification.pdf, size 1.2 megabytes, logistics log."
              accessibilityRole="text"
            >
              <View style={styles.attachmentCardHeader}>
                <View style={styles.attachmentIconCircle}>
                  <DocumentTextIcon size={20} color="#7C4DFF" />
                </View>
                <View style={styles.attachmentInfoCol}>
                  <Text style={styles.attachmentFileName} maxFontSizeMultiplier={1.3}>Order_#8892_Verification.pdf</Text>
                  <Text style={styles.attachmentFileSize} maxFontSizeMultiplier={1.3}>1.2 MB • Logistics Log</Text>
                </View>
              </View>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="View Verification Log"
                accessibilityRole="button"
                activeOpacity={0.8}
                style={styles.viewDocButton}
              >
                <Text style={styles.viewDocButtonText} maxFontSizeMultiplier={1.3}>View Verification Log</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Security Banner Lock */}
          <View 
            style={styles.securityLockWrapper}
            accessible={true}
            accessibilityLabel="Messages are encrypted and secure"
            accessibilityRole="text"
          >
            <LockIcon size={14} color="#8E8E93" />
            <Text style={styles.securityText} maxFontSizeMultiplier={1.3}>Messages are encrypted and secure</Text>
          </View>

        </ScrollView>

        {/* 3. FLOATING BOTTOM MESSAGE INPUT */}
        <View 
          style={[
            styles.messageInputFooterContainer,
            {
              paddingBottom: insets.bottom > 0 ? insets.bottom : theme.spacing.md,
            },
          ]}
        >
          <View style={styles.messageInputCard}>
            
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Attach files"
              accessibilityRole="button"
              activeOpacity={0.7}
              style={styles.inputAttachmentTouch}
            >
              <PaperclipIcon size={22} color="#8E8E93" />
            </TouchableOpacity>

            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#8E8E93"
              value={inputText}
              onChangeText={setInputText}
              multiline
              style={styles.textInputBox}
              maxFontSizeMultiplier={1.3}
            />

            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Open camera"
              accessibilityRole="button"
              activeOpacity={0.7}
              style={styles.inputCameraTouch}
            >
              <CameraIcon size={22} color="#8E8E93" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ scale: sendBtnScale }] }}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Send message"
                accessibilityRole="button"
                activeOpacity={inputText.trim() ? 0.8 : 1}
                disabled={!inputText.trim()}
                onPressIn={handleSendPressIn}
                onPressOut={handleSendPressOut}
                onPress={handleSendMessage}
                style={[
                  styles.sendButtonCircle,
                  !inputText.trim() && styles.sendButtonCircleDisabled,
                ]}
              >
                <SendAirplaneIcon size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>

          </View>
        </View>

      </KeyboardAvoidingView>

    </Animated.View>
  );
};

// ==========================================
// PIXEL PERFECT STYLE SYSTEM
// ==========================================

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FCFAFF', // Light lavender
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerBackTouch: {
    width: moderateScale(32),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatarOutline: {
    position: 'relative',
    width: moderateScale(34),
    height: moderateScale(34),
    marginLeft: 4,
  },
  agentAvatarContainer: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(17),
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    overflow: 'hidden',
  },
  onlineStatusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: moderateScale(9),
    height: moderateScale(9),
    borderRadius: moderateScale(4.5),
    backgroundColor: '#22C55E', // Green Online dot indicator
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  supportAgentTitleCol: {
    marginLeft: moderateScale(10),
  },
  agentTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
  },
  agentSubtitle: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(11),
    color: '#7C4DFF', // Branded subtitle color
  },
  headerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCircleBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  dateCapsuleWrapper: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  dateCapsule: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(14),
  },
  dateCapsuleText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(11),
    color: '#6C6C70',
  },
  messageRow: {
    marginBottom: moderateScale(16),
    maxWidth: '80%',
  },
  supportRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    ...theme.shadows.small,
  },
  supportBubble: {
    backgroundColor: '#FFFFFF', // Clean white background for support bubble
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: 'rgba(124, 77, 255, 0.06)',
  },
  userBubble: {
    backgroundColor: '#7C4DFF', // Purple bubble
    borderTopLeftRadius: moderateScale(20),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(4),
    borderTopRightRadius: moderateScale(20),
  },
  messageText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
  supportMessageText: {
    color: theme.colors.textDark,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(4),
    paddingHorizontal: moderateScale(4),
  },
  userTimestampRow: {
    alignSelf: 'flex-end',
  },
  timeText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(11),
    color: '#8E8E93',
    marginRight: moderateScale(4),
  },
  attachmentWrapper: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginBottom: moderateScale(16),
  },
  attachmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(22),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: '#F2F2F7',
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  attachmentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  attachmentIconCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(12),
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  attachmentInfoCol: {
    flex: 1,
    paddingRight: moderateScale(8),
  },
  attachmentFileName: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(13),
    color: theme.colors.textDark,
  },
  attachmentFileSize: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: moderateScale(11),
    color: '#8E8E93',
    marginTop: moderateScale(2),
  },
  viewDocButton: {
    minHeight: moderateScale(44),
    paddingVertical: theme.spacing.xs,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#F2F2F7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDocButtonText: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: moderateScale(13),
    color: '#7C4DFF',
  },
  securityLockWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  securityText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(11),
    color: '#8E8E93',
    marginLeft: moderateScale(6),
  },
  messageInputFooterContainer: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xs,
    backgroundColor: '#FCFAFF', // Matches screen background
    borderTopWidth: 1,
    borderColor: 'rgba(124, 77, 255, 0.08)',
  },
  messageInputCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(28),
    minHeight: moderateScale(56),
    paddingVertical: moderateScale(4),
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  inputAttachmentTouch: {
    width: moderateScale(38),
    height: moderateScale(38),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputBox: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: moderateScale(14),
    color: theme.colors.textDark,
    paddingHorizontal: moderateScale(8),
    paddingTop: Platform.OS === 'ios' ? moderateScale(6) : moderateScale(2),
    paddingBottom: Platform.OS === 'ios' ? moderateScale(6) : moderateScale(2),
    minHeight: moderateScale(36),
    maxHeight: moderateScale(80),
    textAlignVertical: 'top',
  },
  inputCameraTouch: {
    width: moderateScale(38),
    height: moderateScale(38),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(4),
  },
  sendButtonCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonCircleDisabled: {
    backgroundColor: '#B39DFF', // lighter disabled purple send
  },
});
