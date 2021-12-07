export const StringMethods = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  padZero: (str: string, length: number): string => {
    let res = '';
    while (str.length < length) {
      res = `0${str}`;
    }
    return res;
  },
};
