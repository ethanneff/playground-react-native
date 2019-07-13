import * as React from "react";
import { Button, Screen, Text } from "../../../../components";
import {
  navigate,
  NavigationScreen,
  changeTheme,
  ColorTheme,
  getCurrentColor
} from "../../../../models";
import { useRootDispatch, useRootSelector } from "../../../../utils";
import { FlatList, View } from "react-native";

export const Settings = () => {
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const color = useRootSelector(state => getCurrentColor(state));
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const navBack = () => dispatch(navigate(NavigationScreen.PortfolioLanding));
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));

  return (
    <Screen onLeftPress={navBack}>
      <Text h1 center title="Settings" />
      <View
        style={{
          backgroundColor: color.surface,
          flexDirection: "row"
        }}
      >
        <Text title="theme" />
        <FlatList
          horizontal
          keyExtractor={item => item}
          data={themes}
          renderItem={({ item }) => (
            <Button
              key={item}
              title={item}
              onPress={themePress(item)}
              contained={currentTheme === item}
              secondary={currentTheme !== item}
            />
          )}
        />
      </View>
    </Screen>
  );
};
