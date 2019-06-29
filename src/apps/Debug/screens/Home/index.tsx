import * as React from "react";
import { connect } from "react-redux";
import { Button, Screen } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";

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
    NavigationScreen.DebugStopwatch,
    NavigationScreen.DebugSwipeCell
  ];
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.PortfolioLanding)}>
        {this.screens.map((screen: NavigationScreen) => (
          <Button title={screen} key={screen} onPress={this.nav(screen)} />
        ))}
      </Screen>
    );
  }

  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapDispatchToProps: DispatchProps = { navigate };

export const Home = connect(
  null,
  mapDispatchToProps
)(Container);
