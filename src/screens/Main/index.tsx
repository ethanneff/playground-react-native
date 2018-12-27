import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../components";
import fakeAuth from "../../models/User";

export class Main extends React.PureComponent<RouteComponentProps> {
  public render() {
    const { history } = this.props;
    return (
      <Screen>
        <Text title="Main" />
        <Button
          title="logout"
          onPress={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        />
      </Screen>
    );
  }
}
