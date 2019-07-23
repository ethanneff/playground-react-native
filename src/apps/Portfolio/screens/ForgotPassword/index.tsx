import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text, TextInput } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

interface State {
  email: string;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props, State> {
  public state = {
    email: ""
  };
  private styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });

  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.PortfolioLogin)}>
        <Text h1 title="Forgot Password" center />
        <TextInput
          title="email"
          placeholder="example@gmail.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <View style={this.styles.row}>
          <Button
            title="Send email"
            onPress={this.nav(NavigationScreen.PortfolioLogin)}
          />
        </View>
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export const ForgotPassword = connect(
  null,
  mapDispatchToProps
)(Container);
