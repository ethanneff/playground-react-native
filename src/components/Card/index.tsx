import * as React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Theme.color.background,
    elevation: 1,
    margin: Theme.padding.p02,
    padding: Theme.padding.p04,
    position: "relative",
    shadowColor: Theme.color.dark,
    shadowOffset: {
      height: 4,
      width: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    zIndex: 1
  }
});

interface Props {
  style?: ViewStyle;
  onPress?(): void;
}

export class Card extends React.PureComponent<Props> {
  private touchOpacity = 0.3;
  public render() {
    const { style, children, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.containerStyle, style]}
        onPress={onPress && onPress}
        activeOpacity={onPress ? this.touchOpacity : 1}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
