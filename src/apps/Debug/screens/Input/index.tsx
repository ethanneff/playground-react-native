import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  Button,
  KeyboardType,
  Screen,
  TextInput
} from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";
import { Theme } from "../../../../utils";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  public state = {
    email: "",
    error: "",
    name: "",
    password: ""
  };

  private styles = StyleSheet.create({
    container: {
      backgroundColor: Theme.color.light,
      flex: 1,
      padding: Theme.padding.p04
    }
  });
  public render() {
    const { email, password, name, error } = this.state;
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.Debug)}>
        <View style={this.styles.container}>
          <TextInput
            title="Name"
            placeholder="jane doe"
            optional
            value={name}
            onChangeText={this.updateState("name")}
            error={error}
          />
          <TextInput
            title="Email"
            value={email}
            onChangeText={this.updateState("email")}
            keyboardType={KeyboardType.Email}
            placeholder="example@gmail.com"
            error={error}
          />
          <TextInput
            value={password}
            onChangeText={this.updateState("password")}
            title="Password"
            placeholder="•••••••"
            secureTextEntry
          />
          <Button
            contained
            title="complete form"
            onPress={() => this.setState({ error: "Invalid Email" })}
          />
        </View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  private updateState = (key: string) => (val: string) =>
    this.setState({ [key]: val });
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Input = connect(
  null,
  mapDispatchToProps
)(Container);
