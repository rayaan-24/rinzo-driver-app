import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

const cleanStyle = (style: any): any => {
  if (!style) return style;

  if (Array.isArray(style)) {
    return style.map(cleanStyle);
  }

  if (typeof style === 'object') {
    // If the style specifies a custom Poppins font family, strip the fontWeight
    if (style.fontFamily && typeof style.fontFamily === 'string' && style.fontFamily.includes('Poppins')) {
      const newStyle = { ...style };
      delete newStyle.fontWeight;
      return newStyle;
    }
  }

  return style;
};

const cleanProps = (props: any) => {
  if (props && props.style) {
    return {
      ...props,
      style: cleanStyle(props.style),
    };
  }
  return props;
};

// Monkey patch Text.render
if ((Text as any).render) {
  const originalTextRender = (Text as any).render;
  (Text as any).render = function (props: any, ref: any) {
    const cleanedProps = cleanProps(props);
    return originalTextRender.call(this, cleanedProps, ref);
  };
} else if ((Text as any).prototype && (Text as any).prototype.render) {
  const originalTextRender = (Text as any).prototype.render;
  (Text as any).prototype.render = function () {
    this.props = cleanProps(this.props);
    return originalTextRender.call(this);
  };
}

// Monkey patch TextInput.render
if ((TextInput as any).render) {
  const originalInputRender = (TextInput as any).render;
  (TextInput as any).render = function (props: any, ref: any) {
    const cleanedProps = cleanProps(props);
    return originalInputRender.call(this, cleanedProps, ref);
  };
} else if ((TextInput as any).prototype && (TextInput as any).prototype.render) {
  const originalInputRender = (TextInput as any).prototype.render;
  (TextInput as any).prototype.render = function () {
    this.props = cleanProps(this.props);
    return originalInputRender.call(this);
  };
}
