import * as React from "react";
import { AppRegistry, Platform } from "react-native";
import { OKRs } from "./screens";
import { Config } from "./utils";

export class Launcher extends React.PureComponent {
  public render() {
    return <OKRs />;
  }
}

AppRegistry.registerComponent(Config.app.name, () => Launcher);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById(Config.web.root)
  });
}
