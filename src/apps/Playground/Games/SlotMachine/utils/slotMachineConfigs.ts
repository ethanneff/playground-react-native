import { type Configs } from './types';

export const slotMachineConfigs: Configs = {
  combinations: [
    { amount: 5000, combo: '🍒🍒🍒', name: 'triple cherry' },
    { amount: 500, combo: '🍉🍉🍉', name: 'triple watermelon' },
    { amount: 250, combo: '🍑🍑🍑', name: 'triple peach' },
    { amount: 100, combo: '🍊🍊🍊', name: 'triple orange' },
    { amount: 50, combo: '🥭🥭🥭', name: 'triple mango' },
    { amount: 40, combo: '🍋🍋🍋', name: 'triple lemon' },
    { amount: 30, combo: '🍐🍐🍐', name: 'triple pear' },
    { amount: 20, combo: '🍏🍏🍏', name: 'triple apple' },
    { amount: 10, combo: '🍇🍇🍇', name: 'triple grapes' },
    { amount: 5, combo: '🫐🫐🫐', name: 'triple blueberry' },
    { amount: 2, combo: '🫐🫐', name: 'double blueberry' },
    { amount: 1, combo: '🫐', name: 'single blueberry' },
  ],
  reelFreq: {
    '🍇': 12,
    '🍉': 2,
    '🍊': 5,
    '🍋': 7,
    '🍏': 9,
    '🍐': 8,
    '🍑': 3,
    '🍒': 1,
    '🥭': 6,
    '🫐': 4,
  },
};
