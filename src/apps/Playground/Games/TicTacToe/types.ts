export type PlayerTurn = 'black' | 'white';
export type BoardValue = -1 | 0 | 1;
export type Board = BoardValue[][];
export type State = {
  board: Board;
  state: 'game-over' | 'playing';
  turn: PlayerTurn;
  winner: PlayerTurn | null;
};
export type Direction = [BoardValue, BoardValue];
