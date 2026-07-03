import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { theme } from '../../theme';
import { moderateScale } from '../../utils/responsive';

const s = (size: number) => moderateScale(size, 0.3);

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(({
  label,
  error,
  prefix,
  suffix,
  containerStyle,
  inputContainerStyle,
  onFocus,
  onBlur,
  style,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          error ? styles.errorContainer : null,
          inputContainerStyle,
        ]}
      >
        {prefix && <View style={styles.prefixWrapper}>{prefix}</View>}
        
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.textLight}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />

        {suffix && <View style={styles.suffixWrapper}>{suffix}</View>}
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textDark,
    marginBottom: theme.spacing.xxs,
  },
  inputContainer: {
    height: s(52),
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.cardBg,
    paddingHorizontal: theme.spacing.sm,
  },
  focusedContainer: {
    borderColor: theme.colors.primary,
  },
  errorContainer: {
    borderColor: theme.colors.error,
  },
  prefixWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.xs,
  },
  suffixWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textDark,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error,
    marginTop: theme.spacing.xxs,
  },
});

export default CustomInput;
