import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../utils";
import { Icon } from "../Icon";

interface Props {
  icon: string;
  isRight?: boolean;
  onPress?(): void;
}

export const NavButton: React.FC<Props> = props => {
  const { onPress, icon, isRight } = props;
  const styles = StyleSheet.create({
    button: {
      flex: 1,
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
        color={Theme.color.dark}
        style={isRight && styles.buttonRight}
        name={icon}
      />
    </TouchableOpacity>
  );
};
