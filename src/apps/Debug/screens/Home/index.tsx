import * as React from "react";
import { connect } from "react-redux";
import { navigate, NavigationScreen } from "../../../../models";
import { Button, Screen } from "../../../../components";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  private screens = [
    NavigationScreen.DebugBall,
    NavigationScreen.DebugButtons,
    NavigationScreen.DebugCards,
    NavigationScreen.DebugChat,
    NavigationScreen.DebugDrag,
    NavigationScreen.DebugFonts,
    NavigationScreen.DebugImageCollection,
    NavigationScreen.DebugInput,
    NavigationScreen.DebugOKRs,
    NavigationScreen.DebugPinchSpread,
    NavigationScreen.DebugQuestionnaire,
    NavigationScreen.DebugSearchBar,
    NavigationScreen.DebugStopwatch
  ];

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.PortfolioLanding)}>
        {this.screens.map((screen: NavigationScreen) => (
          <Button title={screen} key={screen} onPress={this.nav(screen)} />
        ))}
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Home = connect(
  null,
  mapDispatchToProps
)(Container);
