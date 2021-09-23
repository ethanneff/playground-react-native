import { DeepReadonly } from 'ts-essentials';

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
  return Array.from(Array(size), () =>
    Array(size).fill(Math.random() > random ? 0 : 1),
  );
};

export const determineBoardItem = (
  board: Board,
  i: number,
  j: number,
): BoardItem => {
  let neighbors = 0;
  const item = board[i][j];
  const length = board.length;
  for (let k = 0; k < operations.length; k++) {
    const [x, y] = operations[k];
    const newI = i + x;
    const newK = j + y;
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
