import React, { memo } from "react";
import { Button, Screen } from "../../../../components";
import { NavigationScreen } from "../../../../models";
import { useNav } from "../../../../hooks";
import { FlatList } from "react-native";

const debugScreens: NavigationScreen[] = [
  "debugArticle",
  "debugBall",
  "debugButtons",
  "debugCards",
  "debugChat",
  "debugDrag",
  "debugFonts",
  "debugImageCollection",
  "debugInput",
  "debugOKRs",
  "debugPinchSpread",
  "debugQuestionnaire",
  "debugSearchBar",
  "debugStartup",
  "debugStopwatch",
  "debugDarkMode",
  "debugColors"
];

export default memo(function Debug() {
  const nav = useNav();
  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Debug">
      <FlatList
        keyExtractor={item => item}
        data={debugScreens}
        renderItem={({ item }) => 
          <Button title={item} key={item} onPress={nav.to(item)} />
        }
      />
    </Screen>
  );
});
