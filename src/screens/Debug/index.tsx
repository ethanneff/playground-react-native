import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link, Route, Screen, Switch } from "../../components";
import {
  Ball,
  Buttons,
  Cards,
  Chat,
  Checklists,
  Drag,
  Fonts,
  ImageCollection,
  Input,
  OKRs,
  PinchSpread,
  Questionnaire,
  SearchBar,
  Stopwatch
} from "./screens";

type Props = RouteComponentProps;

export class Debug extends React.PureComponent<Props> {
  private screens: any = {
    Ball,
    Buttons,
    Cards,
    Chat,
    Checklists,
    Drag,
    Fonts,
    ImageCollection,
    Input,
    OKRs,
    PinchSpread,
    Questionnaire,
    SearchBar,
    Stopwatch
  };

  public render() {
    return (
      <Switch>
        {this.generateRoutes()}
        <Route component={this.showHomeScreen} />
      </Switch>
    );
  }

  private generateRoutes = () =>
    Object.keys(this.screens).map((screen: string) => (
      <Route
        key={screen}
        path={`${this.props.match.path}/${screen.toLowerCase()}`}
        component={this.screens[screen]}
      />
    ));

  private navBack = () => this.props.history.goBack();

  private showHomeScreen = () => (
    <Screen onLeftPress={this.navBack}>
      {Object.keys(this.screens).map((screen: string) => (
        <Link
          key={screen}
          to={`${this.props.match.path}/${screen}`}
          title={screen}
        />
      ))}
    </Screen>
  );
}
