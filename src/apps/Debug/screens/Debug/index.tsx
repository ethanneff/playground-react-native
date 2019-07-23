import React, { memo } from "react";
import { Button, Screen } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";
import { useRootDispatch } from "../../../../utils";

const screens = [
  NavigationScreen.DebugArticle,
  NavigationScreen.DebugBall,
  NavigationScreen.DebugButtons,
  NavigationScreen.DebugCards,
  NavigationScreen.DebugChat,
  NavigationScreen.DebugDrag,
  NavigationScreen.DebugFonts,
  NavigationScreen.DebugImageCollection,
  NavigationScreen.DebugInput,
  NavigationScreen.DebugOKRs,
  NavigationScreen.DebugPinchSpread,
  NavigationScreen.DebugQuestionnaire,
  NavigationScreen.DebugSearchBar,
  NavigationScreen.DebugStopwatch,
  NavigationScreen.DebugSwipeCell,
  NavigationScreen.DebugDarkMode
];

export const Debug = memo(() => {
  const dispatch = useRootDispatch();
  const nav = (to: NavigationScreen) => () => dispatch(navigate(to));
  return (
    <Screen onLeftPress={nav(NavigationScreen.PortfolioLanding)}>
      {screens.map((screen: NavigationScreen) => (
        <Button
          title={NavigationScreen[screen]}
          key={screen}
          onPress={nav(screen)}
        />
      ))}
    </Screen>
  );
});
