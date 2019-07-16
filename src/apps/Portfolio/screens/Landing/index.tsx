import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Screen, Text } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";
import { useRootDispatch } from "../../../../utils";
import { Walkthrough } from "./Walkthrough";

export const Landing = () => {
  const dispatch = useRootDispatch();
  const styles = StyleSheet.create({
    row: { flexDirection: "row", justifyContent: "space-around" }
  });

  const nav = (to: NavigationScreen) => () => dispatch(navigate(to));

  return (
    <Screen>
      <Text h1 title="Landing" center />
      <Walkthrough />
      <View style={styles.row}>
        <Button title="Login" onPress={nav(NavigationScreen.PortfolioLogin)} />
        <Button title="Main" onPress={nav(NavigationScreen.PortfolioMain)} />
        <Button title="Debug" onPress={nav(NavigationScreen.Debug)} />
        <Button
          title="Settings"
          onPress={nav(NavigationScreen.PortfolioSettings)}
        />
      </View>
      <View style={styles.row}>
        <Button
          title="Checklist"
          onPress={nav(NavigationScreen.ChecklistsLists)}
        />
        <Button
          title="CantHurtMe"
          onPress={nav(NavigationScreen.CantHurtMeHome)}
        />
      </View>
    </Screen>
  );
};
