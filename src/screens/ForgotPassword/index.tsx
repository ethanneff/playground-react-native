import * as React from "react";
import { Button, Screen, Text, TextInput } from "../../components";
import { connect } from "react-redux";
import { navigate, NavigationScreen } from "../../models";
import { View, StyleSheet } from "react-native";

interface State {
  email: string;
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
    email: ""
  };

  private navigate = (to: NavigationScreen) => () => this.props.navigate(to);

  public render() {
    return (
      <Screen>
        <Text h1 title="Forgot Password" />
        <TextInput
          title="email"
          placeholder="example@gmail.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <View style={this.styles.row}>
          <Button
            title="Send email"
            onPress={this.navigate(NavigationScreen.Login)}
          />
          <Button
            title="Go back"
            onPress={this.navigate(NavigationScreen.Login)}
          />
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = { navigate };

export const ForgotPassword = connect(
  null,
  mapDispatchToProps
)(Container);
