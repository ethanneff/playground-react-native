export const arcadeScreens = [
  'landing',
  'archero',
  'flappy-bird',
  'papi-jump',
  'snake',
  'tic-tac-toe',
] as const;
export type StackParams = {[key in typeof arcadeScreens[number]]: undefined};
