import {
  type Combination,
  type CombinationAmount,
  type Element,
  type Percentages,
  type ReelFreq,
  type Reels,
} from './types';

export const slotMachineUtils = {
  getCombos: (combinations: Combination[]): CombinationAmount => {
    const combos: CombinationAmount = {};
    for (const combination of combinations) {
      combos[combination.combo] = combination.amount;
    }
    return combos;
  },
  getPercentages: (
    combinationAmount: CombinationAmount,
    reels: Reels,
    games: number,
  ): Percentages => {
    let wins = 0;
    let payout = games;
    for (let index = 0; index < games; index++) {
      const spin = slotMachineUtils.getSpin(reels);
      const win = slotMachineUtils.getWin(spin, combinationAmount);
      if (win) {
        wins += 1;
        payout += win;
      } else {
        payout -= 1;
      }
    }
    return {
      payout: `${((payout / games) * 100).toFixed(2)}%`,
      wins: `${((wins / games) * 100).toFixed(2)}%`,
    };
  },
  getReels: (reelFreq: ReelFreq): Reels => {
    const reel: Element[] = [];
    for (const item of Object.keys(reelFreq)) {
      const key = item as Element;
      const value = reelFreq[key];
      for (let index = 0; index < value; index++) {
        reel.push(key);
      }
    }
    return [reel, reel, reel];
  },
  getSpin: (reels: Reels): string => {
    let output = '';
    for (const reel of reels) {
      const randomIndex = Math.floor(Math.random() * reel.length);
      output += reel[randomIndex];
    }
    return output;
  },
  getWin: (spin: string, combinationAmount: CombinationAmount): number => {
    if (spin in combinationAmount) {
      return combinationAmount[spin];
    }
    let onlyBlueberry = '';
    for (const ch of spin) {
      if (ch === '🫐') {
        onlyBlueberry += ch;
      }
    }
    if (onlyBlueberry in combinationAmount) {
      return combinationAmount[onlyBlueberry];
    }
    return 0;
  },
};
