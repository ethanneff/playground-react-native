import { Color } from "./../../models/Theme/index";
import { StyleSheet } from "react-native";
import { Theme } from "./../../utils";
import { ButtonProps } from ".";

export const getButtonColor = (color: Color, props: ButtonProps) =>
  props.primary
    ? color.primary
    : props.secondary
    ? color.secondary
    : props.success
    ? color.success
    : props.danger
    ? color.danger
    : props.warning
    ? color.warning
    : props.info
    ? color.info
    : props.light
    ? color.light
    : props.dark
    ? color.dark
    : color.text;

export const getStyles = (
  color: Color,
  buttonColor: string,
  textColor: string,
  outlined?: boolean
) =>
  StyleSheet.create({
    center: {
      alignSelf: "center"
    },
    containedBody: {
      backgroundColor: buttonColor
    },
    container: {
      alignItems: "center",
      backgroundColor: outlined ? color.background : "transparent",
      borderColor: outlined ? color.dark : "transparent",
      borderRadius: Theme.padding.p01,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: Theme.padding.p04
    },
    fab: {
      alignSelf: "flex-start",
      borderRadius: Theme.padding.p08,
      padding: Theme.padding.p04
    },
    half: {
      width: "50%"
    },
    height: {
      height: Theme.padding.p09
    },
    icon: {
      paddingRight: 2
    },
    invisible: {
      opacity: 0
    },
    label: {
      height: Theme.padding.p05,
      justifyContent: "flex-start",
      marginVertical: Theme.padding.p01,
      paddingHorizontal: 0
    },
    right: {
      alignSelf: "flex-end"
    },
    text: {
      color: textColor
    }
  });
