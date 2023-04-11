import { type Middleware } from 'redux';
import { Globals } from '../features';

export const getFlipperMiddleware = (): Middleware[] => {
  if (Globals.platform === 'web') return [];
  if (Globals.environment === 'test') return [];
  if (Globals.environment === 'prod') return [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const createDebugger = require('redux-flipper').default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  return [createDebugger()];
};
