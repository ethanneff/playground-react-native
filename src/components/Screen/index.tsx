import React, { memo } from "react";
import { SafeAreaView, StatusBar, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { NavBar } from "./NavBar";
import { KeyboardAware } from "./KeyboardAware";
import { useColor } from "../../hooks";

interface OwnProps {
  style?: ViewStyle;
  title?: string;
  border?: boolean;
  gutter?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  scroll?: boolean;
  onLeftPress?(): void;
  onRightPress?(): void;
}

type Props = OwnProps;

export const Screen: React.FC<Props> = memo(function Screen({
  title,
  style,
  gutter,
  border,
  onLeftPress,
  onRightPress,
  children,
  scroll,
  leftIcon,
  rightIcon
}) {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex: 1
    },
    gutter: {
      flex: 1,
      padding: gutter ? Theme.padding.p04 : Theme.padding.p00
    }
  });
  const childrenStyles = [
    styles.container,
    gutter ? styles.gutter : undefined,
    style
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={color.statusBar} />
      <NavBar
        border={border}
        title={title}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      <KeyboardAware disableScroll={scroll} style={childrenStyles}>
        {children}
      </KeyboardAware>
    </SafeAreaView>
  );
});
