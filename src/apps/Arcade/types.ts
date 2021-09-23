import { StackNavigationProp } from '@react-navigation/stack';

type Routes =
  | 'landing'
  | 'flappy-bird'
  | 'snake'
  | 'papi-jump'
  | 'archero'
  | 'tic-tac-toe';

export type ArcadeRoutes = { [key in Routes]: undefined };

export type ArcadeNavigation = StackNavigationProp<ArcadeRoutes>;

export const arcadeScreens: Routes[] = [
  'landing',
  'flappy-bird',
  'snake',
  'papi-jump',
  'archero',
  'tic-tac-toe',
];
