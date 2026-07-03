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
import { theme } from '../../../theme';
import { moderateScale } from '../../../utils/responsive';

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
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Entrance animations
  const screenFade = useRef(new Animated.Value(0)).current;
  const sendBtnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Intercept hardware back button on Android
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    Animated.timing(screenFade, { toValue: 1, duration: 250, useNativeDriver: true }).start();

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
      <View style={styles.headerContainer}>
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
            <Text style={styles.agentTitle}>Rinzo Support</Text>
            <Text style={styles.agentSubtitle}>Online</Text>
          </View>
        </View>

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
      </View>

      {/* 2. CHAT SCROLL AREA WRAPPER */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Date Stamp capsule */}
          <View style={styles.dateCapsuleWrapper}>
            <View style={styles.dateCapsule}>
              <Text style={styles.dateCapsuleText}>Today</Text>
            </View>
          </View>

          {/* Messages Mapping */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[styles.messageRow, isUser ? styles.userRow : styles.supportRow]}
              >
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.supportBubble]}>
                  <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.supportMessageText]}>
                    {msg.text}
                  </Text>
                </View>
                
                {/* Timestamp Row */}
                <View style={[styles.timestampRow, isUser && styles.userTimestampRow]}>
                  <Text style={styles.timeText}>{msg.timestamp}</Text>
                  {isUser && <DoubleCheckIcon size={14} color="#7C4DFF" />}
                </View>
              </View>
            );
          })}

          {/* Attachment Card Document Layout */}
          <View style={styles.attachmentWrapper}>
            <View style={styles.attachmentCard}>
              <View style={styles.attachmentCardHeader}>
                <View style={styles.attachmentIconCircle}>
                  <DocumentTextIcon size={20} color="#7C4DFF" />
                </View>
                <View style={styles.attachmentInfoCol}>
                  <Text style={styles.attachmentFileName}>Order_#8892_Verification.pdf</Text>
                  <Text style={styles.attachmentFileSize}>1.2 MB • Logistics Log</Text>
                </View>
              </View>

              <TouchableOpacity
                accessible={true}
                accessibilityLabel="View Verification Log"
                accessibilityRole="button"
                activeOpacity={0.8}
                style={styles.viewDocButton}
              >
                <Text style={styles.viewDocButtonText}>View Verification Log</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Security Banner Lock */}
          <View style={styles.securityLockWrapper}>
            <LockIcon size={14} color="#8E8E93" />
            <Text style={styles.securityText}>Messages are encrypted and secure</Text>
          </View>

        </ScrollView>

        {/* 3. FLOATING BOTTOM MESSAGE INPUT */}
        <View style={styles.messageInputFooterContainer}>
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
  headerContainer: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F5',
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerBackTouch: {
    width: 32,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  avatarOutline: {
    position: 'relative',
    width: 34,
    height: 34,
    marginLeft: 4,
  },
  agentAvatarContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#22C55E', // Green Online dot indicator
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  supportAgentTitleCol: {
    marginLeft: 10,
  },
  agentTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: theme.colors.textDark,
  },
  agentSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#7C4DFF', // Branded subtitle color
  },
  headerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    paddingBottom: moderateScale(90),
  },
  dateCapsuleWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateCapsule: {
    backgroundColor: '#E5E5EA',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 14,
  },
  dateCapsuleText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#6C6C70',
  },
  messageRow: {
    marginBottom: 16,
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
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  supportBubble: {
    backgroundColor: '#E9E9EB', // Light grey bubble
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#7C4DFF', // Purple bubble
    borderTopRightRadius: 4,
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
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
    marginTop: 4,
    paddingHorizontal: 4,
  },
  userTimestampRow: {
    alignSelf: 'flex-end',
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#8E8E93',
    marginRight: 4,
  },
  attachmentWrapper: {
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginBottom: 16,
  },
  attachmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
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
    marginBottom: 16,
  },
  attachmentIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  attachmentInfoCol: {
    flex: 1,
    paddingRight: 8,
  },
  attachmentFileName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: theme.colors.textDark,
  },
  attachmentFileSize: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  viewDocButton: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDocButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: '#7C4DFF',
  },
  securityLockWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  securityText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#8E8E93',
    marginLeft: 6,
  },
  messageInputFooterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: 'transparent',
  },
  messageInputCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 8,
    shadowColor: '#7C4DFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  inputAttachmentTouch: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputBox: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.textDark,
    paddingHorizontal: 8,
    maxHeight: 44,
  },
  inputCameraTouch: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  sendButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonCircleDisabled: {
    backgroundColor: '#B39DFF', // lighter disabled purple send
  },
});
