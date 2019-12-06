import React, { memo, useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { Screen } from "../../../components";
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
import { EndGame } from "./EndGame";

type State = "init" | "on" | "off";

type Game = {
  board: BoardObject;
  state: State;
};

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  let direction: Direction = "up";
  const [game, setGame] = useState<Game>({
    board: generateBoard(size),
    state: "init"
  });

  const gesture = useGesture(value => {
    direction = value;
  });

  const gameLoop = useGameLoop(frame => {
    updateGame(frame);
  });

  const updateGame = (frame: Frame) => {
    if (game.state === "off") return;
    console.log(frame, direction);
    const next = nextSnakePosition(direction, game.board);
    if (collision(next) || frame.count >= 100) {
      finishGame();
      return;
    }
    if (eat()) {
      addFood(game.board);
    }
  };

  const startGame = () => {
    const board = generateBoard(size);
    addStarting(board);
    addFood(board);
    setGame({ board, state: "on" });
    gameLoop.start();
  };

  const finishGame = () => {
    setGame(game => ({ ...game, state: "off" }));
    gameLoop.stop();
  };

  useEffect(() => {
    startGame();
    return () => finishGame();
  }, []);

  if (game.state === "init") return;
  console.log("snake");
  return (
    <>
      <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
        <View
          style={{ flex: 1, backgroundColor: color.success }}
          {...gesture.panHandlers}
        >
          <Board board={game.board} />
        </View>
      </Screen>
      {game.state === "off" && <EndGame onPress={startGame} />}
    </>
  );
});
