import * as React from "react";
import { StyleSheet, Text as Original, ViewStyle } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  bold: {
    fontWeight: Theme.fontWeight.medium
  },
  center: {
    textAlign: "center"
  }
});

interface Props {
  title?: string;
  style?: ViewStyle | {};

  center?: boolean;
  bold?: boolean;
  hidden?: boolean;

  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  subtitle1?: boolean;
  subtitle2?: boolean;
  body1?: boolean;
  body2?: boolean;
  button?: boolean;
  caption?: boolean;
  overline?: boolean;
}

export class Text extends React.PureComponent<Props> {
  public getFont() {
    const {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      subtitle1,
      subtitle2,
      body1,
      body2,
      button,
      caption,
      overline
    } = this.props;
    return h1
      ? Theme.fontSize.h1
      : h2
      ? Theme.fontSize.h2
      : h3
      ? Theme.fontSize.h3
      : h4
      ? Theme.fontSize.h4
      : h5
      ? Theme.fontSize.h5
      : h6
      ? Theme.fontSize.h6
      : subtitle1
      ? Theme.fontSize.subtitle1
      : subtitle2
      ? Theme.fontSize.subtitle2
      : body1
      ? Theme.fontSize.body1
      : body2
      ? Theme.fontSize.body2
      : button
      ? Theme.fontSize.button
      : caption
      ? Theme.fontSize.caption
      : overline
      ? Theme.fontSize.overline
      : Theme.fontSize.body2;
  }

  public render() {
    const { title, style, button, bold, overline, center, hidden } = this.props;
    const text = button || overline ? (title || "").toUpperCase() : title;
    const textStyle = [
      this.getFont(),
      center && styles.center,
      bold && styles.bold,
      style
    ];
    if (title === undefined || title.length === 0 || hidden) {
      return null;
    }
    return <Original style={textStyle}>{text}</Original>;
  }
}
