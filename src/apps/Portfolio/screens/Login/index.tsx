import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text, TextInput } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

interface State {
  email: string;
  password: string;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props, State> {
  public state = {
    email: "",
    password: ""
  };
  private styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });

  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.PortfolioLanding)}>
        <Text title="Login" h1 center />
        <TextInput
          title="email"
          placeholder="example@gmail.com"
          onChangeText={(email: string) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          title="password"
          placeholder="•••••••"
          onChangeText={(password: string) => this.setState({ password })}
          value={this.state.password}
        />
        <View style={this.styles.row}>
          <Button
            title="Login"
            onPress={this.nav(NavigationScreen.Portfolio)}
          />
          <Button
            title="Forgot"
            onPress={this.nav(NavigationScreen.PortfolioForgotPassword)}
          />
        </View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Login = connect(
  null,
  mapDispatchToProps
)(Container);
