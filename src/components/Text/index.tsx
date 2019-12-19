import React, { memo } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";
import { Theme, colorWithOpacity } from "../../utils";
import { useNativeDriver, useColor } from "../../hooks";
import { getTextColorPercent, getFontSize } from "./utils";

export enum EllipsizeMode {
  Head = "head",
  Middle = "middle",
  Tail = "tail",
  Clip = "clip"
}

export interface TextProps {
  title?: string;
  style?: ViewStyle | {};

  center?: boolean;
  centerVertically?: boolean;
  bold?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  inverse?: boolean;
  secondary?: boolean;

  numberOfLines?: number;
  ellipsizeMode?: EllipsizeMode;

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

  high?: boolean;
  medium?: boolean;
  low?: boolean;

  onPress?(): void;
}

export const Text: React.FC<TextProps> = memo(function Text(props: TextProps) {
  const {
    button,
    overline,
    title,
    onPress,
    hidden,
    center,
    bold,
    ellipsizeMode,
    centerVertically,
    invisible,
    style,
    numberOfLines
  } = props;
  const opacity = new Animated.Value(1);
  const color = useColor();
  const nativeDriver = useNativeDriver();
  const textColorPercent = getTextColorPercent(props);
  const fontSize = getFontSize(props);
  const textColor = props.inverse ? color.background : color.text;
  const textColorWithOpacity = colorWithOpacity(textColor, textColorPercent);
  const text = button || overline ? (title || "").toUpperCase() : title;
  const styles = StyleSheet.create({
    bold: {
      fontWeight: Theme.fontWeight.medium
    },
    center: {
      textAlign: "center"
    },
    centerVertically: {
      flex: 1,
      textAlignVertical: "center"
    },
    invisible: {
      opacity: 0
    },
    color: {
      color: textColorWithOpacity
    }
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    // TODO: does not work on real devices
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 50,
        toValue: 0.2,
        useNativeDriver: nativeDriver
      }),
      Animated.timing(opacity, {
        duration: 350,
        toValue: 1,
        useNativeDriver: nativeDriver
      })
    ]).start();
  };

  const textStyle = [
    styles.color,
    fontSize,
    center && styles.center,
    centerVertically && styles.centerVertically,
    bold && styles.bold,
    { opacity },
    invisible && styles.invisible,
    style
  ];

  return title === undefined || hidden ? null : 
    <Animated.Text
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={textStyle}
      onPress={onPress ? handlePress : undefined}
    >
      {text}
    </Animated.Text>
  ;
});
