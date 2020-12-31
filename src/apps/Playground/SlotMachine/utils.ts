import {Combinations, Element, Reel, Reels} from './config';

const getWinsPerCombination = (
  combinations: Combinations,
  reels: Reels,
): Combinations => {
  const output = [...combinations];
  for (let i = 0; i < combinations.length; i++) {
    let freq = 1;
    output[i] = [...combinations[i]];
    for (let j = 0; j < reels.length; j++) {
      const element = output[i][j];
      const reel = reels[j];
      const sum = getSumOfReel(reel);
      freq *=
        element !== 'any' && typeof element !== 'number' ? reel[element] : sum;
    }
    output[i][3] = freq;
  }
  return output;
};

const getSumOfReel = (reel: Reel): number => {
  return Object.values(reel).reduce((sum, item) => sum + item, 0);
};

const getSumOfReels = (reels: Reels): number => {
  return reels.reduce((total, reel) => total * getSumOfReel(reel), 1);
};

const getReturnsPerCombination = (
  combinations: Combinations,
  winsPerCombination: Combinations,
): Combinations => {
  return winsPerCombination.reduce(
    (output: Combinations, combination, index) => {
      const payout = combinations[index][3];
      output[index][3] = combination[3] * payout;
      return output;
    },
    [...winsPerCombination],
  );
};

const getSumOfCombinations = (combinations: Combinations): number => {
  return combinations.reduce((total, combination) => total + combination[3], 0);
};

export const getWinPercentage = (
  combinations: Combinations,
  reels: Reels,
): number => {
  const sumOfReels = getSumOfReels(reels);
  const winsPerCombination = getWinsPerCombination(combinations, reels);
  const sumOfWins = getSumOfCombinations(winsPerCombination);
  return sumOfWins / sumOfReels;
};

export const getReturnPercentage = (
  combinations: Combinations,
  reels: Reels,
): number => {
  const sumOfReels = getSumOfReels(reels);
  const winsPerCombination = getWinsPerCombination(combinations, reels);
  const returnsPerCombination = getReturnsPerCombination(
    combinations,
    winsPerCombination,
  );
  const sumOfReturns = getSumOfCombinations(returnsPerCombination);
  return sumOfReturns / sumOfReels;
};

export const getRandomReelArrays = (reels: Reels): Element[][] => {
  const arrays: Element[][] = [];
  for (let i = 0; i < reels.length; i++) {
    const array: Element[] = [];
    const reel = reels[i];
    const keys = Object.keys(reel);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j] as Element;
      const amount = reel[key];
      for (let k = 0; k < amount; k++) array.push(key);
    }
    arrays.push(array);
  }
  for (let i = 0; i < arrays.length; i++) arrays[i] = shuffleArray(arrays[i]);

  return arrays;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const copy = [...array];
  const swap = (a: T[], i: number, j: number) => {
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  };
  const randomIndex = (a: T[]) => Math.floor(Math.random() * a.length);
  for (let i = 0; i < copy.length; i++) {
    const j = randomIndex(copy);
    swap(copy, i, j);
  }
  return copy;
};
