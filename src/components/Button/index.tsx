import * as React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from "react-native";
import { Icon, Text } from "..";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
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
    borderColor: "transparent", // TODO: add border to be same size as outlined
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
  label: {
    height: Theme.padding.p05,
    justifyContent: "flex-start",
    margin: Theme.padding.p01,
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
  text: {
    backgroundColor: "transparent",
    color: Theme.color.primary
  }
});

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
  // shape
  text?: boolean; // low emphasis
  outlined?: boolean; // mid emphasis
  contained?: boolean; // high emphasis
  fab?: boolean;
  toggle?: boolean;
  label?: boolean;
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
  onPress(): void;
}

export class Button extends React.PureComponent<Props> {
  public render() {
    const {
      title,
      onPress,
      disable,
      buttonStyle,
      textStyle,
      contained,
      outlined,
      wrap,
      fab,
      hidden,
      neutral,
      half,
      center,
      right,
      icon,
      iconColor,
      secondary,
      danger,
      label,
      lowercase,
      activeOpacity
    } = this.props;
    const buttonStyleGroup = [
      styles.container,
      !fab && styles.height,
      this.getShape(),
      disable && (contained || outlined) && styles.disableBody,
      fab && styles.fab,
      wrap && styles.nonFlex,
      half && styles.half,
      center && styles.center,
      right && styles.right,
      label && styles.label,
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
    if (hidden) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={buttonStyleGroup}
        onPress={onPress}
        disabled={disable}
      >
        <Icon
          color={iconColor}
          name={icon}
          size={Theme.padding.p04}
          style={iconStyleGroup}
        />
        <Text center button={!lowercase} title={title} style={textStyleGroup} />
      </TouchableOpacity>
    );
  }
  private getShape() {
    const { contained, outlined, fab, text } = this.props;
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
      return styles.text;
    }
    return styles.text;
  }
}
