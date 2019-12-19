import React, { memo } from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { Theme, colorWithOpacity } from "../../utils";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { useColor, useDropShadow } from "../../hooks";
import { getButtonColor, getStyles } from "./utils";

/*
styling: https://material.io/design/components/buttons.html#usage
*/
export interface ButtonProps {
  /* content */
  title?: string;
  icon?: string;
  /* styling */
  buttonStyle?: ViewStyle | {};
  textStyle?: TextStyle | {};
  iconColor?: string;
  iconSize?: number;
  /* state */
  active?: boolean;
  hidden?: boolean;
  disable?: boolean;
  activeOpacity?: number;
  invisible?: boolean;
  elevation?: number;
  /* shape */
  text?: boolean /* low emphasis */;
  outlined?: boolean /* mid emphasis */;
  contained?: boolean /* high emphasis */;
  fab?: boolean;
  toggle?: boolean;
  label?: boolean;
  dropShadow?: boolean;
  /* color */
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  light?: boolean;
  dark?: boolean;
  /* size */
  wrap?: boolean;
  half?: boolean;
  full?: boolean;
  center?: boolean;
  right?: boolean;
  lowercase?: boolean;
  /* event */
  onPress?(): void;
  onLongPress?(): void;
}

export const Button: React.FC<ButtonProps> = memo(props => {
  const {
    activeOpacity,
    buttonStyle,
    center,
    contained,
    disable,
    dropShadow,
    elevation = 2,
    fab,
    half,
    hidden,
    icon,
    iconColor,
    invisible,
    label,
    lowercase,
    light,
    onPress,
    iconSize = Theme.padding.p04,
    onLongPress,
    right,
    textStyle,
    title,
    outlined,
    text
  } = props;
  const color = useColor();
  const dropShadowStyling = useDropShadow(elevation);
  const buttonColor = getButtonColor(color, props);
  const buttonColorWithOpacity = disable
    ? colorWithOpacity(buttonColor, 0.38)
    : buttonColor;
  const textColor =
    contained && !light ? color.background : light ? color.text : buttonColor;
  const textColorWithOpacity = disable
    ? colorWithOpacity(textColor, 0.38)
    : textColor;
  const styles = getStyles(
    color,
    buttonColorWithOpacity,
    textColorWithOpacity,
    outlined
  );
  const body = contained ? styles.containedBody : fab ? styles.fab : text;
  const buttonStyleGroup = [
    styles.container,
    body,
    !fab && styles.height,
    fab && styles.fab,
    half && styles.half,
    center && styles.center,
    right && styles.right,
    label && styles.label,
    dropShadow && dropShadowStyling,
    buttonStyle
  ];
  const textStyleGroup = [styles.text, textStyle];
  const iconStyleGroup = [title && styles.icon, !iconColor && textStyleGroup];

  return hidden ? null : 
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disable}
      onPress={onPress}
      style={buttonStyleGroup}
      onLongPress={onLongPress}
    >
      <Icon
        color={iconColor}
        invisible={invisible}
        name={icon}
        size={iconSize}
        style={iconStyleGroup}
      />
      <Text center button={!lowercase} title={title} style={textStyleGroup} />
    </TouchableOpacity>
  ;
});
