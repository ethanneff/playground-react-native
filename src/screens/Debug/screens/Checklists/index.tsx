// @ts-ignore-file
/* tslint:disable */

import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "../../../../components";
import { List, ListCreate, Lists } from "./screens";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={Lists} />
        <Route path={`${match.path}/create`} component={ListCreate} />
        <Route path={`${match.path}/:id`} component={List} />
      </Switch>
    );
  }
}

export const Checklists = connect(
  null,
  null
)(Component);
