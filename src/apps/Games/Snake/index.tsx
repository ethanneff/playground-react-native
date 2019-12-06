import React, { memo, useState } from "react";
import { View, PanResponder, PanResponderInstance } from "react-native";
import { Screen, Text } from "../../../components";
import { useColor, useNav } from "../../../hooks";
import { useRootSelector } from "../../../utils";
import { getSmallestDimension } from "../../../models";

type Direction = "left" | "right" | "up" | "down";

interface CellProps {
  value: number;
  length: number;
}

const Cell = memo(function Cell({ value, length }: CellProps) {
  const color = useColor();
  const width = useRootSelector(getSmallestDimension) / length;
  const backgroundColor =
    value === 0 ? color.surface : value === 1 ? color.success : color.danger;
  return (
    <View
      style={{
        flex: 1,
        width,
        height: width,
        backgroundColor
      }}
    />
  );
});

interface BoardProps {
  board: Board;
}

const Board = memo(function Board({ board }: BoardProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {board.map(x => (
        <View style={{ flexDirection: "row" }}>
          {x.map(y => (
            <Cell value={y} length={board.length} />
          ))}
        </View>
      ))}
    </View>
  );
});

const useSwipe = () => {
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
  return { direction, panHandlers: panGesture.panHandlers };
};

type Board = Array<Array<0 | 1 | 2>>;

const generateRandom = (size: number) => Math.floor(Math.random() * size);

const addFood = (
  board: Board,
  used: { [key: string]: boolean } = {}
): boolean => {
  const x = generateRandom(board.length);
  const y = generateRandom(board.length);

  const combo = `${x}${y}`;
  if (Object.keys(used).length === board.length) {
    return false;
  }
  if (used.hasOwnProperty(combo) || board[x][y] !== 0) {
    used[combo] = true;
    addFood(board, used);
    return false;
  }
  board[y][x] = 2;
  return true;
};

const addStarting = (board: Board) => {
  const center = Math.floor(board.length / 2);
  board[center][center] = 1;
};

const generateBoard = (size: number) => {
  let board: Board = [];
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      board[i][j] = 0;
    }
  }
  return board;
};

const useTick = () => {
  const fps = 16;
  const start = Date.now();
  const [tick, setTick] = useState(start);
  setTimeout(() => setTick(Date.now()), fps);
  return { start, tick };
};

export default memo(function Snake() {
  const size = 20;
  let board: Board = generateBoard(size);
  addStarting(board);
  addFood(board);
  const color = useColor();
  const nav = useNav();
  const swipe = useSwipe();
  // const tick = useTick();

  console.log("snake", swipe);
  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="snake">
      <View
        style={{ flex: 1, backgroundColor: color.success }}
        {...swipe.panHandlers}
      >
        <Board board={board} />
        <Text title={swipe.direction} />
      </View>
    </Screen>
  );
});
