import * as React from "react";
import { Button, Screen, Text, TextInput } from "../../../../components";
import { connect } from "react-redux";
import { navigate, NavigationScreen } from "../../../../models";
import { View, StyleSheet } from "react-native";

interface State {
  email: string;
  password: string;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props, State> {
  private styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });
  public state = {
    email: "",
    password: ""
  };

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

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
            onPress={this.nav(NavigationScreen.PortfolioMain)}
          />
          <Button
            title="Forgot"
            onPress={this.nav(NavigationScreen.PortfolioForgotPassword)}
          />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Login = connect(
  null,
  mapDispatchToProps
)(Container);
