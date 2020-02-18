import React, { useState, useRef, useCallback, memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Screen, Button, Slider, Text } from "../../../../components";
import { useColor, useNav } from "../../../../hooks";
import { useRootSelector } from "../../../../utils";
import { getSmallestDimension } from "../../../../models";
import { generateBoard, swapBoardItem, determineBoardItem } from "./utils";
import { Cell } from "./Cell";

export default memo(function DebugGameOfLife() {
  const color = useColor();
  const [form, setForm] = useState({
    run: false,
    delay: 16,
    count: 20
  });
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(generateBoard(form.count, 0.5));
  const runRef = useRef(form.run);
  const delayRef = useRef(form.delay);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const smallest = useRootSelector(getSmallestDimension);
  const size = smallest / form.count;
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background
    }
  });

  const onClear = useCallback(() => setBoard(generateBoard(form.count)), [
    form.count
  ]);

  const onItemPress = useCallback(
    (x: number, y: number) => () => {
      setBoard(state =>
        state.map((rows, i) =>
          rows.map((item, j) => swapBoardItem(item, x, y, i, j))
        )
      );
    },
    []
  );

  const onRandom = useCallback(() => setBoard(generateBoard(form.count, 0.5)), [
    form.count
  ]);

  const loop = useCallback(() => {
    if (!runRef.current) {
      return;
    }

    setBoard(state =>
      state.map((rows, i) =>
        rows.map((_, j) => determineBoardItem(state, i, j))
      )
    );

    timeoutRef.current = setTimeout(loop, delayRef.current);
  }, []);

  const onStart = useCallback(() => {
    setForm(state => ({ ...state, run: !state.run }));
    runRef.current = !runRef.current;
    loop();
  }, [loop]);

  const onCountSlide = useCallback((value: number) => {
    setForm(state => ({ ...state, count: value }));
    setBoard(generateBoard(value, 0.5));
  }, []);

  const onDelaySlide = useCallback((value: number) => {
    setForm(state => ({ ...state, delay: value }));
    delayRef.current = value;
  }, []);

  useEffect(() => {
    setLoading(false);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef]);

  return (
    <Screen onLeftPress={nav.to("debug")} title="Game of life">
      {loading ? 
        <Text h5 medium title="loading..." />
       : 
        <>
          <View style={{ flexDirection: "row" }}>
            <Text
              title={`count: ${form.count}`}
              h4
              style={{ alignSelf: "center" }}
            />
            <Slider
              style={{ flex: 1 }}
              value={10}
              maximumValue={100}
              minimumValue={1}
              step={1}
              onSlidingComplete={onCountSlide}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              title={`delay: ${Math.floor(form.delay)}`}
              h4
              style={{ alignSelf: "center" }}
            />
            <Slider
              style={{ flex: 1 }}
              value={10}
              maximumValue={100}
              minimumValue={1}
              step={1}
              onSlidingComplete={onDelaySlide}
            />
          </View>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button title={form.run ? "stop" : "start"} onPress={onStart} />
              <Button title="random" onPress={onRandom} />
              <Button title="clear" onPress={onClear} />
            </View>
            {board.map((rows, x) => 
              <View
                key={`${x}`}
                style={{ flexDirection: "row", justifyContent: "center" }}
              >
                {rows.map((row, y) => 
                  <Cell
                    key={`${x}-${y}`}
                    row={row}
                    x={x}
                    y={y}
                    size={size}
                    onItemPress={onItemPress}
                  />
                )}
              </View>
            )}
          </View>
        </>
      }
    </Screen>
  );
});
