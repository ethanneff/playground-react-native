import { type DeepReadonly } from 'ts-essentials';

export type Gem = '🔴' | '🔵' | '🟠' | '🟡' | '🟢' | '🟣';
export type Vector = { x: number; y: number };
export type Cell = {
  bonus: boolean;
  gem: Gem;
  hint: boolean;
  position: Vector;
  selected: boolean;
};
export type Board = Cell[][];
export type Game = DeepReadonly<{
  board: Board;
  level: number;
  score: number;
  selected: Vector | null;
  state:
    | 'checking'
    | 'dropping'
    | 'filling'
    | 'game-over'
    | 'idle'
    | 'removing';
}>;

// move
// update board
// read board
// next action
