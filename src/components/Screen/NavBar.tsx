import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Text";
import { NavButton } from "./NavButton";

interface Props {
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

export const NavBar: React.FC<Props> = props => {
  const {
    title,
    onLeftPress,
    onRightPress,
    leftIcon = "arrow-left",
    rightIcon = "close"
  } = props;
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    title: {
      flex: 2,
      textAlign: "center"
    }
  });
  return (
    <View style={styles.container}>
      <NavButton icon={leftIcon} onPress={onLeftPress} />
      <Text style={styles.title} title={title} h2 />
      <NavButton icon={rightIcon} isRight onPress={onRightPress} />
    </View>
  );
};
