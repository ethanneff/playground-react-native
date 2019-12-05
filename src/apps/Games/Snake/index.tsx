import React, { memo, useState } from "react";
import { View, PanResponder, PanResponderInstance } from "react-native";
import { Screen, Text } from "../../../components";
import { useColor, useNav } from "../../../hooks";

type Direction = "left" | "right" | "up" | "down";

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const [direction, setDirection] = useState<Direction>("up");

  const panGesture: PanResponderInstance = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) >= Math.abs(g.dy)) {
        setDirection(g.dx >= 0 ? "right" : "left");
      } else {
        setDirection(g.dy >= 0 ? "down" : "up");
      }
    }
  });

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
      <View
        style={{ flex: 1, backgroundColor: color.success }}
        {...panGesture.panHandlers}
      >
        <Text title={direction} />
      </View>
    </Screen>
  );
});
