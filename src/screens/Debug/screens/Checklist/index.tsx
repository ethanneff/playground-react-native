import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "../../../../components";
import { Create, Item, List } from "./screens";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={List} />
        <Route path={`${match.path}/create`} component={Create} />
        <Route path={`${match.path}/item`} component={Item} />
      </Switch>
    );
  }
}

export const Checklist = connect(
  null,
  null
)(Component);
