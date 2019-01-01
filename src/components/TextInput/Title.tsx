import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "..";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  title: {
    textTransform: "capitalize"
  },
  optional: {
    color: Theme.color.secondary
  },
  container: {
    flexDirection: "row"
  }
});

interface Props {
  title?: string;
  optional?: boolean;
  onPress(): void;
}

export class Title extends React.PureComponent<Props> {
  public optionalText = " - Optional";
  public render() {
    const { title, optional, onPress } = this.props;
    const stylesOptional = [styles.title, styles.optional];
    if (title === undefined || title.length === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onPress}
      >
        <Text title={title} style={styles.title} />
        <Text
          hidden={!optional}
          title={this.optionalText}
          style={stylesOptional}
        />
      </TouchableOpacity>
    );
  }
}
