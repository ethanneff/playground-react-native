// usage: <Icon name='check' />
// source: https://materialdesignicons.com/

import * as React from "react";
import { View, ViewStyle } from "react-native";
import { Theme } from "../../utils";
import { Badge } from "./Badge";
import { IconSource } from "./IconSource";

interface Props {
  badge?: number;
  style?: ViewStyle | {};
  clear?: boolean;
  hidden?: boolean;
  size?: number;
  color?: string;
  name?: string;
}

export class Icon extends React.PureComponent<Props> {
  public render() {
    const {
      name,
      style,
      badge = 0,
      clear,
      size = Theme.padding.p6,
      color = Theme.color.dark,
      hidden
    } = this.props;
    const colored = clear ? Theme.color.background : color;
    if (name === undefined || name.length === 0 || hidden) {
      return null;
    }
    return (
      <View style={style}>
        <IconSource name={name} size={size} color={colored} style={style} />
        <Badge badge={badge} />
      </View>
    );
  }
}
