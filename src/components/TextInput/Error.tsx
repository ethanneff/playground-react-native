import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "..";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  error: {
    color: Theme.color.danger
  }
});

interface Props {
  error?: string;
  onPress(): void;
}

export class Error extends React.PureComponent<Props> {
  public icon = "alert-circle";
  public render() {
    const { error, onPress } = this.props;
    const message = error || " ";
    return (
      <TouchableOpacity activeOpacity={1} style={styles.row} onPress={onPress}>
        <Icon hidden={!error} name={this.icon} color={Theme.color.danger} />
        <Text title={message} style={styles.error} />
      </TouchableOpacity>
    );
  }
}
