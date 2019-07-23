import React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Theme.color.background,
    borderBottomWidth: 0.5,
    borderColor: Theme.color.dark,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

interface Props {
  style?: TextStyle;
}

export class CardSection extends React.PureComponent<Props> {
  public render() {
    const { style, children } = this.props;
    return <View style={[styles.containerStyle, style]}>{children}</View>;
  }
}
