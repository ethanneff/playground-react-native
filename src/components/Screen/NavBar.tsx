import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { Theme } from "../../utils";
import { NavButton } from "./NavButton";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.color.background,
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    flex: 1,
    fontSize: Theme.padding.p5,
    textAlign: "center"
  }
});

interface Props {
  title?: string;
  leftIcon: string;
  rightIcon: string;
  onLeftPress?(): void;
  onRightPress?(): void;
}

export class NavBar extends React.PureComponent<Props> {
  public render() {
    const {
      title,
      onLeftPress: left,
      onRightPress: right,
      leftIcon,
      rightIcon
    } = this.props;
    const isEnabled = !!title || !!left || !!right;
    return (
      isEnabled && (
        <View style={styles.container}>
          {left && <NavButton icon={leftIcon} onPress={left} />}
          {title && <Text style={styles.title} title={title} />}
          {right && <NavButton icon={rightIcon} isRight onPress={right} />}
        </View>
      )
    );
  }
}
