import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../../../../components";
import {
  getCurrentColor,
  navigate,
  NavigationScreen
} from "../../../../models";
import { useRootDispatch, useRootSelector } from "../../../../utils";

interface Props {
  width?: string;
}

export const Template: React.FC<Props> = props => {
  const dispatch = useRootDispatch();
  const color = useRootSelector(state => getCurrentColor(state));
  const { width = "100%" } = props;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      width
    }
  });
  const nav = (to: NavigationScreen) => () => dispatch(navigate(to));
  return (
    <Screen onLeftPress={nav(NavigationScreen.Debug)}>
      <View style={styles.container}>
        <></>
      </View>
    </Screen>
  );
};
