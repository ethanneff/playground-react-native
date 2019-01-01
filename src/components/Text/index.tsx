import * as React from "react";
import { StyleSheet, Text as Original, ViewStyle } from "react-native";
import { FontSize } from "../../utils";

const styles = StyleSheet.create({
  bold: {
    fontWeight: "600" // TODO: figure out why I cannot import FontWeight.Medium with tests
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
    if (h1) {
      return FontSize.h1;
    }
    if (h2) {
      return FontSize.h2;
    }
    if (h3) {
      return FontSize.h3;
    }
    if (h4) {
      return FontSize.h4;
    }
    if (h5) {
      return FontSize.h5;
    }
    if (h6) {
      return FontSize.h6;
    }
    if (subtitle1) {
      return FontSize.subtitle1;
    }
    if (subtitle2) {
      return FontSize.subtitle2;
    }
    if (body1) {
      return FontSize.body1;
    }
    if (body2) {
      return FontSize.body2;
    }
    if (button) {
      return FontSize.button;
    }
    if (caption) {
      return FontSize.caption;
    }
    if (overline) {
      return FontSize.overline;
    }
    return FontSize.body2;
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
