export type Element =
  | '*'
  | '🍇'
  | '🍉'
  | '🍊'
  | '🍋'
  | '🍏'
  | '🍒'
  | '🍓'
  | '🥭';
type Combination = [Element, Element, Element, number];
export type Combinations = Combination[];

export const combinations: Combinations = [
  ['🍓', '🍓', '🍓', 200],
  ['🍇', '🍇', '🍇', 100],
  ['🍉', '🍉', '🍉', 100],
  ['🍉', '🍉', '🍇', 100],
  ['🥭', '🥭', '🥭', 18],
  ['🥭', '🥭', '🍇', 18],
  ['🍏', '🍏', '🍏', 14],
  ['🍏', '🍏', '🍇', 14],
  ['🍊', '🍊', '🍊', 10],
  ['🍊', '🍊', '🍇', 10],
  ['🍒', '🍒', '🍒', 8],
  ['🍒', '🍒', '*', 5],
  ['🍒', '*', '*', 2],
];

// add bonus https://www.youtube.com/watch?v=JyIWQIdxaOA
// dynamic slot machine logic https://www.youtube.com/watch?v=hnTrectlTxM

export type Reel = { [key in Element]: number };
export type Reels = [Reel, Reel, Reel];

export const reels: Reels = [
  {
    '*': 0,
    '🍇': 1,
    '🍉': 2,
    '🍊': 5,
    '🍋': 2,
    '🍏': 5,
    '🍒': 4,
    '🍓': 1,
    '🥭': 5,
  },
  {
    '*': 0,
    '🍇': 2,
    '🍉': 2,
    '🍊': 5,
    '🍋': 2,
    '🍏': 3,
    '🍒': 7,
    '🍓': 1,
    '🥭': 3,
  },
  {
    '*': 0,
    '🍇': 1,
    '🍉': 2,
    '🍊': 5,
    '🍋': 5,
    '🍏': 2,
    '🍒': 5,
    '🍓': 1,
    '🥭': 4,
  },
];
