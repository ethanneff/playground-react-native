import * as React from "react";
import { AppRegistry, Platform } from "react-native";
import { Provider } from "./models";
import { App } from "./screens";
import { Config } from "./utils";

export class Launcher extends React.PureComponent {
  public render() {
    return (
      <Provider>
        <App />
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
