import * as React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { KeyboardAvoid } from "./KeyboardAvoid";
import { NavBar } from "./NavBar";

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

export class Screen extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.color.background,
      flex: 1
    }
  });

  public render() {
    const {
      title,
      style,
      onLeftPress,
      onRightPress,
      children,
      disableScroll,
      leftIcon,
      rightIcon
    } = this.props;
    return (
      <SafeAreaView style={[this.styles.container, style]}>
        <NavBar
          title={title}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onLeftPress={onLeftPress}
          onRightPress={onRightPress}
        />
        <KeyboardAvoid
          scrollEnabled={!disableScroll}
          style={[this.styles.container, style]}
        >
          {children}
        </KeyboardAvoid>
      </SafeAreaView>
    );
  }
}
