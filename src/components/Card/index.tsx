import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Theme} from '../../utils';
import {useColor, useDropShadow} from '../../hooks';

interface Props {
  testID?: string;
  flex?: boolean;
  style?: ViewStyle;
  selected?: boolean;
  noPadding?: boolean;
  noMargin?: boolean;
  elevation?: number;
  borderWidth?: number;
  borderRadius?: number;
  onPress?(): void;
  onLongPress?(): void;
}

const touchOpacity = 0.3;
export const Card: React.FC<Props> = memo(
  ({
    borderRadius = Theme.sizing.borderRadius,
    borderWidth = 1,
    children,
    elevation = 2,
    onLongPress,
    onPress,
    noMargin,
    noPadding,
    flex,
    selected,
    testID,
    style,
  }) => {
    const color = useColor();
    const dropShadow = useDropShadow(elevation);
    const opacity =
      elevation === 0
        ? 0
        : elevation === 1
        ? 0.05
        : ((elevation - 2) * 0.01 + 0.07).toFixed(2);
    const styles = StyleSheet.create({
      containerStyle: {
        backgroundColor: color.background,
        borderColor: color.background,
        borderRadius,
        borderWidth,
        marginVertical: noMargin ? 0 : Theme.padding.p02,
        ...dropShadow,
      },
      contents: {
        backgroundColor: `hsla(0,0%,100%,${opacity})`,
        borderRadius,
        padding: noPadding ? 0 : Theme.padding.p04,
      },
      flex: {
        flex: 1,
      },
      selected: {
        backgroundColor: color.primary,
      },
    });

    const containerStyles = [
      styles.containerStyle,
      selected ? styles.selected : undefined,
      flex ? styles.flex : undefined,
      style,
    ];
    const contentStyles = [styles.contents, flex ? styles.flex : undefined];
    return (
      <TouchableOpacity
        testID={testID}
        style={containerStyles}
        onPress={onPress && onPress}
        onLongPress={onLongPress && onLongPress}
        activeOpacity={onPress ? touchOpacity : 1}
        disabled={!onPress}>
        <View style={contentStyles}>{children}</View>
      </TouchableOpacity>
    );
  },
);
