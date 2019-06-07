import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../../components";
import { NavigationScreen, navigate } from "../../../../models";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.Debug)}>
        <View style={styles.container} />
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Template = connect(
  null,
  mapDispatchToProps
)(Container);
