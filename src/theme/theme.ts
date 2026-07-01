export const theme = {
  colors: {
    primary: '#6338C3',          // Purple for primary actions
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
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    circle: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 20,
      xxl: 24,
      huge: 32,
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
