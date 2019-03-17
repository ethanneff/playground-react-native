import * as React from "react";
import {
  BackButton,
  NativeRouter,
  Redirect,
  Route as Original,
  Switch
} from "react-router-native";
import { Auth } from "./Auth";
import { Platform } from "react-native";
import { Config } from "../../utils";

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
    return Platform.OS === Config.os.android ? (
      <NativeRouter>
        <BackButton>{children}</BackButton>
      </NativeRouter>
    ) : (
      <NativeRouter>{children}</NativeRouter>
    );
  }
}

export { Route, Router, Redirect, Switch };
