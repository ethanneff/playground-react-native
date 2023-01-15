import React, { type ReactNode } from 'react';
import {
  type AccessibilityRole,
  type FlexAlignType,
  type LayoutChangeEvent,
  type StyleProp,
  StyleSheet,
  // eslint-disable-next-line no-restricted-imports
  View as Original,
  type ViewStyle,
} from 'react-native';
import { type MonoMultiColor, useColors } from '../../features';

type Props = {
  accessibilityRole?: AccessibilityRole;
  accessible?: boolean;
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch';
  alignItems?: FlexAlignType;
  alignSelf?: FlexAlignType;
  backgroundColor?: keyof MonoMultiColor;
  borderRadius?: number;
  children?: ReactNode;
  cursor?: 'default' | 'pointer';
  display?: 'flex' | 'none';
  flex?: number;
  flexBasis?: number;
  flexDirection?: 'column' | 'row';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
  height?: number;
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  margin?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  onTouchStart?: () => void;
  opacity?: number;
  overflow?: 'hidden' | 'scroll' | 'visible';
  padding?: number;
  position?: 'absolute' | 'relative';
  style?: StyleProp<ViewStyle>;
  testID?: string;
  width?: number;
};

export const View = ({
  accessibilityRole,
  accessible,
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  children,
  cursor,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
  justifyContent,
  margin,
  onLayout,
  onTouchStart,
  opacity,
  overflow,
  padding,
  position,
  style,
  testID,
  width,
}: Props) => {
  const colors = useColors();

  const styles = StyleSheet.create({
    view: {
      alignContent,
      alignItems,
      alignSelf,
      backgroundColor: backgroundColor
        ? colors.background[backgroundColor]
        : undefined,
      borderRadius,
      cursor,
      display,
      flex,
      flexBasis,
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      height,
      justifyContent,
      margin,
      opacity,
      overflow,
      padding,
      position,
      width,
    },
  });

  return (
    <Original
      accessibilityRole={accessibilityRole}
      accessible={accessible}
      onLayout={onLayout}
      onTouchStart={onTouchStart}
      style={[styles.view, style]}
      testID={testID}
    >
      {children}
    </Original>
  );
};
