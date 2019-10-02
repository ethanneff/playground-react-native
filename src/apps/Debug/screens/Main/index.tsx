import React, { memo } from "react";
import { Button, Screen } from "../../../../components";
import { NavigationScreen } from "../../../../models";
import { useNav } from "../../../../hooks";

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
  "debugStopwatch",
  "debugSwipeCell",
  "debugDarkMode"
];

export default memo(function Debug() {
  const nav = useNav();
  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Debug">
      {debugScreens.map(screen => 
        <Button title={screen} key={screen} onPress={nav.to(screen)} />
      )}
    </Screen>
  );
});
