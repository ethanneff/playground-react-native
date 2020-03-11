import React, { memo, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useDropShadow } from "../../../../hooks";

export type ColorChoice =
  | "slateblue"
  | "orange"
  | "mediumseagreen"
  | "violet"
  | "lightgrey";

type DpadProps = {
  onColor: (color: ColorChoice) => void;
};

export const Dpad = memo(function Dpad({ onColor }: DpadProps) {
  const useShadow = useDropShadow(10);
  const size = 50;
  const box = {
    width: size,
    height: size
  };

  const onPress = useCallback((color: ColorChoice) => () => onColor(color), [
    onColor
  ]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: size,
        right: size,
        transform: [{ rotate: "45deg" }]
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onPress("violet")}
          style={{
            ...box,
            backgroundColor: "violet",
            borderTopLeftRadius: size,
            ...useShadow
          }}
        />
        <TouchableOpacity
          onPress={onPress("mediumseagreen")}
          style={{
            ...box,
            backgroundColor: "mediumseagreen",
            borderTopRightRadius: size,
            ...useShadow
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={onPress("slateblue")}
          style={{
            ...box,
            backgroundColor: "slateblue",
            borderBottomLeftRadius: size,
            ...useShadow
          }}
        />
        <TouchableOpacity
          onPress={onPress("orange")}
          style={{
            ...box,
            backgroundColor: "orange",
            borderBottomRightRadius: size,
            ...useShadow
          }}
        />
      </View>
    </View>
  );
});
