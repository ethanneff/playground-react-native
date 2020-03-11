import DeviceInfo from "react-native-device-info";
import React, { memo, useRef, useCallback, useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Screen, Button, Text } from "../../../../components";
import { useNav } from "../../../../hooks";
import { ColorChoice, Dpad } from "./Dpad";
import { TrackPositionWithColor, TrackPosition, Tracks } from "./Tracks";
import { Character } from "./Character";
import { Canvas } from "./Canvas";

export type CanvasDimensions = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default memo(function DebugDrift() {
  const nav = useNav();
  const tracking = false;
  const [canvas, setCanvas] = useState<CanvasDimensions | null>(null);
  const [tracks, setTracks] = useState<TrackPositionWithColor[]>([]);
  const color = useRef<ColorChoice>("lightgrey");

  const onCanvasLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setCanvas({ x, y, height, width });
  }, []);

  const onTrack = useCallback(
    (position: TrackPosition) => {
      if (!tracking) return;
      setTracks(prev => {
        if (prev.length > 10) {
          prev.pop();
        }
        return [{ ...position, color: color.current }, ...prev];
      });
    },
    [color, tracking]
  );

  const onColor = useCallback(
    (value: ColorChoice) => {
      color.current = value;
    },
    [color]
  );

  const onReset = useCallback(() => {
    setTracks([]);
    color.current = "lightgrey";
  }, []);

  const onNavBack = useCallback(() => nav.to("debug"), [nav]);

  return (
    <Screen border onLeftPress={onNavBack} title="Drift">
      {DeviceInfo.isEmulatorSync() ? (
        <Text title="not supported on simulators" center />
      ) : (
        <View style={{ flex: 1 }}>
          <Button title="reset" onPress={onReset} center />
          <Canvas onLayout={onCanvasLayout}>
            {canvas && <Character canvas={canvas} onTrack={onTrack} />}
            {tracking && <Tracks tracks={tracks} />}
          </Canvas>
          <Dpad onColor={onColor} />
        </View>
      )}
    </Screen>
  );
});
