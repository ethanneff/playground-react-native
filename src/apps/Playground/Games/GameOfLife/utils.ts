import { type DeepReadonly } from 'ts-essentials';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

type BoardItem = 0 | 1;

export type Board = DeepReadonly<BoardItem[][]>;

export const generateBoard = (size: number, random = 0): Board => {
  const board: BoardItem[][] = [];
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    const row: BoardItem[] = [];
    for (let colIndex = 0; colIndex < size; colIndex++) {
      const value = Math.random() > random ? 0 : 1;
      row.push(value);
    }
    board.push(row);
  }
  return board;
};

export const determineBoardItem = (
  board: Board,
  rowIndex: number,
  colIndex: number,
): BoardItem => {
  let neighbors = 0;
  const item = board[rowIndex][colIndex];
  const { length } = board;
  for (const operation of operations) {
    const [x, y] = operation;
    const newI = rowIndex + x;
    const newK = colIndex + y;
    if (newI >= 0 && newI < length && newK >= 0 && newK < length)
      neighbors += board[newI][newK];
    if (neighbors > 3) break;
  }
  return neighbors < 2 || neighbors > 3
    ? 0
    : item === 0 && neighbors === 3
      ? 1
      : item;
};
