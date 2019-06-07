import * as React from "react";
import { StyleSheet } from "react-native";
import { Text } from "../../../../components";
import { Theme } from "../../../../utils";

interface Props {
  title: string;
}

export class Header extends React.PureComponent<Props> {
  private readonly styles = StyleSheet.create({
    header: {
      padding: Theme.padding.p04
    }
  });

  public render() {
    const { title } = this.props;
    return <Text title={title} h3 style={this.styles.header} center />;
  }
}
