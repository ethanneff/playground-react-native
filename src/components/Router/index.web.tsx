import * as React from "react";
import {
  BrowserRouter,
  Redirect,
  Route as Original,
  Switch
} from "react-router-dom";
import { Auth } from "./Auth";

const Route = ({ component, ...rest }: any) => (
  <Auth
    original={Original}
    redirect={Redirect}
    component={component}
    {...rest}
  />
);

class Router extends React.PureComponent {
  public render() {
    const { children } = this.props;
    return <BrowserRouter>{children}</BrowserRouter>;
  }
}

export { Route, Router, Redirect, Switch };
