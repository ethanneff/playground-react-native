import * as React from "react";
import { Link, Screen, Text } from "../../components";

export class NotFound extends React.PureComponent {
  public render() {
    return (
      <Screen>
        <Text title="404 :(" />
        <Link to="/app" title="go to App" />
      </Screen>
    );
  }
}
