import * as React from "react";
import { AppRegistry, Platform, Text, View } from "react-native";
import { Config } from "./utils";

export class Launcher extends React.PureComponent {
  public render() {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent(Config.app.name, () => Launcher);
// if (Platform.OS === Config.os.web) {
//   AppRegistry.runApplication(Config.app.name, {
//     rootTag: document.getElementById(Config.web.root)
//   });
// }
