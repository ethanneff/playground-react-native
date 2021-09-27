import { Board, BoardValue, Direction, PlayerTurn, State } from './types';

type DfsProps = {
  m: Board;
  d: Direction;
  i: number;
  j: number;
  t: BoardValue;
  c?: number;
};

const dfs = ({ m, d, i, j, t, c = 0 }: DfsProps): number => {
  if (i < 0 || j < 0 || i >= m.length || j >= m[0].length || m[i][j] !== t)
    return 0;
  const next = c + 1;
  return Math.max(dfs({ m, d, i: i + d[0], j: j + d[1], t, c: next }), next);
};

type WinnerProps = { board: Board; i: number; j: number; boardSize: number };

export const getWinner = ({
  board,
  i,
  j,
  boardSize,
}: WinnerProps): BoardValue => {
  const t = board[i][j];
  const row =
    dfs({ m: board, d: [0, -1], i, j, t }) +
    dfs({ m: board, d: [0, 1], i, j, t }) -
    1;
  const col =
    dfs({ m: board, d: [-1, 0], i, j, t }) +
    dfs({ m: board, d: [1, 0], i, j, t }) -
    1;
  const dRow =
    dfs({ m: board, d: [-1, -1], i, j, t }) +
    dfs({ m: board, d: [1, 1], i, j, t }) -
    1;
  const dCol =
    dfs({ m: board, d: [-1, 1], i, j, t }) +
    dfs({ m: board, d: [1, -1], i, j, t }) -
    1;
  return Math.max(row, col, dRow, dCol) === boardSize ? t : 0;
};

export const getValue = (n: number): string =>
  n === 0 ? '' : n === 1 ? 'x' : 'o';

export const getNextValue = (turn: PlayerTurn): BoardValue =>
  turn === 'white' ? 1 : -1;

type UpdateBoardProps = { board: Board; i: number; j: number; v: BoardValue };

export const getUpdatedBoard = ({
  board,
  i,
  j,
  v,
}: UpdateBoardProps): Board => {
  const copy = [...board];
  copy[i][j] = v;
  return copy;
};

export const getInitialState = (boardSize: number): State => {
  const board: Board = [];
  for (let i = 0; i < boardSize; i++) {
    const row: BoardValue[] = [];
    for (let j = 0; j < boardSize; j++) row.push(0);
    board.push(row);
  }
  return { board, turn: 'white', state: 'playing', winner: null };
};
