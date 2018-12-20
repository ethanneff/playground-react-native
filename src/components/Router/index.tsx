import * as React from "react";
import {
  BackButton,
  NativeRouter,
  Redirect,
  Route as Original,
  Switch
} from "react-router-native";
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
    return (
      <NativeRouter>
        <BackButton>{children}</BackButton>
      </NativeRouter>
    );
  }
}

export { Route, Router, Redirect, Switch };
