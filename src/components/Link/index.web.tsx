import * as React from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { Link as Original } from "react-router-dom";
import { Text } from "..";
import { Theme } from "../../utils";

const styles = {
  link: {
    color: Theme.color.dark,
    textDecoration: "none"
  }
};

interface Props {
  to: string;
  title: string;
  buttonStyle?: ViewStyle | {};
  textStyle?: TextStyle | {};
}

export class Link extends React.PureComponent<Props> {
  public render() {
    const { to, title, buttonStyle, textStyle } = this.props;
    return (
      <TouchableOpacity style={buttonStyle}>
        <Original to={to} style={styles.link}>
          <Text button center title={title} style={textStyle} />
        </Original>
      </TouchableOpacity>
    );
  }
}
