import { moderateScale } from '../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);

export const theme = {
  colors: {
    primary: '#8664EC',          // Purple for primary actions
    primaryLight: '#EFE8FF',     // Lavender background
    background: '#F8F8FC',       // Off-white light purple-grey background
    cardBg: '#FFFFFF',           // White card background
    textDark: '#1C1C1E',         // Main heading and titles
    textMedium: '#8E8E93',       // Secondary info and descriptions
    textLight: '#AEAEB2',        // Very subtle text/borders
    success: '#10B981',          // Green for success/completed
    successLight: '#E6F7F0',     // Light green background
    error: '#EF4444',            // Red for alert/high priority
    errorLight: '#FEE2E2',       // Light red background
    border: '#E5E7EB',           // Light border color
    borderLight: '#F2F2F7',      // Very light borders
  },
  spacing: {
    xxs: s(4),
    xs: s(8),
    sm: s(12),
    md: s(16),
    lg: s(20),
    xl: s(24),
    xxl: s(32),
  },
  borderRadius: {
    xs: s(4),
    sm: s(8),
    md: s(12),
    lg: s(16),
    xl: s(24),
    xxl: s(32),
    circle: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: s(11),
      sm: s(13),
      md: s(15),
      lg: s(18),
      xl: s(20),
      xxl: s(24),
      huge: s(32),
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      heavy: '800' as const,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#6338C3',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
