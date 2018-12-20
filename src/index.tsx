import * as React from "react";
import { AppRegistry, Platform } from "react-native";
import { OKRs } from "./screens";
import { Config, Provider } from "./utils";

export class Launcher extends React.PureComponent {
  public render() {
    return (
      <Provider>
        <OKRs />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(Config.app.name, () => Launcher);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById(Config.web.root)
  });
}
