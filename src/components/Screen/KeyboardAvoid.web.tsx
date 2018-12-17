import * as React from "react";
import { View, ViewStyle } from "react-native";

interface Props {
  style: ViewStyle | {};
}

export class KeyboardAvoid extends React.PureComponent<Props> {
  public render() {
    const { style, children } = this.props;
    return <View style={style}>{children}</View>;
  }
}
