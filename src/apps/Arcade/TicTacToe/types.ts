export type PlayerTurn = 'black' | 'white';
export type BoardValue = 0 | 1 | -1;
export type Board = BoardValue[][];
export type State = {
  board: Board;
  state: 'playing' | 'game-over';
  turn: PlayerTurn;
  winner: PlayerTurn | null;
};
export type Direction = [BoardValue, BoardValue];
