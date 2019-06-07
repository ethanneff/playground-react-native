import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../../../utils";

interface Props {
  flex?: boolean;
  key?: string;
  onPress?(): void;
}

export class Card extends React.PureComponent<Props> {
  public readonly styles = StyleSheet.create({
    card: {
      backgroundColor: Theme.color.background,
      elevation: 1,
      margin: Theme.padding.p02,
      padding: Theme.padding.p04,
      shadowColor: Theme.color.dark,
      shadowOffset: {
        height: Theme.padding.p01,
        width: 0
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      zIndex: 1
    },
    flex: {
      flex: 1
    }
  });

  public render() {
    const { flex, children, onPress, key } = this.props;
    return (
      <TouchableOpacity
        key={key}
        style={[this.styles.card, flex ? this.styles.flex : undefined]}
        onPress={onPress}
        disabled={!onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
