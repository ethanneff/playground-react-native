import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Screen, Text } from "../../../../components";
import { Walkthrough } from "./Walkthrough";
import { connect } from "react-redux";
import { showModal, navigate, NavigationScreen } from "../../../../models";

interface DispatchProps {
  navigate: typeof navigate;
  showModal: typeof showModal;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
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
}

const mapDispatchToProps: DispatchProps = { navigate, showModal };

export const Landing = connect(
  null,
  mapDispatchToProps
)(Container);
