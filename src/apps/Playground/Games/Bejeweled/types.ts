import { type DeepReadonly } from 'ts-essentials';

export type Gem = '🔴' | '🔵' | '🟠' | '🟡' | '🟢' | '🟣';
export type Vector = { x: number; y: number };
export type Cell = { gem: Gem; position: Vector; selected: boolean };
export type Board = Cell[][];
export type Game = DeepReadonly<{
  board: Board;
  score: number;
  selected: Vector | null;
}>;
