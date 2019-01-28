import * as React from "react";
import User from "../../models/User"; // TODO: make models export not export default

export class Auth extends React.PureComponent<any> {
  private fallback = "/login";
  public render() {
    const {
      component: Component,
      original: Original,
      redirect: Redirect,
      ...rest
    } = this.props;
    return (
      <Original
        {...rest}
        render={(props: any) =>
          !rest.auth ||
          rest.path === this.fallback ||
          (rest.auth && User.isAuthenticated) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: this.fallback,
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
