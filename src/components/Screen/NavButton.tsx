import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../utils";
import { Icon } from "../Icon";

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
  }
}
