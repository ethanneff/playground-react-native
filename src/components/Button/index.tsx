import * as React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { Theme } from "../../utils";
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

export class Button extends React.PureComponent<Props> {
  public styles = StyleSheet.create({
    center: {
      alignSelf: "center"
    },
    containedBody: {
      backgroundColor: Theme.color.primary
    },
    containedText: {
      color: Theme.color.background
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
      color: Theme.color.danger
    },
    disableBody: {
      backgroundColor: Theme.color.light
    },
    disableText: {
      color: Theme.color.secondary
    },
    dropShadow: {
      elevation: 1,
      margin: Theme.padding.p02,
      padding: Theme.padding.p04,
      shadowColor: Theme.color.dark,
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
      color: Theme.color.text
    },
    nonFlex: {
      alignSelf: "flex-start"
    },
    outlined: {
      borderColor: Theme.color.secondary
    },
    right: {
      alignSelf: "flex-end"
    },
    secondary: {
      color: Theme.color.secondary
    },
    textBody: {
      backgroundColor: "transparent"
    },
    text: {
      color: Theme.color.primary
    }
  });

  public render() {
    const {
      activeOpacity,
      buttonStyle,
      center,
      contained,
      danger,
      disable,
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
      textStyle,
      title,
      wrap,
      dropShadow
    } = this.props;
    const buttonStyleGroup = [
      this.styles.container,
      !fab && this.styles.height,
      this.getBody(),
      disable && (contained || outlined) && this.styles.disableBody,
      fab && this.styles.fab,
      wrap && this.styles.nonFlex,
      half && this.styles.half,
      center && this.styles.center,
      right && this.styles.right,
      label && this.styles.label,
      dropShadow && this.styles.dropShadow,
      buttonStyle
    ];
    const textStyleGroup = [
      this.styles.text,
      neutral && this.styles.neutral,
      secondary && this.styles.secondary,
      danger && this.styles.danger,
      contained && this.styles.containedText,
      disable && this.styles.disableText,
      textStyle
    ];
    const iconStyleGroup = [
      title && this.styles.icon,
      !iconColor && textStyleGroup
    ];
    if (hidden) {
      return null;
    }
    return (
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
  }

  private getBody() {
    const { contained, outlined, fab, text } = this.props;
    if (contained) {
      return this.styles.containedBody;
    }
    if (outlined) {
      return this.styles.outlined;
    }
    if (fab) {
      return this.styles.fab;
    }
    if (text) {
      return this.styles.textBody;
    }
    return this.styles.textBody;
  }
}
