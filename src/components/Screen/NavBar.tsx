import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { Theme } from "../../utils";
import { NavButton } from "./NavButton";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.color.background,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    flex: 1,
    fontSize: Theme.padding.p05,
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
      title = "",
      onLeftPress,
      onRightPress,
      leftIcon = "arrow-left",
      rightIcon = "close"
    } = this.props;
    const isEnabled = title.length > 0 || onLeftPress || onRightPress;
    if (!isEnabled) { return null; }
    return (
      <View style={styles.container}>
        <NavButton icon={leftIcon} onPress={onLeftPress} />
        <Text hidden={title.length === 0} style={styles.title} title={title} />
        <NavButton icon={rightIcon} isRight onPress={onRightPress} />
      </View>
    );
  }
}
