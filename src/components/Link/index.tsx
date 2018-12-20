import * as React from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { Link as Original } from "react-router-native";
import { Text } from "..";
import { Theme } from "../../utils";

interface Props {
  to: string;
  title: string;
  underlayColor?: string;
  buttonStyle?: ViewStyle | {};
  textStyle?: TextStyle | {};
}

export class Link extends React.PureComponent<Props> {
  public render() {
    const {
      to,
      title,
      underlayColor = Theme.color.background,
      buttonStyle,
      textStyle
    } = this.props;
    return (
      <TouchableOpacity style={buttonStyle}>
        <Original to={to} underlayColor={underlayColor}>
          <Text button center title={title} style={textStyle} />
        </Original>
      </TouchableOpacity>
    );
  }
}
