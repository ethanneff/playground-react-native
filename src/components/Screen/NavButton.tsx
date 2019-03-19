import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "..";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: Theme.padding.p03
  },
  buttonRight: {
    alignSelf: "flex-end"
  }
});

interface Props {
  icon: string;
  isRight?: boolean;
  onPress?(): void;
}

export class NavButton extends React.PureComponent<Props> {
  public render() {
    const { onPress, icon, isRight } = this.props;
    if (!onPress) { return null; }
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon
          color={Theme.color.dark}
          style={isRight && styles.buttonRight}
          name={icon}
        />
      </TouchableOpacity>
    );
  }
}
