import * as React from "react";
import { Screen, Text, Button } from "../../../../components";
import { connect } from "react-redux";
import { navigate, NavigationScreen } from "../../../../models";

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

class Container extends React.PureComponent<Props> {
  public render() {
    return (
      <Screen>
        <Text h1 center title="404 :(" />
        <Button
          title="go home"
          onPress={() => this.props.navigate(NavigationScreen.PortfolioLanding)}
        />
      </Screen>
    );
  }
}

const mapDispatchToProps: DispatchProps = {
  navigate
};

export const NotFound = connect(
  null,
  mapDispatchToProps
)(Container);
