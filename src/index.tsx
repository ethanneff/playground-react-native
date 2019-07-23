import React from "react";
import { AppRegistry, Platform, YellowBox } from "react-native";
import { Provider } from "react-redux";
import { App, store } from "./containers";
import { Config } from "./utils";

// TODO: remove
YellowBox.ignoreWarnings(["NetInfo", "Async Storage", "Battery state"]);

export const Launcher = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(Config.app.name, () => Launcher);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById(Config.web.root)
  });
}
