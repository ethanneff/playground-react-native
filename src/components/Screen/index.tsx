import * as React from "react";
import { SafeAreaView, StyleSheet, ViewStyle, StatusBar } from "react-native";
import { KeyboardAvoid } from "./KeyboardAvoid";
import { NavBar } from "./NavBar";
import { useRootSelector } from "../../containers";
import { getCurrentColor } from "../../models";

interface OwnProps {
  style?: ViewStyle;
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  disableScroll?: boolean;
  onLeftPress?(): void;
  onRightPress?(): void;
}

type Props = OwnProps;

export const Screen: React.FC<Props> = props => {
  const {
    title,
    style,
    onLeftPress,
    onRightPress,
    children,
    disableScroll,
    leftIcon,
    rightIcon
  } = props;
  const colors = useRootSelector(state => getCurrentColor(state));
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      flex: 1
    }
  });

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle={colors.statusBar} />
      <NavBar
        title={title}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onLeftPress={onLeftPress}
        onRightPress={onRightPress}
      />
      <KeyboardAvoid
        scrollEnabled={!disableScroll}
        style={[styles.container, style]}
      >
        {children}
      </KeyboardAvoid>
    </SafeAreaView>
  );
};
