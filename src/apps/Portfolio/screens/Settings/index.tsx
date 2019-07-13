import * as React from "react";
import { Button, Screen, Text } from "../../../../components";
import {
  navigate,
  NavigationScreen,
  changeTheme,
  ColorTheme
} from "../../../../models";
import { useDispatch } from "react-redux";

export const Settings = () => {
  const dispatch = useDispatch();
  return (
    <Screen>
      <Text h1 center title="Settings" />
      <Button
        title="go home"
        onPress={() => dispatch(navigate(NavigationScreen.PortfolioLanding))}
      />
      <Button
        title="light"
        onPress={() => dispatch(changeTheme(ColorTheme.Light))}
      />
      <Button
        title="dark"
        onPress={() => dispatch(changeTheme(ColorTheme.Dark))}
      />
    </Screen>
  );
};
