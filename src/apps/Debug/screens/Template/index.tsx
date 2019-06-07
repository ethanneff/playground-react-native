import * as React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Screen } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

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
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.Debug)}>
        <View style={styles.container} />
      </Screen>
    );
  }
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Template = connect(
  null,
  mapDispatchToProps
)(Container);
