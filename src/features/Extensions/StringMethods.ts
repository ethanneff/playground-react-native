export const StringMethods = {
  capitalize: (string_: string): string =>
    string_.charAt(0).toUpperCase() + string_.slice(1),
  padZero: (string_: string, length: number): string => {
    let result = '';
    while (string_.length < length) {
      result = `0${string_}`;
    }
    return result;
  },
};
