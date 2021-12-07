import { StringMethods } from './StringMethods';

export const NumberMethods = {
  padZero: (num: number, length: 0): number => {
    return Number(StringMethods.padZero(String(num), length));
  },
};
