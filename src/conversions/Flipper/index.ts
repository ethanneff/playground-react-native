import { type RootMiddleware } from 'root-types';
import { Globals } from '../../features';

export const addFlipperMiddleware = (middlewares: RootMiddleware[]) => {
  if (Globals.platform === 'web') return;
  if (Globals.environment === 'test') return;
  if (Globals.environment === 'prod') return;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const createDebugger = require('redux-flipper').default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  middlewares.push(createDebugger());
};
