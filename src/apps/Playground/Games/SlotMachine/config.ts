export type Element =
  | '🍓'
  | '🍇'
  | '🍉'
  | '🥭'
  | '🍏'
  | '🍊'
  | '🍒'
  | '🍋'
  | 'anything';
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
  ['🍒', '🍒', 'anything', 5],
  ['🍒', 'anything', 'anything', 2],
];

export type Reel = { [key in Element]: number };
export type Reels = [Reel, Reel, Reel];

export const reels: Reels = [
  {
    '🍓': 1,
    '🍇': 1,
    '🍉': 2,
    '🥭': 5,
    '🍏': 5,
    '🍊': 5,
    '🍒': 4,
    '🍋': 2,
    anything: 0,
  },
  {
    '🍓': 1,
    '🍇': 2,
    '🍉': 2,
    '🥭': 3,
    '🍏': 3,
    '🍊': 5,
    '🍒': 7,
    '🍋': 2,
    anything: 0,
  },
  {
    '🍓': 1,
    '🍇': 1,
    '🍉': 2,
    '🥭': 4,
    '🍏': 2,
    '🍊': 5,
    '🍒': 5,
    '🍋': 5,
    anything: 0,
  },
];
