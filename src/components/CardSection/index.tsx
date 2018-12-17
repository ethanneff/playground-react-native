import * as React from "react";
import { StyleSheet, TextStyle, View } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Theme.color.background,
    flexDirection: "row",
    borderColor: Theme.color.dark
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
