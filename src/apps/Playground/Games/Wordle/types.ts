import { type DeepReadonly } from 'ts-essentials';

export type CellType = 'idle' | 'in-same-position' | 'in-word' | 'not-in-word';
type GameState = 'animating' | 'game-over' | 'idle';
type Vector = { x: number; y: number };

export type Key =
  | 'A'
  | 'B'
  | 'BACKSPACE'
  | 'C'
  | 'D'
  | 'E'
  | 'ENTER'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type KeyboardKey = {
  type: CellType;
  value: Key;
};

export type Cell = {
  animating: boolean;
  position: Vector;
  type: CellType;
  value: string;
};

export type State = DeepReadonly<{
  board: {
    active: Vector;
    cells: Cell[][];
  };
  keyboard: {
    keys: Record<Key, KeyboardKey>;
    order: Key[][];
  };
  settings: {
    darkTheme: boolean;
    hardMode: boolean;
    highContrastMode: boolean;
  };
  state: GameState;
  toasts: string[];
  word: {
    attempts: number;
    current: string;
    length: number;
  };
}>;
