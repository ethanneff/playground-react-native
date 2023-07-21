import { StringMethods } from './StringMethods';

export const NumberMethods = {
  padZero: (num: number, length: 0): number =>
    Number(StringMethods.padZero(String(num), length)),
};
