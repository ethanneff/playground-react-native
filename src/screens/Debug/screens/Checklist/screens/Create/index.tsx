import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Screen, Text } from "../../../../../../components";
import { RootState } from "../../../../../../models";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <Text title="Create" />
      </Screen>
    );
  }
}

export const Create = connect(
  (state: RootState) => ({
    state
  }),
  {}
)(Component);
