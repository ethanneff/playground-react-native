import * as React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { getCurrentColor } from "../../models";
import { Theme, useRootSelector } from "../../utils";
import { Icon } from "../Icon";
import { Text } from "../Text";

// styling: https://material.io/design/components/buttons.html#usage
interface Props {
  // content
  title?: string;
  icon?: string;
  // styling
  buttonStyle?: ViewStyle | {};
  textStyle?: TextStyle | {};
  iconColor?: string;
  // state
  active?: boolean;
  hidden?: boolean;
  disable?: boolean;
  activeOpacity?: number;
  invisible?: boolean;
  // shape
  text?: boolean; // low emphasis
  outlined?: boolean; // mid emphasis
  contained?: boolean; // high emphasis
  fab?: boolean;
  toggle?: boolean;
  label?: boolean;
  dropShadow?: boolean;
  // color
  neutral?: boolean;
  secondary?: boolean;
  danger?: boolean;
  // size
  wrap?: boolean;
  half?: boolean;
  full?: boolean;
  center?: boolean;
  right?: boolean;
  lowercase?: boolean;
  // event
  onPress?(): void;
}

export const Button: React.FC<Props> = props => {
  const {
    activeOpacity,
    buttonStyle,
    center,
    contained,
    danger,
    disable,
    dropShadow,
    fab,
    half,
    hidden,
    icon,
    iconColor,
    invisible,
    label,
    lowercase,
    neutral,
    onPress,
    outlined,
    right,
    secondary,
    text,
    textStyle,
    title,
    wrap
  } = props;

  const color = useRootSelector(state => getCurrentColor(state));
  const styles = StyleSheet.create({
    center: {
      alignSelf: "center"
    },
    containedBody: {
      backgroundColor: color.primary
    },
    containedText: {
      color: color.background
    },
    container: {
      alignItems: "center",
      borderColor: "transparent",
      // TODO: add border to be same size as outlined
      borderRadius: Theme.padding.p01,
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: Theme.padding.p04
    },
    danger: {
      color: color.danger
    },
    disableBody: {
      backgroundColor: color.light
    },
    disableText: {
      color: color.secondary
    },
    dropShadow: {
      elevation: 1,
      margin: Theme.padding.p02,
      padding: Theme.padding.p04,
      shadowColor: color.dark,
      shadowOffset: {
        height: Theme.padding.p01,
        width: 0
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      zIndex: 1
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
    neutral: {
      color: color.text
    },
    nonFlex: {
      alignSelf: "flex-start"
    },
    outlined: {
      borderColor: color.secondary
    },
    right: {
      alignSelf: "flex-end"
    },
    secondary: {
      color: color.secondary
    },
    text: {
      color: color.primary
    },
    textBody: {
      backgroundColor: "transparent"
    }
  });

  const getBody = () => {
    if (contained) {
      return styles.containedBody;
    }
    if (outlined) {
      return styles.outlined;
    }
    if (fab) {
      return styles.fab;
    }
    if (text) {
      return styles.textBody;
    }
    return styles.textBody;
  };

  const buttonStyleGroup = [
    styles.container,
    !fab && styles.height,
    getBody(),
    disable && (contained || outlined) && styles.disableBody,
    fab && styles.fab,
    wrap && styles.nonFlex,
    half && styles.half,
    center && styles.center,
    right && styles.right,
    label && styles.label,
    dropShadow && styles.dropShadow,
    buttonStyle
  ];
  const textStyleGroup = [
    styles.text,
    neutral && styles.neutral,
    secondary && styles.secondary,
    danger && styles.danger,
    contained && styles.containedText,
    disable && styles.disableText,
    textStyle
  ];
  const iconStyleGroup = [title && styles.icon, !iconColor && textStyleGroup];

  return hidden ? null : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disable}
      onPress={onPress}
      style={buttonStyleGroup}
    >
      <Icon
        color={iconColor}
        invisible={invisible}
        name={icon}
        size={Theme.padding.p04}
        style={iconStyleGroup}
      />
      <Text center button={!lowercase} title={title} style={textStyleGroup} />
    </TouchableOpacity>
  );
};
