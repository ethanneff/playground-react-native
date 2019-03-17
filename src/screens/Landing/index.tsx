import * as React from "react";
import { StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router";
import { Button, Screen } from "../../components";
import { Theme } from "../../utils";
import { Walkthrough } from "./Walkthrough";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: Theme.padding.p12,
    justifyContent: "space-around"
  }
});

type Props = RouteComponentProps;

export class Landing extends React.PureComponent<Props> {
  public componentDidMount() {
    const { history } = this.props;
    history.push("/debug");
  }
  public render() {
    const { history } = this.props;
    return (
      <Screen>
        <Walkthrough />
        <View style={styles.buttonContainer}>
          <Button title="Sign up" onPress={() => history.push("/login")} />
          <Button title="Log in" onPress={() => history.push("/login")} />
          <Button title="Debug" onPress={() => history.push("/debug")} />
        </View>
      </Screen>
    );
  }
}
