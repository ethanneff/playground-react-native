import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text, TextInput } from "../../components";
import fakeAuth from "../../models/User";

interface State {
  email: string;
  password: string;
}

export class Login extends React.PureComponent<RouteComponentProps, State> {
  public state = {
    email: "",
    password: ""
  };

  public render() {
    const { location, history } = this.props;
    const { from } = location.state || { from: { pathname: "/app" } };
    return (
      <Screen>
        <Text title="Login" />
        <TextInput
          placeholder="email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          placeholder="password"
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title="Continue with Google" onPress={() => undefined} />
        <Button title="Continue with Facebook" onPress={() => ""} />
        <Button
          title="Signup"
          onPress={() => fakeAuth.authenticate(() => history.push(from))}
        />
        <Button title="Forgot" onPress={() => history.push("/nowhere")} />
        <Button title="Landing" onPress={() => history.push("/")} />
        <Button title="App" onPress={() => history.push("/app")} />
      </Screen>
    );
  }
}
