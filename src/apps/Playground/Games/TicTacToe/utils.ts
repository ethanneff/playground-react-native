import {
  type Board,
  type BoardValue,
  type Direction,
  type PlayerTurn,
  type State,
} from './types';

type DfsProperties = {
  c?: number;
  d: Direction;
  i: number;
  j: number;
  m: Board;
  t: BoardValue;
};

const dfs = ({ c = 0, d, i, j, m, t }: DfsProperties): number => {
  if (i < 0 || j < 0 || i >= m.length || j >= m[0].length || m[i][j] !== t)
    return 0;
  const next = c + 1;
  return Math.max(dfs({ c: next, d, i: i + d[0], j: j + d[1], m, t }), next);
};

type WinnerProperties = {
  board: Board;
  boardSize: number;
  i: number;
  j: number;
};

export const getWinner = ({
  board,
  boardSize,
  i,
  j,
}: WinnerProperties): BoardValue => {
  const t = board[i][j];
  const row =
    dfs({ d: [0, -1], i, j, m: board, t }) +
    dfs({ d: [0, 1], i, j, m: board, t }) -
    1;
  const col =
    dfs({ d: [-1, 0], i, j, m: board, t }) +
    dfs({ d: [1, 0], i, j, m: board, t }) -
    1;
  const dRow =
    dfs({ d: [-1, -1], i, j, m: board, t }) +
    dfs({ d: [1, 1], i, j, m: board, t }) -
    1;
  const dCol =
    dfs({ d: [-1, 1], i, j, m: board, t }) +
    dfs({ d: [1, -1], i, j, m: board, t }) -
    1;
  return Math.max(row, col, dRow, dCol) === boardSize ? t : 0;
};

export const getValue = (n: number): string =>
  n === 0 ? '' : n === 1 ? 'x' : 'o';

export const getNextValue = (turn: PlayerTurn): BoardValue =>
  turn === 'white' ? 1 : -1;

type UpdateBoardProperties = {
  board: Board;
  i: number;
  j: number;
  v: BoardValue;
};

export const getUpdatedBoard = ({
  board,
  i,
  j,
  v,
}: UpdateBoardProperties): Board => {
  const copy = [...board];
  copy[i][j] = v;
  return copy;
};

export const getInitialState = (boardSize: number): State => {
  const board: Board = [];
  for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
    const row: BoardValue[] = [];
    for (let colIndex = 0; colIndex < boardSize; colIndex++) row.push(0);
    board.push(row);
  }
  return { board, state: 'playing', turn: 'white', winner: null };
};
