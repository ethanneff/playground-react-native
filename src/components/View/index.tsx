import React, { ReactNode } from 'react';
import {
  FlexAlignType,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  // eslint-disable-next-line no-restricted-imports
  View as Original,
  ViewStyle,
} from 'react-native';
import { MonoMultiColor, useColors } from '../../features';

type Props = {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  alignItems?: FlexAlignType;
  alignSelf?: FlexAlignType;
  backgroundColor?: keyof MonoMultiColor;
  borderRadius?: number;
  children?: ReactNode;
  cursor?: 'default' | 'pointer';
  display?: 'flex' | 'none';
  flex?: number;
  flexBasis?: number;
  flexDirection?: 'row' | 'column';
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  height?: number;
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  margin?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
  onTouchStart?: () => void;
  opacity?: number;
  overflow?: 'scroll' | 'visible' | 'hidden';
  padding?: number;
  position?: 'absolute' | 'relative';
  style?: StyleProp<ViewStyle>;
  testID?: string;
  width?: number;
};

export const View = ({
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
  testID,
  margin,
  opacity,
  overflow,
  padding,
  position,
  style,
  width,
  onTouchStart,
  onLayout,
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
      onLayout={onLayout}
      onTouchStart={onTouchStart}
      style={[styles.view, style]}
      testID={testID}
    >
      {children}
    </Original>
  );
};
