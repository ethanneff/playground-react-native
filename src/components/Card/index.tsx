import React, {memo, ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {useColor, useDropShadow} from '../../hooks';
import {config} from '../../utils';
import {TouchableOpacity} from '../TouchableOpacity';

type Props = {
  testID?: string;
  flex?: boolean;
  style?: ViewStyle;
  selected?: boolean;
  noPadding?: boolean;
  noMargin?: boolean;
  elevation?: number;
  borderWidth?: number;
  borderRadius?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  children?: ReactNode | ReactNode[];
};

const getOpacity = (elevation: number) =>
  elevation === 0
    ? 0
    : elevation === 1
    ? 0.05
    : ((elevation - 2) * 0.01 + 0.07).toFixed(2);
const touchOpacity = 0.3;

export const Card = memo(function Card({
  testID,
  borderRadius = config.sizing.borderRadius,
  borderWidth = 1,
  children,
  elevation = 2,
  onLongPress,
  onPress,
  noMargin,
  noPadding,
  flex,
  selected,
  style,
}: Props) {
  const color = useColor();
  const dropShadow = useDropShadow();
  const opacity = getOpacity(elevation);
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: color.background,
      borderColor: color.background,
      borderRadius,
      borderWidth,
      marginVertical: noMargin ? 0 : config.padding(2),
      ...dropShadow(elevation),
    },
    contents: {
      backgroundColor: `hsla(0,0%,100%,${opacity})`,
      borderRadius,
      padding: noPadding ? 0 : config.padding(4),
    },
    flex: {flex: 1},
    selected: {backgroundColor: color.primary},
  });

  const containerStyles = [
    styles.containerStyle,
    selected ? styles.selected : undefined,
    flex ? styles.flex : undefined,
    style,
  ];
  const contentStyles = [styles.contents, flex ? styles.flex : undefined];
  const child = <View style={contentStyles}>{children}</View>;

  return onPress || onLongPress ? (
    <TouchableOpacity
      activeOpacity={onPress ? touchOpacity : 1}
      onLongPress={onLongPress}
      onPress={onPress}
      style={containerStyles}
      testID={testID}>
      {child}
    </TouchableOpacity>
  ) : (
    <View style={containerStyles} testID={testID}>
      {child}
    </View>
  );
});
