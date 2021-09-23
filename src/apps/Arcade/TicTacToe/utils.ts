import { Board, BoardValue, Direction, PlayerTurn, State } from './types';

const dfs = (
  m: Board,
  d: Direction,
  i: number,
  j: number,
  t: BoardValue,
  c = 0,
) => {
  if (i < 0 || j < 0 || i >= m.length || j >= m[0].length || m[i][j] !== t)
    return 0;
  c++;
  const val = Math.max(dfs(m, d, i + d[0], j + d[1], t, c), c);
  return val;
};

export const getWinner = (
  board: Board,
  i: number,
  j: number,
  boardSize: number,
): BoardValue => {
  const t = board[i][j];
  const row = dfs(board, [0, -1], i, j, t) + dfs(board, [0, 1], i, j, t) - 1;
  const col = dfs(board, [-1, 0], i, j, t) + dfs(board, [1, 0], i, j, t) - 1;
  const dRow = dfs(board, [-1, -1], i, j, t) + dfs(board, [1, 1], i, j, t) - 1;
  const dCol = dfs(board, [-1, 1], i, j, t) + dfs(board, [1, -1], i, j, t) - 1;
  return Math.max(row, col, dRow, dCol) === boardSize ? t : 0;
};

export const getValue = (n: number): string =>
  n === 0 ? '' : n === 1 ? 'x' : 'o';

export const getNextValue = (turn: PlayerTurn): BoardValue =>
  turn === 'white' ? 1 : -1;

export const getUpdatedBoard = (
  board: Board,
  i: number,
  j: number,
  v: BoardValue,
): Board => {
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
