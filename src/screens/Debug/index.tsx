import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Route, Screen, Switch } from "../../components";
import {
  Ball,
  Buttons,
  Cards,
  Checklists,
  Drag,
  Fonts,
  ImageCollection,
  Input,
  OKRs,
  PinchSpread,
  Questionnaire,
  SearchBar
} from "./screens";

type Props = RouteComponentProps;

export class Debug extends React.PureComponent<Props> {
  private screens: any = {
    Ball,
    Buttons,
    Cards,
    Checklists,
    Drag,
    Fonts,
    ImageCollection,
    Input,
    OKRs,
    PinchSpread,
    Questionnaire,
    SearchBar
  };

  public render() {
    return (
      <Switch>
        {this.generateRoutes()}
        <Route component={this.generateHome()} />
      </Switch>
    );
  }

  private generateRoutes = () => {
    const { match } = this.props;
    return Object.keys(this.screens).map((screen: string) => (
      <Route
        key={screen}
        path={`${match.path}/${screen.toLowerCase()}`}
        component={this.screens[screen]}
      />
    ));
  };

  private generateLinks = () => {
    const { match } = this.props;
    return Object.keys(this.screens).map((screen: string) => (
      <Link key={screen} to={`${match.path}/${screen}`} title={screen} />
    ));
  };

  private generateHome = () => {
    const { history } = this.props;
    return () => (
      <Screen onLeftPress={() => history.goBack()}>
        {this.generateLinks()}
      </Screen>
    );
  };
}
