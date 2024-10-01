/**
 * Utility functions for correctly typing Objects methods.
 * @description There are hundreds of Github issues around this problem, but Typescript wants to be more conservative around these types, rather than explicit.
 * @description See the following issues for more information:
 * @see https://github.com/search?q=repo%3Amicrosoft%2FTypeScript+object.keys&type=issues
 * @see https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
 */
export const Typescript = {
  /**
   * Validates if an array contains all values of a type
   */
  arrayOfAll:
    <T>() =>
    <U extends T[]>(
      array: U & ([T] extends [U[number]] ? unknown : 'Invalid') & { 0: T },
    ) =>
      array,

  /**
   * Validates that a switch statement is exhaustive.
   * @param x The value that should never be passed to the switch statement.
   * @example
   *  type Car = 'Honda' | 'Toyota'
   *  const function = (car: Car) => {
   *    switch (car) {
   *     case 'Honda':
   *        return 'Honda';
   *      case 'Toyota':
   *        return 'Toyota';
   *      default:
   *        return assertNever(action);
   *    }
   *  }
   */
  assertNever: (value: never): never => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Unexpected object: ${value}`);
  },

  /**
   * By default, Typescript returns [string, any][] for Object.entries, but this function returns the correct type.
   */
  objectEntries: <T extends Record<string, unknown>>(object: T) =>
    Object.entries(object) as [keyof T, T[keyof T]][],

  /**
   * By default, Typescript returns string[] for Object.keys, but this function returns the correct type.
   */
  objectKeys: <T extends Record<string, unknown>>(object: T) =>
    Object.keys(object) as (keyof T)[],

  /**
   * By default, Typescript returns any[] for Object.values, but this function returns the correct type.
   */
  objectValues: <T extends Record<string, unknown>>(object: T) =>
    Object.values(object) as T[keyof T][],
};
