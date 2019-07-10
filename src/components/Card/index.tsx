import * as React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Theme } from "../../utils";

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Theme.color.background,
    elevation: 1,
    marginHorizontal: Theme.padding.p04,
    marginVertical: Theme.padding.p02,
    padding: Theme.padding.p04,
    position: "relative",
    shadowColor: Theme.color.dark,
    shadowOffset: {
      height: 4,
      width: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    zIndex: 1
  },
  selected: {
    backgroundColor: Theme.color.primary
  }
});

interface Props {
  style?: ViewStyle;
  selected?: boolean;
  onPress?(): void;
  onLongPress?(): void;
}

export class Card extends React.PureComponent<Props> {
  private touchOpacity = 0.3;
  public render() {
    const { style, children, onPress, selected, onLongPress } = this.props;
    const containerStyles = [
      styles.containerStyle,
      selected ? styles.selected : undefined,
      style
    ];
    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={onPress && onPress}
        onLongPress={onLongPress && onLongPress}
        activeOpacity={onPress ? this.touchOpacity : 1}
      >
        {children}
      </TouchableOpacity>
    );
  }
}
