import * as React from "react";
import { StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router";
import { Screen } from "../../../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

type Props = RouteComponentProps;

export class Template extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <View style={styles.container} />
      </Screen>
    );
  }
}
