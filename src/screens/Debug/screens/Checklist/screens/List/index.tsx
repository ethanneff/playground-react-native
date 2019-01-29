import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, Screen, Text } from "../../../../../../components";
import { RootState } from "../../../../../../models";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { history, match } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <Text title="checklists" />
        <Link to={`${match.path}/item`} title={"item"} />
      </Screen>
    );
  }
}

export const List = connect(
  (state: RootState) => ({
    state
  }),
  {}
)(Component);
