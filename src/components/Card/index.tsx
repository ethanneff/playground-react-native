import * as React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  containerStyle: {
    padding: Theme.padding.p4,
    marginHorizontal: Theme.padding.p4,
    marginVertical: Theme.padding.p2,
    backgroundColor: Theme.color.background,
    zIndex: 1,
    elevation: 1,
    position: "relative",
    shadowColor: Theme.color.dark,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 6,
    shadowOpacity: 0.6
  }
});

interface Props {
  style?: ViewStyle;
  onPress?(): void;
}

export class Card extends React.PureComponent<Props> {
  public touchOpacity = 0.3;
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
