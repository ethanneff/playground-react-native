import * as React from "react";
import { StyleSheet, Text as Original, ViewStyle } from "react-native";

export enum FontWeight {
  Light = "100",
  Regular = "300",
  Medium = "600"
}

// sizing: https://material.io/design/typography/the-type-system.html#applying-the-type-scale
const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.Medium
  },
  center: {
    textAlign: "center"
  },
  h1: {
    fontSize: 96,
    letterSpacing: -1.5,
    fontWeight: FontWeight.Light
  },
  h2: {
    fontSize: 60,
    letterSpacing: -0.5,
    fontWeight: FontWeight.Light
  },
  h3: {
    fontSize: 48,
    letterSpacing: 0,
    fontWeight: FontWeight.Regular
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25,
    fontWeight: FontWeight.Regular
  },
  h5: {
    fontSize: 24,
    letterSpacing: 0,
    fontWeight: FontWeight.Regular
  },
  h6: {
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: FontWeight.Medium
  },
  subtitle1: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: FontWeight.Regular
  },
  subtitle2: {
    fontSize: 14,
    letterSpacing: 0.1,
    fontWeight: FontWeight.Medium
  },
  body1: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: FontWeight.Regular
  },
  body2: {
    fontSize: 14,
    letterSpacing: 0.25,
    fontWeight: FontWeight.Regular
  },
  button: {
    fontSize: 14,
    letterSpacing: 0.75,
    fontWeight: FontWeight.Medium
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontWeight: FontWeight.Regular
  },
  overline: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: FontWeight.Regular
  }
});

interface Props {
  title?: string;
  style?: ViewStyle | {};

  center?: boolean;
  bold?: boolean;

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
      return styles.h1;
    }
    if (h2) {
      return styles.h2;
    }
    if (h3) {
      return styles.h3;
    }
    if (h4) {
      return styles.h4;
    }
    if (h5) {
      return styles.h5;
    }
    if (h6) {
      return styles.h6;
    }
    if (subtitle1) {
      return styles.subtitle1;
    }
    if (subtitle2) {
      return styles.subtitle2;
    }
    if (body1) {
      return styles.body1;
    }
    if (body2) {
      return styles.body2;
    }
    if (button) {
      return styles.button;
    }
    if (caption) {
      return styles.caption;
    }
    if (overline) {
      return styles.overline;
    }
    return styles.body2;
  }

  public render() {
    const { title, style, button, bold, overline, center } = this.props;
    const text = button || overline ? (title || "").toUpperCase() : title;
    const font = this.getFont();
    if (!title || title.length === 0) return null;
    return (
      <Original
        style={[font, center && styles.center, bold && styles.bold, style]}
      >
        {text}
      </Original>
    );
  }
}
