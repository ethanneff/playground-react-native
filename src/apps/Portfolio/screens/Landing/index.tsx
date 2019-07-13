import * as React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text } from "../../../../components";
import { navigate, NavigationScreen, showModal } from "../../../../models";
import { Walkthrough } from "./Walkthrough";

interface DispatchProps {
  navigate: typeof navigate;
  showModal: typeof showModal;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });
  public render() {
    return (
      <Screen>
        <Text h1 title="Landing" center />
        <Walkthrough />
        <View style={this.styles.row}>
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
        <View style={this.styles.row}>
          <Button
            title="Checklist"
            onPress={this.nav(NavigationScreen.ChecklistsLists)}
          />
          <Button
            title="CantHurtMe"
            onPress={this.nav(NavigationScreen.CantHurtMeHome)}
          />
        </View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate, showModal };

export const Landing = connect(
  null,
  mapDispatchToProps
)(Container);
