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
import { useGameLoop } from "./useGameLoop";
import { useGesture } from "./useGesture";
import { EndGame } from "./EndGame";

type State = "on" | "off";

type Game = {
  board: BoardObject;
  state: State;
};

// TODO: need to save the entire board to redux to load on app open

export default memo(function Snake() {
  const color = useColor();
  const nav = useNav();
  const size = 20;
  const [game, setGame] = useState<Game>({
    board: generateBoard(size),
    state: "off"
  });
  const gesture = useGesture();
  const { start, stop, frame } = useGameLoop();

  const startGame = useCallback(() => {
    const board = generateBoard(size);
    addStarting(board);
    addFood(board);
    setGame({ board, state: "on" });
    start();
  }, [start]);

  const finishGame = useCallback(() => {
    setGame(prev => ({ ...prev, state: "off" }));
    stop();
  }, [stop]);

  useEffect(() => {
    if (game.state === "off") {
      return;
    }
    const next = nextSnakePosition();
    if (collision(next) || frame.count >= 100) {
      finishGame();
      return;
    }
    if (eat()) {
      addFood(game.board);
    }
  }, [frame, game.state, game.board, finishGame]);

  useEffect(() => {
    startGame();
    return () => finishGame();
  }, [finishGame, startGame]);

  if (game.state === "init") {
    return null;
  }

  return (
    <>
      <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button title="start" onPress={start} />
          <Button title="stop" onPress={stop} />
        </View>
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
