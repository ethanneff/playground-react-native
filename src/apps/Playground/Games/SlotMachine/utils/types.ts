export type Element =
  | '🍇'
  | '🍉'
  | '🍊'
  | '🍋'
  | '🍏'
  | '🍐'
  | '🍑'
  | '🍒'
  | '🥭'
  | '🫐';
export type Combination = {
  amount: number;
  combo: string;
  name: string;
};
export type CombinationAmount = Record<string, number>;
export type ReelFreq = Record<Element, number>;
type Reel = Element[];
export type Reels = [Reel, Reel, Reel];
export type Configs = {
  combinations: Combination[];
  reelFreq: ReelFreq;
};
export type Percentages = {
  payout: string;
  wins: string;
};
type Multiples = 1 | 2 | 5 | 10;
export type MultipleArray = Multiples[];
export type History = {
  amount: number;
  spin: string;
  time: number;
};
