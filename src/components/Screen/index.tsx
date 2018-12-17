import * as React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { KeyboardAvoid } from "./KeyboardAvoid";
import { NavBar } from "./NavBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.background
  }
});

interface OwnProps {
  style?: ViewStyle | {};
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  disableScroll?: boolean;
  onLeftPress?(): void;
  onRightPress?(): void;
}

type Props = OwnProps;

export class Screen extends React.PureComponent<Props> {
  public render() {
    const {
      title,
      style,
      onLeftPress,
      onRightPress,
      children,
      disableScroll,
      leftIcon = "arrow-left",
      rightIcon = "close"
    } = this.props;
    return (
      <SafeAreaView style={[styles.container, style]}>
        <NavBar
          title={title}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onLeftPress={onLeftPress && onLeftPress}
          onRightPress={onRightPress && onRightPress}
        />
        <KeyboardAvoid scrollEnabled={!disableScroll} style={styles.container}>
          {children}
        </KeyboardAvoid>
      </SafeAreaView>
    );
  }
}
