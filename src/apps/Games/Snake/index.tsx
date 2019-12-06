import React, { memo, useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { Screen, Text, Button, Modal } from "../../../components";
import { useColor, useNav } from "../../../hooks";
import {
  BoardObject,
  addStarting,
  generateBoard,
  addFood,
  collision,
  nextSnakePosition,
  eat
} from "./utils";
import { Board } from "./Board";
import { Frame, useGameLoop } from "./useGameLoop";
import { useGesture, Direction } from "./useGesture";

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const [board, setBoard] = useState<BoardObject>(generateBoard(size));
  const [endGame, setEndGame] = useState(false);
  const size = 20;
  let direction: Direction = "up";
  const gesture = useGesture(value => {
    direction = value;
  });

  const gameLoop = useGameLoop(frame => {
    updateGame(frame);
  });

  const updateGame = useCallback(
    (frame: Frame) => {
      if (endGame) return;
      console.log(frame, direction);
      const next = nextSnakePosition(direction, board);
      if (collision(next) || frame.count >= 100) {
        setEndGame(true);
        gameLoop.stop();
        return;
      }
      if (eat()) {
        addFood(board);
      }
    },
    [gameLoop, endGame]
  );

  const startGame = () => {
    const board = generateBoard(size);
    addStarting(board);
    addFood(board);
    setEndGame(false);
    setBoard(board);
    gameLoop.start();
  };

  useEffect(() => {
    startGame();
    return () => {
      gameLoop.stop();
    };
  }, []);

  return (
    <>
      <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
        <View
          style={{ flex: 1, backgroundColor: color.success }}
          {...gesture.panHandlers}
        >
          <Board board={board} />
        </View>
      </Screen>
      {endGame && (
        <Modal>
          <Text title="good try" />
          <Button title="again" onPress={startGame} />
        </Modal>
      )}
    </>
  );
});
