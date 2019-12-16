import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { useColor } from "../../hooks";

interface Props {
  flex?: boolean;
  style?: ViewStyle;
  selected?: boolean;
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
    elevation = 1,
    onLongPress,
    onPress,
    flex,
    selected,
    style
  }) => {
    const color = useColor();
    const shadowOpacity = elevation * 0.036 + 0.12;
    const shadowRadius = elevation * 0.36 + 1.2;
    const opacity =
      elevation === 0
        ? 0
        : elevation === 1
        ? 0.05
        : ((elevation - 2) * 0.01 + 0.07).toFixed(2);
    const styles = StyleSheet.create({
      containerStyle: {
        backgroundColor: color.background,
        borderColor: color.surface,
        borderRadius,
        borderWidth,
        elevation,
        marginHorizontal: Theme.padding.p04,
        marginVertical: Theme.padding.p02,
        shadowColor: color.dark,
        shadowOffset: {
          height: 2,
          width: 0
        },
        shadowOpacity,
        shadowRadius,
        zIndex: elevation
      },
      contents: {
        backgroundColor: `hsla(0,0%,100%,${opacity})`,
        borderRadius,
        padding: Theme.padding.p04
      },
      flex: {
        flex: 1
      },
      selected: {
        backgroundColor: color.primary
      }
    });

    const containerStyles = [
      styles.containerStyle,
      selected ? styles.selected : undefined,
      flex ? styles.flex : undefined,
      style
    ];
    const contentStyles = [styles.contents, flex ? styles.flex : undefined];
    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={onPress && onPress}
        onLongPress={onLongPress && onLongPress}
        activeOpacity={onPress ? touchOpacity : 1}
        disabled={!onPress || !onLongPress}
      >
        <View style={contentStyles}>{children}</View>
      </TouchableOpacity>
    );
  }
);
