import React, { memo } from "react";
import { View } from "react-native";
import { Screen } from "../../../components";
import { useColor, useNav } from "../../../hooks";
import {
  BoardObject,
  addStarting,
  generateBoard,
  addFood,
  collision,
  endGame,
  nextSnakePosition,
  eat
} from "./utils";
import { Board } from "./Board";
import { useTick } from "./useTick";
import { useGesture, Direction } from "./useGesture";

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  let direction: Direction = "up";
  const gesture = useGesture(value => {
    direction = value;
  });

  useTick(value => {
    updateGame();
    console.log(direction);
  });

  let board: BoardObject = generateBoard(size);
  addStarting(board);
  addFood(board);

  const updateGame = () => {
    const next = nextSnakePosition(direction, board);
    if (collision(next)) {
      endGame();
      return;
    }
    if (eat()) {
      addFood(board);
    }
  };

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
      <View
        style={{ flex: 1, backgroundColor: color.success }}
        {...gesture.panHandlers}
      >
        <Board board={board} />
      </View>
    </Screen>
  );
});
