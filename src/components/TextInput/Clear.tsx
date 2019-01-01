import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "..";

const styles = StyleSheet.create({
  clear: {
    position: "absolute",
    right: -6,
    top: 6
  }
});

interface Props {
  hidden: boolean;
  onPress(): void;
}

export class Clear extends React.PureComponent<Props> {
  public icon = "close-circle";
  public render() {
    const { hidden, onPress } = this.props;
    return (
      <Button
        secondary
        hidden={hidden}
        icon={this.icon}
        buttonStyle={styles.clear}
        onPress={onPress}
      />
    );
  }
}
