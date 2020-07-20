import {Combinations, Reel, Reels} from './config';

const getWinsPerCombination = (
  combinations: Combinations,
  reels: Reels,
): Combinations => {
  const output = [...combinations];
  for (let i = 0; i < combinations.length; i++) {
    let freq = 1;
    output[i] = [...combinations[i]];
    for (let j = 0; j < reels.length; j++) {
      const symbol = output[i][j];
      const reel = reels[j];
      const sum = getSumOfReel(reel);
      freq *=
        symbol !== 'any' && typeof symbol !== 'number' ? reel[symbol] : sum;
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
