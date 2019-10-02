import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../utils";
import { Icon } from "../Icon";
import { useColor } from "../../hooks";

interface Props {
  icon: string;
  isRight?: boolean;
  onPress?(): void;
}

export const NavButton: React.FC<Props> = memo(function NavButton({
  onPress,
  icon,
  isRight
}) {
  const color = useColor();
  const styles = StyleSheet.create({
    button: {
      flex: 0.2,
      padding: Theme.padding.p03
    },
    buttonRight: {
      alignSelf: "flex-end"
    }
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        hidden={!onPress}
        color={color.dark}
        style={isRight && styles.buttonRight}
        name={icon}
      />
    </TouchableOpacity>
  );
});
