import { View } from "react-native";
import { BoardObject } from "./utils";
import React, { memo } from "react";
import { Cell } from "./Cell";

interface BoardProps {
  board: BoardObject;
}

export const Board = memo(function Board({ board }: BoardProps) {
  console.log("board");
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
