import { StringMethods } from './StringMethods';

export const NumberMethods = {
  padZero: (number_: number, length: 0): number =>
    Number(StringMethods.padZero(String(number_), length)),
};
