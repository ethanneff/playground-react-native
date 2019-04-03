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
    this.props.history.push("/debug/chat");
  }

  public render() {
    return (
      <Screen>
        <Walkthrough />
        <View style={styles.buttonContainer}>
          <Button title="Sign up" onPress={this.nav("/login")} />
          <Button title="Log in" onPress={this.nav("/login")} />
          <Button title="Debug" onPress={this.nav("/debug")} />
        </View>
      </Screen>
    );
  }

  private nav = (path: string) => () => this.props.history.push(path);
}
