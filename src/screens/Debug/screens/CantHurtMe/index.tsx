import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "../../../../components";
import { Home, Profile, Settings } from "./screens";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={Home} />
        <Route path={`${match.path}/profile`} component={Profile} />
        <Route path={`${match.path}/settings`} component={Settings} />
      </Switch>
    );
  }
}

export const CantHurtMe = connect()(Component);
