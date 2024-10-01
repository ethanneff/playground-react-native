import { Typescript, type ColorTheme } from '../../../../features';
import { words } from './constants';
import { type Cell, type CellType, type State } from './types';

export const getWordOfDay = () =>
  words[Math.floor(Math.random() * words.length)];

// + same spot
// x in word
// - not in word
export const getWordResult = (word: string, guess: string) => {
  const wordHash: Record<string, true> = {};
  for (const letter of word) {
    wordHash[letter] = true;
  }

  let result = '';
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < guess.length; index++) {
    if (word[index] === guess[index]) {
      result += '+';
    } else if (guess[index] in wordHash) {
      result += 'x';
    } else {
      result += '-';
    }
  }
  return result;
};

export const getCellType = (wordResult: string): CellType => {
  switch (wordResult) {
    case '+': {
      return 'in-same-position';
    }
    case 'x': {
      return 'in-word';
    }
    case '-': {
      return 'not-in-word';
    }
    default: {
      return 'idle';
    }
  }
};

export const getBoard = (
  wordLength: number,
  wordAttempts: number,
): State['board'] => {
  const cells: Cell[][] = [];
  // eslint-disable-next-line unicorn/prevent-abbreviations
  for (let i = 0; i < wordAttempts; i++) {
    const row = [];
    // eslint-disable-next-line unicorn/prevent-abbreviations
    for (let j = 0; j < wordLength; j++) {
      const cell: Cell = {
        animating: false,
        position: { x: 0, y: 0 },
        type: 'idle',
        value: '',
      };
      row.push(cell);
    }
    cells.push(row);
  }
  return { active: { x: 0, y: 0 }, cells };
};

export const getBackgroundColor = (value: CellType, colors: ColorTheme) => {
  switch (value) {
    case 'idle': {
      return colors.background.tertiary;
    }
    case 'in-same-position': {
      return colors.background.positive;
    }
    case 'in-word': {
      return colors.background.warning;
    }
    case 'not-in-word': {
      return colors.background.primaryB;
    }
    default: {
      return Typescript.assertNever(value);
    }
  }
};
