// usage: <Icon name='check' />
// source: https://materialdesignicons.com/

import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { Badge } from "./Badge";
import { IconSource } from "./IconSource";

interface Props {
  badge?: number;
  style?: ViewStyle | {};
  clear?: boolean;
  hidden?: boolean;
  invisible?: boolean;
  size?: number;
  color?: string;
  name?: string;
}

export class Icon extends React.PureComponent<Props> {
  private styles = StyleSheet.create({
    invisible: {
      opacity: 0
    }
  });

  public render() {
    const {
      name,
      style,
      badge = 0,
      clear,
      size = Theme.padding.p06,
      color = Theme.color.dark,
      hidden,
      invisible
    } = this.props;
    const colored = clear ? Theme.color.background : color;
    const styles = [invisible && this.styles.invisible, style];
    if (name === undefined || name.length === 0 || hidden) {
      return null;
    }
    return (
      <View style={styles}>
        <IconSource name={name} size={size} color={colored} style={styles} />
        <Badge badge={badge} />
      </View>
    );
  }
}
