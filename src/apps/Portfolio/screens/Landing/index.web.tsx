/* tslint:disable */
// @ts-ignore

// TODO: https://telegram.com, https://anydo.com, https://lyft.com, http://www.shegy.nazwa.pl/materialupmarket/mdlp/index_light.html

import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, Button } from "../../../../components";
import { NavigationScreen, navigate } from "../../../../models";
import { connect } from "react-redux";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private readonly window = Dimensions.get("window");

  private readonly styles = StyleSheet.create({
    container: {
      flex: 1,
      height: this.window.height,
      alignItems: "center"
    },
    footer: {
      alignItems: "flex-end",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center"
    }
  });
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <View style={this.styles.container}>
        <Text title={String(this.window.height)} />
        <View style={this.styles.footer}>
          <Button
            title="Login"
            onPress={this.nav(NavigationScreen.PortfolioLogin)}
          />
          <Button
            title="Main"
            onPress={this.nav(NavigationScreen.PortfolioMain)}
          />
          <Button title="Debug" onPress={this.nav(NavigationScreen.Debug)} />
          <Button
            title="Settings"
            onPress={this.nav(NavigationScreen.PortfolioSettings)}
          />
        </View>
      </View>
    );
  }
}

export const Landing = connect(
  null,
  { navigate }
)(Container);
