/* tslint:disable */
// @ts-ignore

// TODO: https://telegram.com, https://anydo.com, https://lyft.com, http://www.shegy.nazwa.pl/materialupmarket/mdlp/index_light.html

import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, Button } from "../../components";
import { RouteComponentProps } from "react-router";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: window.height,
    alignItems: "center"
  },
  footer: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

interface Props {
  history: any;
}

class Footer extends React.PureComponent<Props> {
  render() {
    const { history } = this.props;
    return (
      <View style={styles.footer}>
        <Button title="Sign up" onPress={() => history.push("/login")} />
        <Button title="Log in" onPress={() => history.push("/login")} />
        <Button title="Debug" onPress={() => history.push("/debug")} />
      </View>
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
        <Text title={String(window.height)} />
        <Footer history={history} />
      </View>
    );
  }
}
