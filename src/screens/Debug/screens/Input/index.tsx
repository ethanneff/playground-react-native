import * as React from "react";
import { View } from "react-native";
import { RouteComponentProps } from "react-router";
import {
  Button,
  KeyboardType,
  Screen,
  TextInput
} from "../../../../components";
import { Theme } from "../../../../utils";

type Props = RouteComponentProps;

export class Input extends React.PureComponent<Props> {
  public state = {
    email: "",
    error: "",
    name: "",
    password: ""
  };
  public render() {
    const { email, password, name, error } = this.state;
    return (
      <Screen onLeftPress={this.navBack}>
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
            title="EMAIL"
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

  private updateState = (key: string) => (val: string) =>
    this.setState({ [key]: val });

  private navBack = () => () => this.props.history.goBack();
}
