import * as React from "react";
import { FlatList, View } from "react-native";
import { Button, Screen, Text } from "../../../../components";
import {
  changeTheme,
  ColorTheme,
  navigate,
  NavigationScreen
} from "../../../../models";
import { useRootDispatch, useRootSelector } from "../../../../utils";

export const Settings = () => {
  const dispatch = useRootDispatch();
  const themes = Object.values(ColorTheme);
  const currentTheme = useRootSelector(state => state.theme.currentColor);
  const navBack = () => dispatch(navigate(NavigationScreen.PortfolioLanding));
  const themePress = (theme: ColorTheme) => () => dispatch(changeTheme(theme));

  return (
    <Screen onLeftPress={navBack}>
      <Text h1 center title="Settings" />
      <FlatList
        ListHeaderComponent={() => <Button disable title="Theme" />}
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
      <View style={{ flex: 1 }}>
        <Text title="hello" centerVertically center />
      </View>
    </Screen>
  );
};
