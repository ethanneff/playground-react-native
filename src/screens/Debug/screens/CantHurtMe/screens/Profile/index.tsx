import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Screen, Text } from "../../../../../../components";
import { RootState } from "../../../../../../containers";
import { Theme } from "../../../../../../utils";

interface StateProps {
  state: RootState;
}

type Props = StateProps & RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    return (
      <Screen
        onLeftPress={this.navBack}
        title="Profile"
        style={{
          backgroundColor: Theme.color.light,
          padding: Theme.padding.p02
        }}
      >
        <Text title="example content" center h1 />
      </Screen>
    );
  }
  private navBack = () => this.props.history.goBack();
}

const mapStateToProps = (state: RootState): StateProps => ({ state });

export const Profile = connect(mapStateToProps)(Component);
