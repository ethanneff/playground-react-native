/* tslint:disable */
// @ts-ignore

// TODO: https://telegram.com, https://anydo.com, https://lyft.com, http://www.shegy.nazwa.pl/materialupmarket/mdlp/index_light.html

import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, Button, Screen } from "../../components";
import { RouteComponentProps } from "react-router";
import { Theme } from "../../utils";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    alignItems: "center"
  }
});

interface Props {
  history: any;
}

class Footer extends React.PureComponent<Props> {
  render() {
    const { history } = this.props;
    return (
      <Screen
        style={{ backgroundColor: Theme.color.primary, flexDirection: "row" }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button title="Sign up" onPress={() => history.push("/login")} />
          <Button title="Log in" onPress={() => history.push("/login")} />
          <Button title="Debug" onPress={() => history.push("/debug")} />
        </View>
      </Screen>
    );
  }
}

class Header extends React.PureComponent {
  render() {
    return <View />;
  }
}

export class Landing extends React.PureComponent<RouteComponentProps> {
  public render() {
    const { history } = this.props;
    return (
      <View style={styles.container}>
        <Header />
        <Text title="To get started, edit ./src/containers/App/index.tsx" />
        <Text title={String(window.height)} />
        <Footer history={history} />
      </View>
    );
  }
}
