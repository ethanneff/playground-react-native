import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Screen } from "../../../../components";
import Walkthrough from "./Walkthrough";
import { useNav } from "../../../../hooks";

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-around" }
});

export default memo(function PortfolioLanding() {
  const nav = useNav();
  return (
    <Screen>
      <Text h1 title="Landing" center />
      <Walkthrough />
      <View style={styles.row}>
        <Button title="Login" onPress={nav.to("portfolioLogin")} />
        <Button title="Main" onPress={nav.to("portfolio")} />
        <Button title="Settings" onPress={nav.to("portfolioSettings")} />
      </View>
      <View style={styles.row}>
        <Button title="Debug" onPress={nav.to("debug")} />
        <Button title="Checklist" onPress={nav.to("checklists")} />
        <Button title="CantHurtMe" onPress={nav.to("cantHurtMe")} />
        <Button title="Focus" onPress={nav.to("focus")} />
      </View>
    </Screen>
  );
});
