import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Text";
import { NavButton } from "./NavButton";

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

interface Props {
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

export class NavBar extends React.PureComponent<Props> {
  public render() {
    const {
      title,
      onLeftPress,
      onRightPress,
      leftIcon = "arrow-left",
      rightIcon = "close"
    } = this.props;
    return (
      <View style={styles.container}>
        <NavButton icon={leftIcon} onPress={onLeftPress} />
        <Text style={styles.title} title={title} h2 />
        <NavButton icon={rightIcon} isRight onPress={onRightPress} />
      </View>
    );
  }
}
