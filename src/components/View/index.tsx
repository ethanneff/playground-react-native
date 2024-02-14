import React, { type ReactNode, type RefObject } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  View as Original,
  StyleSheet,
  type AccessibilityRole,
  type FlexAlignType,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useColors, type MonoMultiColor } from '../../features';

export type ViewReference = Original | null;

type Properties = {
  readonly accessibilityLabel?: string;
  readonly accessibilityRole?: AccessibilityRole;
  readonly accessible?: boolean;
  readonly alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch';
  readonly alignItems?: FlexAlignType;
  readonly alignSelf?: FlexAlignType;
  readonly backgroundColor?: keyof MonoMultiColor;
  readonly borderRadius?: number;
  readonly children?: ReactNode;
  readonly collapsable?: boolean;
  readonly cursor?: 'default' | 'pointer';
  readonly display?: 'flex' | 'none';
  readonly flex?: number;
  readonly flexBasis?: number;
  readonly flexDirection?: 'column' | 'row';
  readonly flexGrow?: number;
  readonly flexShrink?: number;
  readonly flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
  readonly gap?: number;
  readonly height?: number;
  readonly justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  readonly margin?: number;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly onRef?: RefObject<Original>;
  readonly onTouchStart?: () => void;
  readonly opacity?: number;
  readonly overflow?: 'hidden' | 'scroll' | 'visible';
  readonly padding?: number;
  readonly paddingHorizontal?: number;
  readonly paddingVertical?: number;
  readonly position?: 'absolute' | 'relative';
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
  readonly width?: number;
};

export const View = ({
  accessibilityLabel,
  accessibilityRole,
  accessible,
  alignContent,
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  children,
  collapsable,
  cursor,
  display,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  gap,
  height,
  justifyContent,
  margin,
  onLayout,
  onRef,
  onTouchStart,
  opacity,
  overflow,
  padding,
  paddingHorizontal,
  paddingVertical,
  position,
  style,
  testID,
  width,
}: Properties) => {
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
      gap,
      height,
      justifyContent,
      margin,
      opacity,
      overflow,
      padding,
      paddingHorizontal,
      paddingVertical,
      position,
      width,
    },
  });

  return (
    <Original
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessible={accessible}
      collapsable={collapsable}
      onLayout={onLayout}
      onTouchStart={onTouchStart}
      ref={onRef}
      style={[styles.view, style]}
      testID={testID}
    >
      {children}
    </Original>
  );
};
