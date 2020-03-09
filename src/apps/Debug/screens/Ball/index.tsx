import React, { memo } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Button, Screen } from "../../../../components";
import { getHeight, getWidth } from "../../../../models";
import { useNativeDriver, useNav } from "../../../../hooks";
import { useRootSelector } from "../../../../utils";

const styles = StyleSheet.create({
  ball: {
    borderColor: "black",
    borderRadius: 30,
    borderWidth: 30,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    width: 60
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default memo(function DebugBall() {
  const height = useRootSelector(getHeight);
  const width = useRootSelector(getWidth);
  const nav = useNav();
  const ballPosition = new Animated.ValueXY({ x: width / 2, y: height / 2 });
  const useDriver = useNativeDriver();
  const animate = (dx: number, dy: number) => {
    Animated.spring(ballPosition, {
      toValue: { x: width * dx, y: height * dy },
      useNativeDriver: useDriver
    }).start();
  };
  const onInitialPress = () => animate(0.5, 0.5);
  const onRandomPress = () => animate(Math.random(), Math.random());
  return (
    <Screen onLeftPress={nav.to("debug")} title="Ball">
      <Animated.View style={[ballPosition.getLayout(), styles.ball]} />
      <View style={styles.button}>
        <Button title="initial" onPress={onInitialPress} />
        <Button title="random" onPress={onRandomPress} />
      </View>
    </Screen>
  );
});
