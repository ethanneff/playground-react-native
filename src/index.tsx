import React, { memo } from "react";
import { AppRegistry, Platform, YellowBox } from "react-native";
import { App, Redux, Navigation } from "./containers";
import { Config } from "./utils";

YellowBox.ignoreWarnings(["Battery state"]); // https://github.com/react-native-community/react-native-device-info/issues/808

export const Main = memo(function Main() {
  return (
    <Redux>
      <App>
        <Navigation />
      </App>
    </Redux>
  );
});

AppRegistry.registerComponent(Config.app.name, () => Main);
if (Platform.OS === Config.os.web) {
  AppRegistry.runApplication(Config.app.name, {
    rootTag: document.getElementById("root")
  });
}
