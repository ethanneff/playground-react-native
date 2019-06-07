import * as React from "react";
import { connect } from "react-redux";
import { Button, Screen, Text } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Component extends React.PureComponent<Props> {
  public render() {
    return (
      <Screen>
        <Text h1 center title="Main" />
        <Button
          title="logout"
          onPress={this.nav(NavigationScreen.PortfolioLanding)}
        />
      </Screen>
    );
  }
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Main = connect(
  null,
  mapDispatchToProps
)(Component);
