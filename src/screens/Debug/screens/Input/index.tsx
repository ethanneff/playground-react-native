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
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <View
          style={{ flex: 1, backgroundColor: Theme.color.light, padding: 20 }}
        >
          <TextInput
            title="Name"
            placeholder="jane doe"
            optional
            value={name}
            onChangeText={val => this.setState({ name: val })}
            error={error}
          />
          <TextInput
            title="EMAIL"
            value={email}
            onChangeText={val => this.setState({ email: val })}
            keyboardType={KeyboardType.Email}
            placeholder="example@gmail.com"
            error={error}
          />
          <TextInput
            value={password}
            onChangeText={val => this.setState({ password: val })}
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
}
